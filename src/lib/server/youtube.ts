import { getUserChannel } from '$/lib/server/YouTubeAPI';
import type { Account } from '@auth/core/types';
import prismaClient from '$lib/db.server';

export async function updateAccountUsername(account: Account) {
	if (account.access_token) {
		try {
			const channel = await getUserChannel(account.access_token);
			const username = channel?.snippet?.customUrl;
			if (username) {
				await prismaClient.account.updateMany({
					where: {
						userId: account.userId,
						providerAccountId: account.providerAccountId,
					},
					data: {
						username,
					},
				});
			}
			return username;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	}
	return '@Unknown';
}
