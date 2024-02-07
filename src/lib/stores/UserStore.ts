import { writable } from 'svelte/store';
import type { User } from '@auth/core/types';

export const userStore = writable<{
	user: User | undefined;
}>({
	user: undefined,
});
