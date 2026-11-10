<!-- Device drawer for the catppuccin-mocha layout: properties on the left, routes on the right. -->
<script lang="ts">
	import { Device } from '$lib/common/classes';
	import { relative, stamp } from '$lib/common/time';
	import DeviceRoute from './DeviceCard/DeviceRoutes/DeviceRoute.svelte';
	import MoveDevice from './DeviceCard/MoveDevice.svelte';

	export let device = new Device();
	$: seen = new Date(device.lastSeen);
</script>

<div class="inspector">
	<section>
		<h3 class="sec">properties</h3>
		<dl class="props">
			<dt>user</dt>
			<dd><MoveDevice {device} bare /></dd>
			<dt>hostname</dt>
			<dd>{device.name}</dd>
			<dt>last seen</dt>
			<dd class="stack">{device.online ? 'now' : relative(seen)}<span class="dim">{stamp(seen)}</span></dd>
			<dt>addresses</dt>
			<dd class="chips">
				{#each device.ipAddresses as address}
					<span class="chip">{address}</span>
				{/each}
			</dd>
		</dl>
	</section>
	<section>
		<header class="sec-head">
			<h3 class="sec">routes <span class="dim">{device.availableRoutes.length}</span></h3>
		</header>
		<ul class="routes">
			{#each device.availableRoutes as route}
				<li class="route"><DeviceRoute {route} {device} /></li>
			{:else}
				<li class="key-empty">no routes advertised</li>
			{/each}
		</ul>
	</section>
</div>
