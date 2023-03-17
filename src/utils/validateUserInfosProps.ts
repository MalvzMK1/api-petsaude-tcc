export default class ValidateUserInfosProps {
	validateUpdateUserInfos(userInfos: UpdateUserInfosProps) {
		if (
			userInfos.addressId === null ||
			userInfos.cpf === null ||
			userInfos.cpf === '' ||
			userInfos.email === null ||
			userInfos.email === '' ||
			userInfos.isVet === null ||
			userInfos.isVet === undefined ||
			userInfos.personName === null ||
			userInfos.personName === '' ||
			userInfos.rg === null ||
			userInfos.rg === '' ||
			userInfos.userName === null ||
			userInfos.userName === ''
		)
			return false;
		return true;
	}
}
