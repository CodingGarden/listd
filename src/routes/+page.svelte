<script lang="ts">
	import { IconBrandYoutube } from '@tabler/icons-svelte';
	import { LL } from '$lib/i18n/i18n-svelte';

	[1, 2, 3].reduce((sum, value) => value + sum);
	// [1, 2, 3].reduce((sum, value) => value + sum);
</script>

<div class="hero-container flex flex-col items-center justify-center p-4">
	<p class="my-4 text-center">{$LL.tagline()}</p>
	<a href="/onboarding" class="btn btn-base btn-filled-primary cursor-pointer">
		{$LL.signUp()}
		<IconBrandYoutube class="ml-1" size={36} stroke={1} />
	</a>
</div>
