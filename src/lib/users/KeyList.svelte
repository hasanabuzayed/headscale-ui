<!-- Preauth keys as one row per key. Used by the catppuccin-mocha layout. -->
<script lang="ts">
	import { getPreauthKeys, removePreAuthKey } from '$lib/common/apiFunctions.svelte';
	import { PreAuthKey, User } from '$lib/common/classes';
	import { alertStore, preAuthHideStore } from '$lib/common/stores';
	import { relative, stamp } from '$lib/common/time';
	import NewPreAuthKey from './UserCard/PreAuthKeys/NewPreAuthKey.svelte';
	import { onMount } from 'svelte';

	export let user = new User();
	let keyList = [new PreAuthKey()];
	let newPreAuthKeyShow = false;

	const expired = (k: PreAuthKey) => new Date(k.expiration).getTime() < Date.now();
	const spent = (k: PreAuthKey) => k.used && !k.reusable;
	const revocable = (k: PreAuthKey) => !expired(k) && !spent(k);
	const mask = (k: string) => (k.length > 18 ? `${k.slice(0, 8)}…${k.slice(-6)}` : k);

	$: keys = keyList.filter((k) => k.id !== '');
	$: shown = keys.filter((k) => !($preAuthHideStore && (spent(k) || expired(k))));

	function refresh() {
		getPreauthKeys(user.id)
			.then((list) => (keyList = list))
			.catch((error) => ($alertStore = error));
	}

	function revoke(key: string) {
		removePreAuthKey(user.id, key)
			.then(refresh)
			.catch((error) => ($alertStore = error));
	}

	async function copy(key: string) {
		try {
			await navigator.clipboard.writeText(key);
			$alertStore = 'key copied';
		} catch {
			$alertStore = 'could not copy the key';
		}
	}

	onMount(refresh);
</script>

<header class="sec-head">
	<h3 class="sec">preauth keys <span class="dim">{shown.length}</span></h3>
	<button type="button" class="text-btn" on:click={() => (newPreAuthKeyShow = !newPreAuthKeyShow)}>{newPreAuthKeyShow ? '× cancel' : '+ new key'}</button>
	<label class="check"><input type="checkbox" bind:checked={$preAuthHideStore} />hide expired and used</label>
</header>

{#if newPreAuthKeyShow}
	<NewPreAuthKey bind:newPreAuthKeyShow {user} bind:keyList />
{/if}

<ul class="keys">
	{#each shown as key (key.id)}
		<li class="key" class:dead={expired(key)}>
			<span class="key-id">#{key.id}</span>
			<code class="key-code" title={key.key}>{mask(key.key)}</code>
			<button type="button" class="gl-btn" title="copy key" aria-label="copy key" on:click={() => copy(key.key)}><span class="gl">{''}</span></button>
			<span class="key-tags">
				<span class="pill" class:ok={!expired(key)} class:bad={expired(key)}>{expired(key) ? 'expired' : 'active'}</span>
				<span class="pill" class:warn={key.used} class:mauve={!key.used}>{key.used ? 'used' : 'unused'}</span>
				{#if key.reusable}<span class="pill info">reusable</span>{/if}
				{#if key.ephemeral}<span class="pill teal">ephemeral</span>{/if}
			</span>
			<span class="key-exp" title="{expired(key) ? 'expired' : 'expires'} {stamp(new Date(key.expiration))}">{relative(new Date(key.expiration))}</span>
			{#if revocable(key)}
				<button type="button" class="gl-btn danger" title="revoke key" aria-label="revoke key" on:click={() => revoke(key.key)}><span class="gl">{''}</span></button>
			{:else}
				<span class="gl-btn" aria-hidden="true" />
			{/if}
		</li>
	{:else}
		<li class="key-empty">{keys.length ? 'all keys are hidden' : 'no keys yet'}</li>
	{/each}
</ul>
