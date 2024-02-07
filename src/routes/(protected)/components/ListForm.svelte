<script lang="ts">
	/* eslint-disable @typescript-eslint/no-non-null-assertion */
	import {
		Visibility,
		type List,
		type ListItem,
		type ListItemMeta,
		type YouTubeMeta,
	} from '@prisma/client';
	import { superForm } from 'sveltekit-superforms/client';
	import type { YouTubeChannelMetaAPIResponse } from '$/lib/server/YouTubeAPI';
	import { LL } from '$lib/i18n/i18n-svelte';
	import ChannelCard from '$/lib/components/ChannelCard.svelte';
	import { PlusSquare, Save } from 'lucide-svelte';
	import type { ListSchema } from '$/lib/schemas';
	import type { SuperValidated } from 'sveltekit-superforms';
	import slugify from 'slugify';
	import ChannelCardActions from './ChannelCardActions.svelte';
	import ChannelSearch from './ChannelSearch.svelte';

	export let formData: SuperValidated<ListSchema>;

	type ListWithItems = List & {
		items: (ListItem & {
			meta: ListItemMeta & {
				youtubeMeta: YouTubeMeta | null;
			};
		})[];
	};

	const { form, errors, constraints, tainted, enhance } = superForm(formData);

	export let list: undefined | ListWithItems;
	export let action: string;
	export let error: string | undefined;
	export let locale: string;
	export let results: YouTubeChannelMetaAPIResponse[] | undefined;

	let customSlug = false;

	let channels: YouTubeChannelMetaAPIResponse[] =
		list?.items.map((item) => item.meta.youtubeMeta!) || [];

	$: channelIds = channels.reduce((byId, channel, index) => {
		if (channel.originId) {
			byId.set(channel.originId, index);
		}
		return byId;
	}, new Map<string, number>());

	$: channelIdList = [...channelIds.keys()];

	$: form.update(
		($form) => {
			$form.channelIds = channelIdList;
			return $form;
		},
		{
			taint: channelIdList.length !== 0,
		}
	);

	const visibilities = Object.keys(Visibility) as Visibility[];

	const onSlugChange = (event: KeyboardEvent) => {
		if (event.code.match(/Tab|Shift/)) {
			return;
		}
		customSlug = !!$form.slug.trim();
		form.update(($form) => {
			$form.slug = $form.slug.toLowerCase();
			return $form;
		});
	};

	const updateSlug = () => {
		if (!customSlug) {
			form.update(($form) => {
				$form.slug = slugify($form.title, {
					strict: true,
					lower: true,
				});
				return $form;
			});
		}
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
		<button
			class="btn flex gap-2"
			disabled={!$tainted}
			class:variant-filled-warning={!list}
			class:variant-filled-secondary={list}>
			{#if list}
				<Save /> {$LL.buttons.update()}
			{:else}
				<PlusSquare /> {$LL.buttons.create()}
			{/if}
		</button>
	</div>
	{#if $form.id}
		<input name="id" class="hidden" value={$form.id} />
	{/if}
	<label class="label">
		<span>{$LL.labels.title()}</span>
		<input
			bind:value={$form.title}
			on:input={updateSlug}
			class="input"
			class:input-error={$errors.title}
			type="text"
			name="title"
			aria-invalid={$errors.title ? 'true' : undefined}
			{...$constraints.title} />
	</label>
	{#if $errors.title}
		<div class="alert variant-filled-error">
			<div class="alert-message">
				<p>{$errors.title}</p>
			</div>
		</div>
	{/if}
	<label class="label">
		<span>{$LL.labels.slug()}</span>
		<input
			bind:value={$form.slug}
			on:keyup={onSlugChange}
			class="input"
			class:input-error={$errors.slug}
			type="text"
			name="slug"
			aria-invalid={$errors.slug ? 'true' : undefined}
			{...$constraints.slug} />
	</label>
	{#if $errors.slug}
		<div class="alert variant-filled-error">
			<div class="alert-message">
				<p>{$errors.slug}</p>
			</div>
		</div>
	{/if}
	<label class="label">
		<span>{$LL.labels.description()}</span>
		<textarea
			bind:value={$form.description}
			class="textarea"
			name="description"
			aria-invalid={$errors.description ? 'true' : undefined}
			{...$constraints.description} />
	</label>
	{#if $errors.description}
		<div class="alert variant-filled-error">
			<div class="alert-message">
				<p>{$errors.description}</p>
			</div>
		</div>
	{/if}
	<label class="label">
		<span>{$LL.labels.visibility()}</span>
		<select class="select" name="visibility" bind:value={$form.visibility} required>
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
	{#if $errors.channelIds}
		<div class="alert variant-filled-error">
			<div class="alert-message">
				<p>
					<!-- eslint-disable-next-line no-underscore-dangle -->
					{$errors.channelIds?._errors?.join(' ')}
				</p>
			</div>
		</div>
	{/if}
	<ChannelSearch {results} {locale} bind:channels bind:channelIds />
	<div class="my-4 flex justify-end">
		<button
			class="btn flex gap-2"
			disabled={!$tainted}
			class:variant-filled-warning={!list}
			class:variant-filled-secondary={list}>
			{#if list}
				<Save /> {$LL.buttons.update()}
			{:else}
				<PlusSquare /> {$LL.buttons.create()}
			{/if}
		</button>
	</div>
</form>
