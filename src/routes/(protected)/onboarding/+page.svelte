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
</script>

<p>{$LL.onboarding.messages.main()}</p>
<form class="grid gap-2 pt-4" method="POST">
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
	<label for="locale" class="label">
		<span>{$LL.onboarding.labels.locale()}</span>
		<select
			class="select w-full max-w-xs"
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
	</label>
	<label for="colorScheme" class="label">
		<span>{$LL.onboarding.labels.colorScheme()}</span>
		<select
			class="select w-full max-w-xs"
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
	</label>
	<p class="pt-4">{$LL.onboarding.messages.final()}</p>
	<div class="my-4 flex justify-end">
		<button class="btn variant-filled-success">Lets Go!</button>
	</div>
</form>
