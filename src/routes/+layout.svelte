<script lang="ts">
	import NavTrail from '$/routes/NavTrail.svelte';
	import { setLocale } from '$lib/i18n/i18n-svelte';
	import { seo } from '$lib/stores/SeoStore';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import { afterNavigate } from '$app/navigation';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import Seo from './SEO.svelte';

	export let data;
	setLocale(data.locale);

	setupViewTransition();

	afterNavigate(() => {
		// Fix for firefox...
		// Issue: https://github.com/sveltejs/kit/issues/2733
		document.querySelector('#page')!.scrollTo({
			behavior: 'smooth',
			left: 0,
			top: 0,
		});
	});
</script>

<Seo title={$seo.title} description={$seo.description} />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead"><a href="/">listd.tv</a></svelte:fragment>
			<svelte:fragment slot="trail">
				<NavTrail />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment> -->
	<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
	<!-- Router Slot -->
	<!-- TODO: use variable for container width -->
	<div class="w-full px-2 pt-2 md:px-4 lg:px-8">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->
</AppShell>
