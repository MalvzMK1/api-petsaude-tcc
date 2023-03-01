import prisma from '../lib/prisma';

export default class SpecialtiesPetModel {

    async createPetSpecialties(specialtiesPets: string){

        try {
            return await prisma.animalTypes.create({
                data: {
                    name: specialtiesPets
                }
            });
        } catch (err) {
            throw new Error(`${err}`);
        }

    }
}