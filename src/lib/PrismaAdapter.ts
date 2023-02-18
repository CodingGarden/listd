/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { PrismaClient } from '@prisma/client';
import type { Adapter } from 'next-auth/adapters';

// TODO: make sure every user query that requires it is updated...
// TODO: fix ts-ignores
export default function CustomPrismaAdapter(client: PrismaClient): Adapter {
	return {
		...PrismaAdapter(client),
		// @ts-ignore
		async getUser(id: string) {
			return client.user.findUnique({
				where: { id },
				include: { settings: true },
			});
		},
		// @ts-ignore
		async getUserByEmail(email) {
			return client.user.findUnique({
				where: { email },
				include: { settings: true },
			});
		},
		// @ts-ignore
		async getUserByAccount(provider) {
			const account = await client.account.findUnique({
				where: { provider_providerAccountId: provider },
				select: {
					user: {
						include: {
							settings: true,
						},
					},
				},
			});
			return account?.user ?? null;
		},
		// @ts-ignore
		async getSessionAndUser(sessionToken) {
			const userAndSession = await client.session.findUnique({
				where: { sessionToken },
				include: {
					user: {
						include: {
							settings: true,
						},
					},
				},
			});

			if (!userAndSession) return null;

			const { user, ...session } = userAndSession;
			return { user, session };
		},
	};
}
