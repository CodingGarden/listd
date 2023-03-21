<script lang="ts">
	import Seo from '$/routes/SEO.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { LL } from '$lib/i18n/i18n-svelte';

	export let data;
	export let form;

	$: if (form?.success) {
		const url = `/list/${form.listId}`;
		if (browser) {
			goto(url);
		}
	}
</script>

<Seo title="Create a List" description="Create a List" />
<form class="mt-4 flex flex-col gap-4" method="post">
	{#if form?.error}
		<aside class="alert variant-filled-error">
			<div class="alert-message">
				<p class="whitespace-pre-line">{form.error}</p>
			</div>
		</aside>
	{/if}
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
		<select class="select" name="visibility" value={data.visibility.Unlisted} required>
			{#each data.visibilities as visibility}
				<option value={visibility}>{$LL.enums.visibility[visibility]()}</option>
			{/each}
		</select>
	</label>
	<div class="flex justify-end">
		<button class="btn variant-filled-secondary">{$LL.buttons.create()}</button>
	</div>
</form>
