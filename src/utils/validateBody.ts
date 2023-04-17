export default function validateEmptyBody(rawBody: object | unknown) {
	return !(JSON.stringify(rawBody) === '{}' ||
		rawBody === undefined ||
		rawBody === null);

}
