<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import { formatNumberCompact } from '$lib/utils';

	export let locale: string;
	export let viewCount: number;
</script>

<span class="font-bold">{$LL.labels.views(formatNumberCompact(viewCount, locale))}</span>
