<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2 class="font-bold">{data.list?.title}</h2>
<p>{data.list?.description}</p>
