<script lang="ts">
	import Seo from '$/routes/SEO.svelte';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { page } from '$app/stores';
</script>

<Seo title="Onboarding | listd" description="Onboarding page for listd" />
<div class="mx-auto max-w-lg">
	<p>{$LL.pages.onboarding.messages.main()}</p>
	<form class="pt-4" method="POST">
		<label for="name" class="label">
			<span>{$LL.pages.onboarding.labels.username()}</span>
			<input
				class="disabled input"
				type="text"
				id="name"
				name="name"
				value={$page.data.session?.user?.name}
				disabled
				minlength="4"
				required />
		</label>
		<p class="pt-4">{$LL.pages.onboarding.messages.final()}</p>
		<div class="my-4 flex justify-end">
			<button class="variant-filled-success btn">{$LL.pages.onboarding.buttons.letsGo()}</button>
		</div>
	</form>
</div>
