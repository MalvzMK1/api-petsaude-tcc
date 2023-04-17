export default function removeDuplicates(
	array: Array<{ name: string }>
): Array<{ name: string }> {
	const unique: Array<{ name: string }> = [];
	array.forEach((element) => {
		if (
			!unique.some(
				(item) =>
					item.name.toLowerCase() === element.name.toLowerCase() ||
					element.name.length < 1 ||
					element.name === null ||
					element.name === undefined ||
					element.name === ''
			)
		) {
			unique.push(element);
		}
	});
	return unique;
}
