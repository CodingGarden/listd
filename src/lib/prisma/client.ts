import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { PrismaClient, User, UserSettings } from '@prisma/client';
import type { Adapter, AdapterAccount, AdapterSession } from 'next-auth/adapters';

type OGAdapter = Omit<
	Adapter,
	'getUser' | 'getUserByEmail' | 'getUserByAccount' | 'getSessionAndUser'
>;

type AnnotatedUser = User & { settings: UserSettings | null; username: string | null };

async function getAnnotatedUser(
	client: PrismaClient,
	user: User | null
): Promise<AnnotatedUser | null> {
	if (!user) return null;
	const account = await client.account.findFirst({
		where: {
			userId: user.id,
			provider: 'google',
		},
	});

	const userWithUsername = user as AnnotatedUser;
	if (account) {
		userWithUsername.username = account.username;
	}

	return userWithUsername;
}

export interface CustomAdapter extends OGAdapter {
	getUser(id: string): Promise<AnnotatedUser | null>;
	getUserByEmail(email: string): Promise<AnnotatedUser | null>;
	getUserByAccount(
		providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>
	): Promise<AnnotatedUser | null>;
	getSessionAndUser(sessionToken: string): Promise<{
		session: AdapterSession;
		user: AnnotatedUser;
	} | null>;
}

export default function CustomPrismaAdapter(client: PrismaClient): CustomAdapter {
	return {
		...PrismaAdapter(client),
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		createUser({ id, ...data }) {
			return client.user.create({ data });
		},
		async getUser(id: string) {
			const user = await client.user.findUnique({
				where: { id },
				include: { settings: true },
			});

			return getAnnotatedUser(client, user);
		},
		async getUserByEmail(email: string) {
			const user = await client.user.findUnique({
				where: { email },
				include: { settings: true },
			});
			return getAnnotatedUser(client, user);
		},
		async getUserByAccount(
			providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>
		) {
			const account = await client.account.findUnique({
				where: { provider_providerAccountId: providerAccountId },
				include: {
					user: {
						include: {
							settings: true,
						},
					},
				},
			});
			const userWithUsername = account?.user as AnnotatedUser;
			if (account && userWithUsername) {
				userWithUsername.username = account.username;
			}
			return userWithUsername ?? null;
		},
		async getSessionAndUser(sessionToken: string) {
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
			const annotatedUser = await getAnnotatedUser(client, user);
			if (!annotatedUser) return null;
			return { user: annotatedUser, session };
		},
	};
}
