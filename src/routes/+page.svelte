<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { seo } from '$lib/stores/SeoStore';
	import { page } from '$app/stores';
	import ListCard from '$/lib/components/ListCard.svelte';
	import { PlusSquare } from 'lucide-svelte';
	import { userStore } from '$/lib/stores/UserStore';

	export let data;

	let loading = false;

	seo.set({
		title: 'listd',
		description: 'listd',
	});

	$: userStore.set({
		user: data.user,
	});
</script>

<div class="hero-container flex flex-col items-center justify-center p-4">
	{#if $page.data.session}
		{#if !data.lists.length}
			<p class="my-4 text-center">
				{$LL.pages.root.loggedIn.messages.createList()}
			</p>
		{/if}
		<a
			href="/create"
			class="variant-filled-warning btn flex max-w-xs place-items-center gap-1"
			data-sveltekit-preload-data="hover"><PlusSquare /> {$LL.buttons.create()}</a>
		<div class="video-grid mt-4">
			{#each data.lists as list}
				<ListCard {list} />
			{/each}
		</div>
	{:else}
		<p class="my-4 text-center">{$LL.pages.root.messages.tagline()}</p>
		<button
			on:click|once={function loginClick() {
				loading = true;
				signIn('google');
			}}
			disabled={loading}
			class="variant-filled-primary btn cursor-pointer">
			{#if loading}
				{$LL.messages.pleaseWait()} <ProgressRadial class="ml-2 h-6 w-6" stroke={100} />
			{:else}
				{$LL.buttons.loginYouTube()}
			{/if}
		</button>
	{/if}
</div>
