<script lang="ts">
	import { FileButton } from '@skeletonlabs/skeleton';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { enhance } from '$app/forms';

	let files: FileList;
</script>

<p>{$LL.onboarding.messages.main()}</p>
<form class="pt-4" method="POST" use:enhance={() => async () => {}}>
	<label for="name" class="label">
		<span>{$LL.onboarding.labels.username()}</span>
		<input class="input" type="text" id="username" value="w3cj" minlength="4" required />
	</label>
	<p class="my-4">{$LL.onboarding.messages.avatar()}</p>
	<div class="flex justify-center">
		<FileButton name="avatar" bind:files button="variant-filled-primary"
			>{$LL.onboarding.labels.uploadFile()}</FileButton
		>
	</div>
	<p class="pt-4">{$LL.onboarding.messages.final()}</p>
	<div class="my-4 flex justify-end">
		<button class="btn variant-filled-success">Lets Go!</button>
	</div>
</form>
