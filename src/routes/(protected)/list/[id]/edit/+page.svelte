<script lang="ts">
	import Seo from '$/routes/SEO.svelte';
	import ListForm from '$/routes/(protected)/components/ListForm.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let data;
	export let form;

	$: if (form?.success) {
		if (browser) {
			const url = `/${form.username}/${form.slug}`;
			goto(url);
		}
	}
</script>

<Seo title="Edit a List" description="Edit a List" />
<ListForm
	formData={data.form}
	action="/list/{data.list.id}/edit?/update"
	list={data.list}
	locale={data.locale}
	results={form?.results}
	error={form?.error} />
