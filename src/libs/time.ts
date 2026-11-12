export const LIMA_TIME_ZONE = 'America/Lima';

export const limaDateTimeFormatter = new Intl.DateTimeFormat('en-US', {
	day: 'numeric',
	hour: '2-digit',
	hour12: false,
	minute: '2-digit',
	month: 'short',
	timeZone: LIMA_TIME_ZONE,
	year: 'numeric',
});
