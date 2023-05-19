<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { CoreValueReport } from '@prisma/client';

	const report: CoreValueReport[] = [];
	export let compact = false;
	export let shouldFocus = false;

	let element: HTMLDivElement | null = null;

	const isModalOpen = writable(false);

	const handleAction = (action: string) => {
		// Implement your logic here based on the action
		switch (action) {
			case 'edit':
				// Open a modal for editing the report
				console.log('Edit action clicked for report:', report);
				isModalOpen.set(true); // Set the modal visibility to true
				// Add your logic for opening the edit modal here
				break;
			case 'delete':
				// Make an API call to delete the report
				console.log('Delete action clicked for report:', report);
				// Add your logic for deleting the report here
				break;
			case 'view':
				// Navigate to a page to view the report in detail
				console.log('View action clicked for report:', report);
				// Add your logic for viewing the report here
				break;
			default:
				break;
		}
	};

	onMount(() => {
		if (element && shouldFocus) {
			element.scrollIntoView({
				behavior: 'smooth',
			});
		}
	});
</script>

<div
	bind:this={element}
	class="card overflow-hidden p-4"
	class:grid={compact}
	class:content-center={compact}>
	<header>
		<div class="card flex gap-2" class:flex-col={compact} class:items-center={compact}>
			{#if compact}
				<h3 class="card-title">{report.coreValue}</h3>
				<p>{report.description}</p>
				<div class="card-actions">
					<button class="btn" on:click={() => handleAction('edit')}>Edit</button>
					<button class="btn" on:click={() => handleAction('delete')}>Delete</button>
					<button class="btn" on:click={() => handleAction('view')}>View</button>
				</div>
			{/if}
		</div>
	</header>
	<footer class="card-footer mt-4 flex justify-end" class:justify-center={compact}>
		<slot />
	</footer>
</div>

// Function to handle any actions related to the report card

<!-- <script lang="ts">
	// import type { YouTubeChannelMetaAPIResponse } from '$/lib/server/YouTubeAPI';
	import { onMount } from 'svelte';

	export let report;

	// Function to handle any actions related to the report card
	function handleAction(action) {
		// Implement your logic here based on the action
		// For example, you can perform actions like editing, deleting, or viewing the report
		console.log(`Action '${action}' clicked for report:`, report);
	}

	// export let channel: YouTubeChannelMetaAPIResponse;
	export let locale: string;
	export let compact = false;
	export let shouldFocus = false;

	const subscriberFormatter = new Intl.NumberFormat(locale, {
		notation: 'compact',
		compactDisplay: 'short',
	});

	let element: HTMLDivElement | null = null;

	onMount(() => {
		if (element && shouldFocus) {
			element.scrollIntoView({
				behavior: 'smooth',
			});
		}
	});
</script>

<div
	bind:this={element}
	class="card overflow-hidden p-4"
	class:grid={compact}
	class:content-center={compact}>
	<header>
		<div class="card">
			<h3 class="card-title">{report.coreValue}</h3>
			<p>{report.description}</p>
			<div class="card-actions">
				<button class="btn" on:click={() => handleAction('edit')}>Edit</button>
				<button class="btn" on:click={() => handleAction('delete')}>Delete</button>
				<button class="btn" on:click={() => handleAction('view')}>View</button>
			</div>
		</div>
	</header>
	<footer class="card-footer mt-4 flex justify-end" class:justify-center={compact}>
		<slot />
	</footer>
</div> -->

<!-- <div class="flex gap-2" class:flex-col={compact} class:items-center={compact}>
			{#if compact}
				<img
					class="mr-1 inline-block h-12 w-12 rounded-full"
					referrerpolicy="no-referrer"
					src={channel.avatarUrl}
					alt={channel.name} />
				<div class="text-center font-bold">{channel.name}</div>
			{:else}
				<img
					class="mr-1 inline-block h-12 w-12 rounded-full"
					referrerpolicy="no-referrer"
					src={channel.avatarUrl}
					alt={channel.name} />
				<div>
					<div class="font-bold">{channel.name}</div>
					<div>{channel.customUrl}</div>
					<div>
						{subscriberFormatter.format(Number(channel.subscriberCount))} subscribers
					</div>
				</div>
			{/if}
		</div> -->

<style>
	/* Add your custom styles for the ReportCard component here */
	.card {
		border: 1px solid #ccc;
		padding: 1rem;
		margin-bottom: 1rem;
	}

	.card-title {
		font-size: 1.2rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.card-actions {
		display: flex;
		justify-content: flex-end;
		margin-top: 0.5rem;
	}

	.btn {
		margin-left: 0.5rem;
		padding: 0.25rem 0.5rem;
		background-color: #ccc;
		border: none;
		border-radius: 3px;
		cursor: pointer;
	}
</style>
