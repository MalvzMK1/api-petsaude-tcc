import prisma from "../lib/prisma";

class RatingModel {
	async getRatingById(id: number) {
		return prisma.rating.findUnique({
			where: {
				id
			},
			include: {
				Veterinary: true,
				Client: true
			}
		})
	}

	async createRating(infos: RatingInfos, clientId: number) {
		return prisma.rating.create({
			data: {
				clientId: clientId,
				description: infos.description,
				score: infos.score,
				veterinaryId: infos.veterinaryId
			} 
		});
	}

	async getVeterinaryRatings(veterinaryId: number) {
		return prisma.rating.findMany({
			where: {
				veterinaryId
			},
			include: {
				Veterinary: true,
				Client: true
			}
		});
	}

	async deleteRating(id: number) {
		return prisma.rating.delete({
			where: {
				id
			}
		})
	}

	async updateRaging(id: number, infos: RatingInfos) {
		return prisma.rating.update({
			where: {
				id
			},
			data: infos
		})
	}
}

export default new RatingModel()
