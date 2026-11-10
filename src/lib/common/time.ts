// Small date helpers for the catppuccin-mocha layouts.
const UNITS: [string, number][] = [
	['year', 31536000],
	['month', 2592000],
	['day', 86400],
	['hour', 3600],
	['minute', 60]
];

/** "3 days ago" or "in 11 days". Empty string for an invalid date. */
export function relative(date: Date, now: Date = new Date()): string {
	if (isNaN(date.getTime())) return '';
	const diff = Math.round((date.getTime() - now.getTime()) / 1000);
	const abs = Math.abs(diff);
	for (const [name, secs] of UNITS) {
		if (abs >= secs) {
			const n = Math.floor(abs / secs);
			const label = `${n} ${name}${n === 1 ? '' : 's'}`;
			return diff < 0 ? `${label} ago` : `in ${label}`;
		}
	}
	return 'just now';
}

/** "2026-07-29 12:24" in local time. Empty string for an invalid date. */
export function stamp(date: Date): string {
	if (isNaN(date.getTime())) return '';
	const p = (n: number) => String(n).padStart(2, '0');
	return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())} ${p(date.getHours())}:${p(date.getMinutes())}`;
}
