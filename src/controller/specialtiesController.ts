import Message from '../messages/message';
import SpecialtiesModel from '../model/specialtiesModel';
import { VetInfos } from '@prisma/client';

const specialtiesModel = new SpecialtiesModel();
const message = new Message();

class SpecialtiesController {

    async createSpecialties(specialties:string) {

        try {
            
            const createSpecialties = await specialtiesModel.createSpecialties(specialties)
            if (createSpecialties)
                return {
                    statusCode: 201,                 
                    message: createSpecialties,
                };
            return {
                statusCode: 400,
                message: message.MESSAGE_ERROR.REQUIRED_FIELDS,
            };

        } catch (err) {
            console.log(err);
            return {
              statusCode: 500,
              message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
            };
        }

    }

}

export default new SpecialtiesController;