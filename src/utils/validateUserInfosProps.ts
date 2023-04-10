export default class ValidateUserInfosProps {
	validateUpdateUserInfos(userInfos: UpdateUserInfosProps) {
		return !(userInfos.cpf === null ||
			userInfos.cpf === '' ||
			userInfos.personName === null ||
			userInfos.personName === '' ||
			userInfos.rg === null ||
			userInfos.rg === '' ||
			userInfos.cellphoneNumber === '' ||
			userInfos.cellphoneNumber === null ||
			userInfos.phoneNumber === '' ||
			userInfos.phoneNumber === null
		);

	}
}
