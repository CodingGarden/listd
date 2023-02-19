<script lang="ts">
	import { LL, setLocale } from '$lib/i18n/i18n-svelte';
	import { page } from '$app/stores';
	import { ColorScheme, type Locale } from '@prisma/client';
	import { baseLocale, isLocale, loadedLocales } from '$lib/i18n/i18n-util';
	import type { Locales } from '$lib/i18n/i18n-types';
	import { loadLocaleAsync } from '$lib/i18n/i18n-util.async';
	import { storeLightSwitch, storePrefersDarkScheme } from '@skeletonlabs/skeleton';

	const locales = $page.data.locales.filter((l: Locale) => isLocale(l.id));

	export let currentColorScheme = $page.data.session?.user?.settings.colorScheme;
	export let currentLocale = $page.data.session?.user?.settings.localeId;
	export let fieldErrors = $page.form?.fieldErrors;

	const changeTheme = () => {
		const htmlElement = document.documentElement;
		const schemes = Object.values(ColorScheme).map((c) => c.toLowerCase());
		const preferedColorScheme = $storePrefersDarkScheme ? 'Dark' : 'Light';
		let colorScheme = currentColorScheme || preferedColorScheme;

		if (colorScheme === 'System') {
			colorScheme = preferedColorScheme;
		}

		storeLightSwitch.set(($storeLightSwitch = colorScheme === 'Dark'));

		htmlElement.classList.remove(...schemes);
		htmlElement.classList.add(colorScheme.toLowerCase());
	};

	const changeLocale = async () => {
		const newLocale = currentLocale || baseLocale;

		if (isLocale(newLocale)) {
			if (!Object.keys(loadedLocales).includes(newLocale)) {
				await loadLocaleAsync(newLocale);
			}
			setLocale(currentLocale as Locales);
		}
	};

	const inputClasses = (classes: string, onError: string, hasError: boolean) =>
		`${classes} ${hasError ? onError : ''}`;
</script>

<p>{$LL.onboarding.messages.main()}</p>
<form class="grid gap-2 pt-4" method="POST">
	<label for="name" class="label">
		<span>{$LL.onboarding.labels.username()}</span>
		<input
			class={inputClasses('disabled input', 'input-error', fieldErrors?.name)}
			type="text"
			id="name"
			name="name"
			value={$page.data.session?.user?.name}
			disabled
			minlength="4"
			required
		/>
		{#if fieldErrors?.name}
			<p class="text-red-500">{fieldErrors?.name}</p>
		{/if}
	</label>
	<label for="locale" class="label">
		<span>{$LL.onboarding.labels.locale()}</span>
		<select
			class={inputClasses('select w-full max-w-xs', 'input-error', fieldErrors?.locale)}
			id="locale"
			name="locale"
			bind:value={currentLocale}
			on:change={() => changeLocale()}
		>
			{#each locales as locale}
				<option value={locale.id}>
					{locale.nativeName}
				</option>
			{/each}
		</select>
		{#if fieldErrors?.locale}
			<p class="text-red-500">{fieldErrors?.locale}</p>
		{/if}
	</label>
	<label for="colorScheme" class="label">
		<span>{$LL.onboarding.labels.colorScheme()}</span>
		<select
			class={inputClasses('select w-full max-w-xs', 'input-error', fieldErrors?.colorScheme)}
			id="colorScheme"
			name="colorScheme"
			bind:value={currentColorScheme}
			on:change={() => changeTheme()}
		>
			{#each $page.data.colorSchemes as colorScheme}
				<option value={colorScheme}>
					{colorScheme}
				</option>
			{/each}
		</select>
		{#if fieldErrors?.colorScheme}
			<p class="text-red-500">{fieldErrors?.colorScheme}</p>
		{/if}
	</label>
	<p class="pt-4">{$LL.onboarding.messages.final()}</p>
	<div class="my-4 flex justify-end">
		<button class="btn variant-filled-success">Lets Go!</button>
	</div>
</form>
