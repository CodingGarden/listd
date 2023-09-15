<script lang="ts">
	import AvatarWithFallback from '$/lib/components/AvatarWithFallback.svelte';
	import type { ListWithItems } from '../../../types/db';

	export let list: ListWithItems;

	const truncatedItems = list.items?.slice(0, 3) || [];

	const hiddenItems = (list.items?.length || 0) - truncatedItems.length;
</script>

<a href="/list/{list.id}" class="card p-4">
	<h3 class="text-xl">{list.title}</h3>
	{#if list.items}
		<div class="mt-4">
			{#each truncatedItems as item}
				<AvatarWithFallback
					avatarUrl={item?.meta?.youtubeMeta?.avatarUrl}
					altText={item?.meta?.youtubeMeta?.name} />
			{/each}
			{#if hiddenItems > 0}
				<span class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-500"
					>+{hiddenItems}</span>
			{/if}
		</div>
		<p class="mt-4">{list.description}</p>
	{/if}
</a>
