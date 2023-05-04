export default function validateIfIsVet(decodedToken: JwtSignUser): boolean {
	return decodedToken.isVet
}
