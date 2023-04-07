import { DateTime, Duration } from 'luxon';

const formatters = new Map<string, Intl.NumberFormat>();

export const getCompactNumberFormatter = (locale: string): Intl.NumberFormat => {
	let formatter = formatters.get(locale);
	if (formatter) return formatter;
	formatter = new Intl.NumberFormat(locale, {
		notation: 'compact',
		compactDisplay: 'short',
	});
	formatters.set(locale, formatter);
	return formatter;
};

export const formatNumberCompact = (value: number, locale: string) => {
	const formatter = getCompactNumberFormatter(locale);
	return formatter.format(value);
};

export const formatRelativeDate = (timeStamp: number, locale: string) =>
	DateTime.fromMillis(timeStamp).toRelative({ locale });

export const formatDuration = (duration: string) => {
	const interval = Duration.fromISO(duration);
	let format = 'm:ss';
	if (interval.days && interval.days > 0) {
		format = 'd:hh:mm:ss';
	} else if (interval.hours && interval.hours > 0) {
		format = 'h:mm:ss';
	}
	return interval.toFormat(format);
};
