<script lang="ts">
	import Seo from '$/routes/SEO.svelte';
	import ListForm from '$/routes/(protected)/components/ListForm.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let data;
	export let form;

	$: if (form?.success) {
		if (browser) {
			const url = `/list/${form.listId}`;
			goto(url);
		}
	}
</script>

<Seo title="Edit a List" description="Edit a List" />
<ListForm
	action={`/edit/${data.list.id}?/update`}
	list={data.list}
	locale={data.locale}
	results={form?.results}
	error={form?.error} />
