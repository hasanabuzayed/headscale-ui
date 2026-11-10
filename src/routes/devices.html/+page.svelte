<!-- typescript -->
<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { getDevices, getUsers } from '$lib/common/apiFunctions.svelte';
	import { apiTestStore, deviceFilterStore, deviceStore, themeStore, URLStore } from '$lib/common/stores.js';
	import CreateDevice from '$lib/devices/CreateDevice.svelte';
	import DeviceCard from '$lib/devices/DeviceCard.svelte';
	import SearchDevices from '$lib/devices/SearchDevices.svelte';
	import SortDevices from '$lib/devices/SortDevices.svelte';
	import ApiError from '$lib/common/ApiError.svelte';
	import Prompt from '$lib/common/Prompt.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let newDeviceKey = '';

	$: onlineCount = $deviceStore.filter((d) => d.online).length;

	let newDeviceCardVisible = false;

	//
	// Component Variables
	//

	// let's the page know if it's ready to load
	let componentLoaded = false;

	// We define the meat of our script in onMount as doing so forces client side rendering.
	// Doing so also does not perform any actions until components are initialized
	onMount(async () => {

		// Handle nodekey
		newDeviceKey = $page.url.searchParams.get('nodekey') ?? ''
		newDeviceCardVisible = newDeviceKey.length > 0 ? true : false

		// update user list
		getUsers();
		// attempt to pull list of devices
		getDevices();
		// load the page
		componentLoaded = true;
	});
</script>

<!-- html -->
{#if componentLoaded}
	<div in:fade|global>
		<div in:fade|global class="px-4 pt-4">
			<h1 class="text-2xl bold text-primary">Device View</h1>
		</div>
		<Prompt path="devices" icon={'\uf108'}>
			{#if $apiTestStore === 'succeeded'}
				<span>{$deviceStore.length} nodes</span>
				<span class="ok">{onlineCount} online</span>
				{#if $deviceStore.length - onlineCount > 0}<span class="bad">{$deviceStore.length - onlineCount} offline</span>{/if}
			{/if}
		</Prompt>
		{#if $apiTestStore === 'succeeded'}
			<!-- instantiate device based components -->
			<table>
				<tr
					><td
						><!-- device creation visibility button -->
						<div class="p-4">
							{#if newDeviceCardVisible == false}
								<button on:click={() => (newDeviceCardVisible = true)} class="btn btn-primary btn-xs capitalize" type="button">+ New Device</button>
							{:else}
								<button on:click={() => (newDeviceCardVisible = false)} class="btn btn-secondary btn-xs capitalize" type="button">- Hide New Device</button>
							{/if}
						</div></td
					><td><SortDevices /></td><td><SearchDevices /></td></tr
				>
			</table>

			<CreateDevice bind:newDeviceCardVisible bind:newDeviceKey />

			<div class="list-head" aria-hidden="true"><span>name</span><span>address</span><span>tags</span></div>
			{#if $themeStore === 'catppuccin-mocha' && $deviceStore.length === 0}
				<div class="term">
					<p>no devices registered yet</p>
					<p><span class="k hint">hint:</span> on a client, run</p>
					<code class="cmd">tailscale up --login-server {$URLStore}</code>
					<p>then register its key with <b>+ new device</b></p>
				</div>
			{/if}
			<div class="flex flex-col gap-2">
				{#each $deviceStore as device}
					{#if $deviceFilterStore.includes(device)}
						<DeviceCard {device} />
					{/if}
				{/each}
			</div>
		{/if}
		{#if $apiTestStore === 'failed'}
			<ApiError />
		{/if}
	</div>
{/if}
