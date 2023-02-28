<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	// TODO: fix load times...
	// import { IconBrandYoutube } from '@tabler/icons-svelte';
	import { page } from '$app/stores';
	import { LL } from '$lib/i18n/i18n-svelte';

	import { seo } from '$lib/stores/SeoStore';

	seo.set({
		title: 'listd',
		description: 'listd',
	});
</script>

<div class="hero-container flex flex-col items-center justify-center p-4">
	<p class="my-4 text-center">{$LL.tagline()}</p>
	{#if $page.data.session}
		<p>{$page.data.session.user?.name ?? 'User'} logged in</p>
	{:else}
		<button on:click={() => signIn('google')} class="btn variant-filled-primary cursor-pointer">
			{$LL.signUp()}
			<!-- <IconBrandYoutube class="ml-1" size={36} stroke={1} /> -->
		</button>
	{/if}
</div>
