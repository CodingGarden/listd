import { PrismaClient } from '@prisma/client';

const globalPrismaVariable = globalThis as unknown as { prisma: PrismaClient };

// TODO: use $env module instead of import.meta.env
export const prisma =
	globalPrismaVariable.prisma ||
	new PrismaClient({
		log: import.meta.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
	});

if (import.meta.env.NODE_ENV !== 'production') globalPrismaVariable.prisma = prisma;
