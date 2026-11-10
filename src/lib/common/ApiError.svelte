<!-- Shown when the API test fails. The catppuccin-mocha theme gets terminal wording. -->
<script lang="ts">
	import { base } from '$app/paths';
	import { fade } from 'svelte/transition';
	import { themeStore } from '$lib/common/stores.js';
</script>

{#if $themeStore === 'catppuccin-mocha'}
	<div in:fade|global class="term term-error" role="alert">
		<p><span class="k">error:</span> cannot reach headscale</p>
		<p><span class="k hint">hint:</span> check the server url and api key in <a href="{base}/settings.html" class="link">settings</a></p>
	</div>
{:else}
	<div in:fade|global class="max-w-lg  mx-auto p-4 border-4 text-sm text-base-content shadow-lg text-center">
		<p>API test did not succeed.<br />Headscale might be down or API settings may need to be set<br />change server settings in the <a href="{base}/settings.html" class="link link-primary">settings</a> page</p>
	</div>
{/if}
