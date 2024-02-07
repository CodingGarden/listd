<script lang="ts">
	import Seo from '$/routes/SEO.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import ListForm from '../components/ListForm.svelte';

	export let data;
	export let form;

	$: if (form?.success) {
		const url = `/${form.username}/${form.slug}`;
		if (browser) {
			goto(url);
		}
	}
</script>

<Seo title="Create a List" description="Create a List" />
<ListForm
	formData={data.form}
	list={undefined}
	action="/create?/create"
	locale={data.locale}
	results={form?.results}
	error={form?.error} />
