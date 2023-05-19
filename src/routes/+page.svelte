<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { seo } from '$lib/stores/SeoStore';

	// export let data;

	let loading = false;

	seo.set({
		title: 'Re-orienting Nigerians on the Importance of Essential Core Values',
		description:
			'A new system is being developed that will help to re-orientate Nigerians on the importance of practicing essential core values.',
	});
</script>

<div class="hero-container mx-auto flex max-w-sm flex-col items-center justify-center p-4">
	{#if $page.data.session}
		<h1 class="my-4 text-center">
			Re-orienting Nigerians on the Importance of Essential Core Values
		</h1>
		<p class="my-4 text-center">
			Nigeria is a country with a rich history and culture. However, in recent years, there has been
			a decline in the practice of essential core values such as patriotism, hard work, honesty, and
			respect. This decline has led to a number of problems, including social unrest, corruption,
			and economic stagnation.
		</p>
		<p class="my-4 text-center">
			A new system is being developed that will help to re-orientate Nigerians on the importance of
			practicing essential core values. The system will house the data of patriotic youth corpers
			who will be charged with delivering re-orientation programs to Nigerians. The programs will
			cover a wide range of topics, including the history of Nigeria, the country's national
			symbols, and the country's achievements. The programs will also provide opportunities for
			Nigerians to volunteer their time, to help others, and to participate in community activities.
		</p>
		<p class="my-4 text-center">
			The system is designed to be user-friendly and easy to use. It will also be secure and protect
			the privacy of the data it contains.
		</p>
		<p class="my-4 text-center">
			We believe that this system can be a valuable tool for re-orientating Nigerians on the
			importance of practicing essential core values. It can help to create a more patriotic,
			hard-working, honest, and respectful society.
		</p>
		<a href="/create" class="btn variant-filled-secondary" data-sveltekit-preload-data="hover"
			>Create a new re-orientation program</a>
	{:else}
		<h1 class="my-4 text-center">
			Re-orienting Nigerians on the Importance of Essential Core Values
		</h1>
		<p class="my-4 text-center">
			<b
				>Join us in re-orienting Nigerians on the importance of practicing essential core values!</b>
		</p>
		<p class="my-4 text-center">
			To get started, simply click the button below to sign in with your Google account.
		</p>
		<button
			on:click|once={function loginClick() {
				loading = true;
				signIn('google');
			}}
			disabled={loading}
			class="btn variant-filled-primary cursor-pointer">
			{#if loading}
				{$LL.messages.pleaseWait()} <ProgressRadial class="ml-2 h-6 w-6" stroke={100} />
			{:else}
				{$LL.buttons.login()}
			{/if}
		</button>
	{/if}
</div>
