<script lang="ts">
	import { LightSwitch, menu, storeLightSwitch } from '@skeletonlabs/skeleton';
	import { signOut } from '@auth/sveltekit/client';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const userSignout = () => signOut();
	const goSettings = () => goto('/settings');
	const goUserProfile = () => goto('/me');

	// This functions taken from skeleton.dev LightSwitch component
	// Allows us to click the nav list element to toggle the theme.
	// Toggles a 'dark' class on the <html> element
	const setElemHtmlClass = (): void => {
		const elemHtmlClassList = document.documentElement.classList;
		if ($storeLightSwitch) {
			elemHtmlClassList.add('dark');
		} else {
			elemHtmlClassList.remove('dark');
		}
	};

	const toggleTheme = (): void => {
		storeLightSwitch.set(($storeLightSwitch = !$storeLightSwitch));
		setElemHtmlClass();
	};
</script>

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
{/if}

<button class="btn-icon variant-glass-primary w-7 p-0" use:menu={{ menu: 'user-menu' }}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="tabler-icon tabler-icon-dots-vertical "
	>
		<path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		<path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
	</svg>
</button>

<nav
	class="max-w-64 card list-nav top-9 left-0
    right-3 overflow-y-auto rounded-lg p-4 shadow-2xl min-[300px]:left-[unset]"
	data-menu="user-menu"
>
	<ul>
		{#if $page.data.session?.user}
			<li>
				<button on:click={goUserProfile} class="option w-full">Profile</button>
			</li>
			<hr class="opacity-20" />
		{/if}
		<li><a href="/">Home</a></li>
		<li><a href="/">About</a></li>
		<li><a href="/">Blog</a></li>
		<hr class="opacity-20" />
		<li>
			<button on:click|self={toggleTheme} class="option w-full">
				Mode:
				<span class="pl-4"><LightSwitch /></span>
			</button>
		</li>
		{#if $page.data.session?.user}
			<li>
				<button on:click={goSettings} class="option w-full">Settings</button>
			</li>
			<li>
				<button on:click={userSignout} class="option w-full">Logout</button>
			</li>
		{/if}
	</ul>
</nav>
