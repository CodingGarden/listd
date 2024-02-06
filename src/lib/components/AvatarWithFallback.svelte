<script lang="ts">
	import { onMount } from 'svelte';
	import { setupViewTransition } from 'sveltekit-view-transition';

	export let avatarUrl: string = '';
	export let altText: string = '';
	export let channelId: string = '';
	export let listId: string = '';

	let currentUrl = '';
	let showFallback = false;

	const fallbackText =
		altText
			.split(' ')
			.slice(0, 3)
			.map((w) => w[0])
			.join('') || '??';

	onMount(() => {
		currentUrl = avatarUrl;
	});

	const { transition } = setupViewTransition();
</script>

{#if !showFallback}
	<img
		use:transition={{
			name: `avatar-${channelId}`,
			shouldApply({ navigation }) {
				// here we are navigating from main page to detail page
				if (navigation.to?.params?.id != null) {
					// we should apply if the id we are navigating to
					// has the listId of this avatar
					return navigation.to.params.id === listId;
				}
				// here we are navigating back from the detail to the home, we should apply
				// only if we are coming from the page with the same id as listId
				return navigation.from?.params?.id === listId;
			},
			applyImmediately({ navigation }) {
				// here we are navigating from main page to detail page
				if (navigation.to?.params?.id != null) {
					// we should apply immediately if the id we are navigating to
					// has the listId of this avatar
					return navigation.to.params.id === listId;
				}
				// here we are navigating back from the detail to the home, we should apply
				// immediately only if we are coming from the page with the same id as listId
				return navigation.from?.params?.id === listId;
			},
		}}
		class="mr-1 inline-block h-14 w-14 rounded-full"
		referrerpolicy="no-referrer"
		src={currentUrl}
		on:error={() => {
			showFallback = true;
		}}
		alt={altText} />
{:else}
	<span class="mr-1 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary-500"
		>{fallbackText}</span>
{/if}
