<script lang="ts">
	import { LightSwitch, ProgressRadial } from '@skeletonlabs/skeleton';
	import { signOut } from '@auth/sveltekit/client';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { page } from '$app/stores';
	import { LogOut } from 'lucide-svelte';

	let loading = false;

	const signOutClick = async () => {
		loading = true;
		await signOut();
	};
</script>

<LightSwitch rounded="rounded-full" />
{#if $page.data.session?.user}
	<div class="flex items-center gap-2">
		<img
			class="h-7 w-7 rounded-full"
			referrerpolicy="no-referrer"
			src={$page.data.session?.user?.image}
			alt={$page.data.session?.user?.name} />
		<p class="hidden font-bold md:block">{$page.data.session?.user?.name}</p>
	</div>
	<button on:click|once={signOutClick} class="variant-ringed-primary btn" disabled={loading}>
		{#if loading}
			{$LL.messages.pleaseWait()} <ProgressRadial class="ml-2 h-6 w-6" stroke={100} />
		{:else}
			<span class="flex gap-1">
				<LogOut />
				{$LL.buttons.logOut()}
			</span>
		{/if}
	</button>
{/if}
