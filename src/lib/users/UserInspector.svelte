<!-- User drawer for the catppuccin-mocha layout: profile on the left, keys on the right. -->
<script lang="ts">
	import { base } from '$app/paths';
	import { User } from '$lib/common/classes';
	import { deviceStore, userStore } from '$lib/common/stores';
	import { relative, stamp } from '$lib/common/time';
	import KeyList from './KeyList.svelte';

	export let user = new User();
	$: created = new Date(user.createdAt);
	$: nodes = $deviceStore.filter((d) => d.id !== '' && d.user && d.user.id === user.id);
</script>

<div class="inspector">
	<section>
		<h3 class="sec">profile</h3>
		<dl class="props">
			<dt>email</dt>
			<dd>{user.email || '—'}</dd>
			<dt>created</dt>
			<dd class="stack">{stamp(created)}<span class="dim">{relative(created)}</span></dd>
			<dt>nodes</dt>
			<dd class="chips">
				{#each nodes as node}
					<a class="chip" href="{base}/devices.html"><span class="dot" class:ok={node.online} class:bad={!node.online} />{node.givenName}</a>
				{:else}
					<span class="dim">none yet</span>
				{/each}
			</dd>
		</dl>
	</section>
	<section>
		{#key $userStore}
			<KeyList {user} />
		{/key}
	</section>
</div>
