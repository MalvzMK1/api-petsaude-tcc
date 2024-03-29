export default function transformDateTimeStringIntoDate(
	dateTime: string
): Date {
	const [date, time] = dateTime.split(' ');
	const [day, month, year] = date.split('-').map(Number);
	const [hours, minutes, seconds] = time.split(':').map(Number);
	return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
}

export function transformDateStringIntoDate(date: string): Date {
	const [day, month, year] = date.split('-').map(Number);
	return new Date(Date.UTC(year, month - 1, day));
}

// export function transformHourStringIntoDate(time: string): Date {
// 	const [hours, minutes, seconds] = time.split(':').map(Number);
// 	return new Date(Date.UTC(1970)).setHours(hours, minutes, seconds);
// }
