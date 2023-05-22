import ratingModel from "../model/ratingModel";

class RatingController {
	async createRating(infos: RatingInfos) {
		try {
			if (infos.score < 0 || infos.score > 5) return {statusCode: 400, error: 'A avaliação deve ter um range de 0 a 5'}

			const createdRating = await ratingModel.createRating(infos)
			if (createdRating) return {statusCode: 201, createdRating}
			return {statusCode: 500, error: 'Não foi possível realizar a avaliação'}
		} catch (error) {
			return handleError(error)
		}
	}

	async getVeterinaryRatings(veterinaryId: number) {
		try {
			const ratings = await ratingModel.getVeterinaryRatings(veterinaryId)
			if (ratings.length > 0) return {statusCode: 200, ratings}
			return {statusCode: 404, error: 'Nenhuma avaliação encontrada'}
		} catch (error) {
			return handleError(error)
		}
	}

	async deleteRating(ratingId: number, userInfos: { id: number, userType: string }) {
		try {
			let parsedUserType: UserRole
			switch (userInfos.userType) {
				case 'COMMON':
					parsedUserType = 'COMMON'
					break
				case 'VETERINARY':
					parsedUserType = 'VETERINARY'
					break
				default:
					return {statusCode: 400, error: {message: 'Tipo de usuário inválido', options: ['COMMON', 'VETERINARY']}}
			}
			const rating = await ratingModel.getRatingById(ratingId)

			if (rating) {
				if (parsedUserType === 'VETERINARY') {
					if (rating.veterinaryId === userInfos.id) {
						const deletedRating = await ratingModel.deleteRating(ratingId)
						return {statusCode: 200, deletedRating}
					}
					return {statusCode: 401, error: 'Não é possível excluir uma avaliação de outro usuário'}
				} else {
					if (rating.clientId === userInfos.id) {
						const deletedRating = await ratingModel.deleteRating(ratingId)
						return {statusCode: 200, deletedRating}
					}
					return {statusCode: 401, error: 'Não é possível excluir uma avaliação de outro usuário'}
				}
			}
			return {statusCode: 404, error: 'Nenhuma avaliação encontrada'}
		} catch (error) {
			return handleError(error)
		}
	}
}

function handleError<T>(error: T) {
	if (error instanceof Error) {
		// @ts-ignore
		if (error.code) {
			// @ts-ignore
			if (error.code.startsWith('P10')) return {statusCode: 500, error}
			// @ts-ignore
			if (error.code.startsWith('P20')) {
				// @ts-ignore
				if (error.code === 'P2000') return {
					statusCode: 400,
					// @ts-ignore
					error: {message: 'O dado enviado é muito grande', meta: error.meta}
				}
				// @ts-ignore
				if (error.code === 'P2003') return {
					statusCode: 400,
					// @ts-ignore
					error: {message: 'Nenhum registro encontrado', meta: error.meta}
				}
			}
			// @ts-ignore
			if (error.code.startsWith('P30')) return {statusCode: 500, error}
		}
		return {statusCode: 400, error: error.message}
	}
	return {statusCode: 500, error}
}

export default new RatingController()
