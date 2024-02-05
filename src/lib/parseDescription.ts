export default function parseDescription(description: string, classNames: string): string {
	// regexp from: https://stackoverflow.com/questions/11067572/fetching-timestamps-hhmmss-from-youtube-comments-with-youtube-api-using-rege
	return description.replace(
		/(?:(\d*):)?([0-5]?[0-9]):([0-5][0-9])/gi,
		(match, hours, minutes, seconds) => {
			const totalSeconds =
				Number(hours || 0) * 60 * 60 + Number(minutes || 0) * 60 + Number(seconds || 0);
			return `<a class="tabular-nums ${classNames}" href="?t=${totalSeconds}">${match}</a>`;
		}
	);
}
