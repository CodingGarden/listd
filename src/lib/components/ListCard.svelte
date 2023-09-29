<script lang="ts">
	import AvatarWithFallback from '$/lib/components/AvatarWithFallback.svelte';
	import type { ListWithItems } from '../../../types/db';

	export let list: ListWithItems;

	const truncatedItems = list.items?.slice(0, 3) || [];

	const hiddenItems = (list.items?.length || 0) - truncatedItems.length;
</script>

<div class="card flex flex-col justify-between p-4">
	<div>
		<a class="text-xl hover:text-primary-500 hover:underline" href="/list/{list.id}"
			>{list.title}</a>
		{#if list.items}
			<div class="mt-4">
				{#each truncatedItems as item}
					<AvatarWithFallback
						avatarUrl={item?.meta?.youtubeMeta?.avatarUrl}
						altText={item?.meta?.youtubeMeta?.name} />
				{/each}
				{#if hiddenItems > 0}
					<span
						class="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-500"
						>+{hiddenItems}</span>
				{/if}
			</div>
		{/if}
		<p class="mt-4">{list.description}</p>
	</div>
	<div class="mt-4 flex justify-end gap-1">
		<!--  TODO: find icon library -->
		<a type="button" class="variant-filled-tertiary btn-icon btn-icon-sm" href="/list/{list.id}"
			>View</a>
		<a type="button" class="variant-filled-tertiary btn-icon btn-icon-sm" href="/edit/{list.id}"
			>Edit</a>
	</div>
</div>
