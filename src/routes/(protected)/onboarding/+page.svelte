<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import { page } from '$app/stores';
</script>

<p>{$LL.onboarding.messages.main()}</p>
<form class="pt-4" method="POST">
	<label for="name" class="label">
		<span>{$LL.onboarding.labels.username()}</span>
		<input
			class="disabled input"
			type="text"
			id="name"
			name="name"
			value={$page.data.session?.user?.name}
			disabled
			minlength="4"
			required
		/>
	</label>
	<p class="pt-4">{$LL.onboarding.messages.final()}</p>
	<div class="my-4 flex justify-end">
		<button class="btn variant-filled-success">Lets Go!</button>
	</div>
</form>
