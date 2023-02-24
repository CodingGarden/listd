<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { signOut } from '@auth/sveltekit/client';

	import { page } from '$app/stores';

	const userSignout = () => signOut();
</script>

<!-- TODO: remove after next skeleton update -->
<LightSwitch height="h-6" rounded="rounded-full" />
{#if $page.data.session?.user}
	<div class="flex items-center gap-2">
		<img
			class="h-7 w-7 rounded-full"
			referrerpolicy="no-referrer"
			src={$page.data.session?.user?.image}
			alt={$page.data.session?.user?.name}
		/>
		<p class="hidden font-bold md:block">{$page.data.session?.user?.name}</p>
	</div>
	<button on:click={userSignout} class="btn variant-filled-primary">Logout</button>
{/if}
