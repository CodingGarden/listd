<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { signOut } from '@auth/sveltekit/client';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { page } from '$app/stores';
	import AuthButton from '$/lib/components/AuthButton.svelte';
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
	<AuthButton clickHandler={() => signOut()} content={$LL.logOut()} />
{/if}
