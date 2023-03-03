<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	// TODO: fix load times...
	// import { IconBrandYoutube } from '@tabler/icons-svelte';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { page } from '$app/stores';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	let loading = false;
</script>

<div class="hero-container flex flex-col items-center justify-center p-4">
	<p class="my-4 text-center">{$LL.tagline()}</p>
	{#if $page.data.session}
		<p>{$page.data.session.user?.name ?? 'User'} logged in</p>
	{:else}
		<button
			on:click|once={function loginClick() {
				this.disabled = true;
				loading = true;
				signIn('google');
			}}
			class="btn variant-filled-primary cursor-pointer"
		>
			{#if loading}
				{$LL.pleaseWait()} <ProgressRadial class="ml-2 h-6 w-6" stroke={100} />
			{:else}
				{$LL.loginYouTube()}
			{/if}
			<!-- <IconBrandYoutube class="ml-1" size={36} stroke={1} /> -->
		</button>
	{/if}
</div>
