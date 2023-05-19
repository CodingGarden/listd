<script lang="ts">
	import prismaClient from '$lib/db.server';
	import { z } from 'zod';
	import type { CoreValueReport } from '@prisma/client';
	import { enhance } from '$app/forms';
	import { LL } from '$lib/i18n/i18n-svelte';
	import ReportCard from '$/lib/components/ChannelCard.svelte';
	import ReportCardActions from './ReportCardActions.svelte';

	export let action: string;
	export let error: string | undefined;
	// export let locale: string;

	const { success } = z.string().uuid().safeParse(id);

	const getList = async (
		id: string,
		userId: string | undefined = undefined
	): Promise<ListResponse> => {
		if (!success) {
			return {
				reports: [],
				coreValueIds: [],
			};
		}

		const reports = await prismaClient.coreValueReport.findMany({
			where: {
				userId,
			},
			include: {
				coreValue: true,
			},
		});

		const coreValueIds = reports.map((report: CoreValueReport) => report.coreValueId);

		return { reports, coreValueIds };
	};

	const { reports, coreValueIds } = await getList(id, userId);

	const getReportContent = (report: CoreValueReport): string => {
		return `${report.date}: ${report.description}`;
	};
</script>

<form class="mx-auto mt-4 flex max-w-lg flex-col gap-4" {action} method="post" use:enhance>
	{#if error}
		<aside class="alert variant-filled-error">
			<div class="alert-message">
				<p class="whitespace-pre-line">{error}</p>
			</div>
		</aside>
	{/if}
	<div class="flex justify-end">
		<button class="btn variant-filled-secondary">
			{$LL.buttons.create()}
		</button>
	</div>
	<label class="label">
		<span>{$LL.labels.title()}</span>
		<input class="input" type="text" name="title" required />
	</label>
	<label class="label">
		<span>{$LL.labels.description()}</span>
		<textarea class="textarea" name="description" />
	</label>
	<label class="label">
		<span>{$LL.labels.visibility()}</span>
		<select class="select" name="visibility" required>
			{#each visibilities as visibility}
				<option value={visibility}>{$LL.enums.visibility[visibility]()}</option>
			{/each}
		</select>
	</label>
	<span class="label">Reports</span>
	{#if !reports.length}
		<span class="block text-gray-400">No reports available.</span>
	{:else}
		<div class="max-h-96 overflow-y-auto">
			{#each reports as report}
				<ReportCard {report}>
					<ReportCardActions {report} />
					<!-- Replace the placeholder with the appropriate content for each report -->
					<p>{getReportContent(report)}</p>
				</ReportCard>
			{/each}
		</div>
	{/if}
</form>

<!-- <script lang="ts">
	import prismaClient from '$lib/db.server';
	import { z } from 'zod';
	import type { CoreValueReport } from '@prisma/client';
	import { enhance } from '$app/forms';
	import { LL } from '$lib/i18n/i18n-svelte';
	import ReportCard from '$/lib/components/ChannelCard.svelte';
	import ReportCardActions from './ReportCardActions.svelte';

	export let action: string;
	export let error: string | undefined;
	export let locale: string;

	let reports: CoreValueReport[] = [];
	let coreValueIds: string[] = [];

	const { success } = z.string().uuid().safeParse(id);

	async function getList(
		id: string,
		userId: string | undefined = undefined
	): Promise<ListResponse> {
		if (!success) {
			return {
				reports: [],
				coreValueIds: [],
			};
		}

		const reports = await prismaClient.coreValueReport.findMany({
			where: {
				userId,
			},
			include: {
				coreValue: true,
			},
		});

		const coreValueIds = reports.map((report: CoreValueReport) => report.coreValueId);

		return { reports, coreValueIds };
	}

	const { reports, coreValueIds } = await getList(id, userId);

	// Define the appropriate content for each report
	function getReportContent(report: CoreValueReport): string {
		// Customize the content based on your requirements
		return `${report.date}: ${report.description}`;
	}
</script>

<form class="mx-auto mt-4 flex max-w-lg flex-col gap-4" {action} method="post" use:enhance>
	{#if error}
		<aside class="alert variant-filled-error">
			<div class="alert-message">
				<p class="whitespace-pre-line">{error}</p>
			</div>
		</aside>
	{/if}
	<div class="flex justify-end">
		<button class="btn variant-filled-secondary">
			{$LL.buttons.create()}
		</button>
	</div>
	<label class="label">
		<span>{$LL.labels.title()}</span>
		<input class="input" type="text" name="title" required />
	</label>
	<label class="label">
		<span>{$LL.labels.description()}</span>
		<textarea class="textarea" name="description" />
	</label>
	<label class="label">
		<span>{$LL.labels.visibility()}</span>
		<select class="select" name="visibility" required>
			{#each visibilities as visibility}
				<option value={visibility}>{$LL.enums.visibility[visibility]()}</option>
			{/each}
		</select>
	</label>
	<span class="label">Reports</span>
	{#if !reports.length}
		<span class="block text-gray-400">No reports available.</span>
	{:else}
		<div class="max-h-96 overflow-y-auto">
			{#each reports as report}
				<ReportCard {report}>
					<ReportCardActions {report} />
					<!-- Replace the placeholder with the appropriate content for each report -->
<!-- <p>{getReportContent(report)}</p> -->
<!-- </ReportCard> -->
<!-- {/each} -->
<!-- </div> -->
<!-- {/if} -->
<!-- </form> --> -->

<!-- <script lang="ts">
	/* eslint-disable @typescript-eslint/no-non-null-assertion */
	import {
		Visibility,
		type List,
		type ListItem,
		type ListItemMeta,
		type YouTubeMeta,
	} from '@prisma/client';
	import type { YouTubeChannelMetaAPIResponse } from '$/lib/server/YouTubeAPI';
	import { enhance } from '$app/forms';
	import { LL } from '$lib/i18n/i18n-svelte';
	import ChannelCard from '$/lib/components/ChannelCard.svelte';
	import ChannelCardActions from './ChannelCardActions.svelte';
	import ChannelSearch from './ChannelSearch.svelte';

	type ListWithItems = List & {
		items: (ListItem & {
			meta: ListItemMeta & {
				youtubeMeta: YouTubeMeta | null;
			};
		})[];
	};

	export let list: undefined | ListWithItems;
	export let action: string;
	export let error: string | undefined;
	export let locale: string;
	export let results: YouTubeChannelMetaAPIResponse[] | undefined;

	let channels: YouTubeChannelMetaAPIResponse[] =
		list?.items.map((item) => item.meta.youtubeMeta!) || [];

	$: channelIds = channels.reduce((byId, channel, index) => {
		if (channel.originId) {
			byId.set(channel.originId, index);
		}
		return byId;
	}, new Map<string, number>());

	$: channelIdList = [...channelIds.keys()];

	const visibilities = Object.keys(Visibility) as Visibility[];
</script>

<form class="mx-auto mt-4 flex max-w-lg flex-col gap-4" {action} method="post" use:enhance>
	{#if error}
		<aside class="alert variant-filled-error">
			<div class="alert-message">
				<p class="whitespace-pre-line">{error}</p>
			</div>
		</aside>
	{/if}
	<div class="flex justify-end">
		<button class="btn variant-filled-secondary">
			{#if list}
				{$LL.buttons.update()}
			{:else}
				{$LL.buttons.create()}
			{/if}
		</button>
	</div>
	<label class="label">
		<span>{$LL.labels.title()}</span>
		<input value={list?.title || ''} class="input" type="text" name="title" required />
	</label>
	<label class="label">
		<span>{$LL.labels.description()}</span>
		<textarea value={list?.description || ''} class="textarea" name="description" />
	</label>
	<label class="label">
		<span>{$LL.labels.visibility()}</span>
		<select
			class="select"
			name="visibility"
			value={list?.visibility || Visibility.Unlisted}
			required>
			{#each visibilities as visibility}
				<option value={visibility}>{$LL.enums.visibility[visibility]()}</option>
			{/each}
		</select>
	</label>
	<span class="label">Channels</span>
	{#if !channels.length}
		<span class="block text-gray-400">No channels added.</span>
	{:else}
		<div class="max-h-96 overflow-y-auto">
			<div class="grid grid-cols-2">
				{#each channels as channel (channel.originId)}
					<ChannelCard shouldFocus compact {locale} {channel}>
						<ChannelCardActions {channel} bind:channels bind:channelIds />
					</ChannelCard>
				{/each}
			</div>
		</div>
	{/if}
	<select name="channelIds" multiple bind:value={channelIdList} class="hidden">
		{#each channelIdList as channelId}
			<option value={channelId}>{channelId}</option>
		{/each}
	</select>
	<ChannelSearch {results} {locale} bind:channels bind:channelIds />
	<div class="my-4 flex justify-end">
		<button class="btn variant-filled-secondary">
			{#if list}
				{$LL.buttons.update()}
			{:else}
				{$LL.buttons.create()}
			{/if}
		</button>
	</div>
</form> -->
