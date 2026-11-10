<!-- typescript -->
<script lang="ts">
	import { base } from '$app/paths';
	import { getDevices, getUsers } from '$lib/common/apiFunctions.svelte';
	import { apiTestStore, themeStore, userFilterStore, userStore } from '$lib/common/stores';
	import CreateUser from '$lib/users/CreateUser.svelte';
	import SearchUsers from '$lib/users/SearchUsers.svelte';
	import SortUsers from '$lib/users/SortUsers.svelte';
	import UserCard from '$lib/users/UserCard.svelte';
	import ApiError from '$lib/common/ApiError.svelte';
	import Prompt from '$lib/common/Prompt.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	//
	// Component Variables
	//
	// whether the new card html element is visible
	let newUserCardVisible = false;

	// let's the page know if it's ready to load
	let componentLoaded = false;

	// We define the meat of our script in onMount as doing so forces client side rendering.
	// Doing so also does not perform any actions until components are initialized
	onMount(async () => {
		// update user list
		getUsers();
		// the catppuccin-mocha user drawer lists each user's nodes
		if ($themeStore === 'catppuccin-mocha') getDevices().catch(() => {});
		// load the page
		componentLoaded = true;
	});
</script>

<!-- html -->
{#if componentLoaded}
	<div in:fade|global>
		<div class="px-4 pt-4">
			<h1 class="text-2xl bold text-primary">User View</h1>
		</div>
		<Prompt path="users" icon={'\uf007'}>
			{#if $apiTestStore === 'succeeded'}<span>{$userStore.length} {$userStore.length === 1 ? 'user' : 'users'}</span>{/if}
		</Prompt>
		{#if $apiTestStore === 'succeeded'}
			<!-- instantiate user based components -->
			<table>
				<tr
					><td
						><!-- device creation visibility button -->
						<div class="p-4">
							{#if newUserCardVisible == false}
								<button on:click={() => (newUserCardVisible = true)} class="btn btn-primary btn-xs capitalize" type="button">+ New User</button>
							{:else}
								<button on:click={() => (newUserCardVisible = false)} class="btn btn-secondary btn-xs capitalize" type="button">- Hide New User</button>
							{/if}
						</div></td
					><td><SortUsers /></td><td><SearchUsers /></td></tr
				>
			</table>
			<CreateUser bind:newUserCardVisible />

			{#if $themeStore === 'catppuccin-mocha' && $userStore.length === 0}
				<div class="term">
					<p>no users yet</p>
					<p><span class="k hint">hint:</span> press <b>+ new user</b> to create the first one</p>
				</div>
			{/if}
			<div class="flex flex-col gap-2">
				{#each $userStore as user}
					{#if $userFilterStore.includes(user)}
						<UserCard {user} />
					{/if}
				{/each}
			</div>
		{/if}
		{#if $apiTestStore === 'failed'}
			<ApiError />
		{/if}
	</div>
{/if}
