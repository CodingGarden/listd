<script lang="ts">
import { LL } from '$lib/i18n/i18n-svelte';
import { enhance } from '$app/forms';
import { Avatar, FileButton } from '@skeletonlabs/skeleton';
let files: FileList;
</script>

<p>{ $LL.onboarding.messages.main() }</p>
<form
  class="pt-4"
  method="POST"
  use:enhance={({ form, data, action, cancel }) => {
    return async ({ result, update }) => {}
  }}
>
  <label for="name">
    <span>{ $LL.onboarding.labels.username() }</span>
    <input type="text" id="username" value="w3cj" minlength="4" required>
  </label>
  <p class="my-4">{ $LL.onboarding.messages.avatar() }</p>
  <div class="flex justify-center">
    <FileButton bind:files button="btn-filled-primary">{ $LL.onboarding.labels.uploadFile() }</FileButton>
  </div>
  <p class="pt-4">{ $LL.onboarding.messages.final() }</p>
  <div class="flex justify-end my-4">
    <button class="btn btn-filled-success btn-base">Lets Go!</button>
  </div>
</form>
