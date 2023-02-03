<script lang="ts">
  import { LL } from '$lib/i18n/i18n-svelte';
  import { IconBrandYoutube } from "@tabler/icons-svelte";
</script>

<div class="p-4 hero-container flex flex-col justify-center items-center">
  <p class="my-4 text-center">{ $LL.tagline() }</p>
  <a href="/onboarding" class="btn btn-filled-primary btn-base cursor-pointer">
    { $LL.signUp() } <IconBrandYoutube class="ml-1" size={36} stroke={1} />
  </a>
</div>