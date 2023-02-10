<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { IconBrandYoutube } from '@tabler/icons-svelte';
	import { LL } from '$lib/i18n/i18n-svelte';
	// TODO: fix $app import error with eslint
	// eslint-disable-next-line import/no-unresolved
	import { page } from '$app/stores';
</script>

<div class="hero-container flex flex-col items-center justify-center p-4">
	<p class="my-4 text-center">{$LL.tagline()}</p>
	{#if $page.data.session}
		<p>{$page.data.session.user?.name ?? 'User'} logged in</p>
	{:else}
		<button on:click={() => signIn('google')} class="btn variant-filled-primary cursor-pointer">
			{$LL.signUp()}
			<IconBrandYoutube class="ml-1" size={36} stroke={1} />
		</button>
	{/if}
</div>
