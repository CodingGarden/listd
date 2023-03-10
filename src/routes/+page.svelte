<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { seo } from '$lib/stores/SeoStore';
	import AuthButton from '$/lib/components/AuthButton.svelte';

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
		<AuthButton clickHandler={() => signIn('google')} content={$LL.loginYouTube()} />
	{/if}
</div>
