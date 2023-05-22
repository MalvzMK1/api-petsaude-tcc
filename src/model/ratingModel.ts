import prisma from "../lib/prisma";

class RatingModel {
	async getRatingById(id: number) {
		return prisma.rating.findUnique({
			where: {
				id
			}
		})
	}

	async createRating(infos: RatingInfos) {
		return prisma.rating.create({
			data: infos
		});
	}

	async getVeterinaryRatings(veterinaryId: number) {
		return prisma.rating.findMany({
			where: {
				veterinaryId
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
}

export default new RatingModel()
