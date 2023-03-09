export default function validateEmptyBody(rawBody: object) {
	if (
		JSON.stringify(rawBody) === '{}' ||
		rawBody === undefined ||
		rawBody === null
	)
		return false;
	return true;
}
