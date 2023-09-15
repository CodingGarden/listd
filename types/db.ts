import type { List, ListItem, ListItemMeta, YouTubeMeta } from '@prisma/client';

export type ListItemMetaWithYouTubeMeta = ListItemMeta & {
	youtubeMeta?: YouTubeMeta;
};

export type ListItemWithMeta = ListItem & {
	meta?: ListItemMetaWithYouTubeMeta;
};

export type ListWithItems = List & {
	items?: ListItemWithMeta[];
};
