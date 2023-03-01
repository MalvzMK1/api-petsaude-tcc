import PhoneNumberModel from '../model/phoneNumberModel';
import Message from '../messages/message';
import {
    CreateUserInfosProps,
    UpdateUserInfosProps,
} from '../lib/userInfosProps';
import { VetInfos } from '@prisma/client';

const message = new Message();
const phoneNumberModel = new PhoneNumberModel();

class PhoneNumber{

    async PhoneUserAdd(userID:number ,PhoneNumber: string){

        try {

            const addPhone = await phoneNumberModel.createPhone(userID,PhoneNumber)

            if (addPhone) {
                return{

                    statusCode: 201,
                    message: addPhone

                }
            } else {
                return {
                    statusCode: 400,
                    message: message.MESSAGE_ERROR.REQUIRED_FIELDS
                }
            }
        } catch (err) {
            console.log(err);
            return {
              statusCode: 500,
              message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
            };
        }
    }
}

export default new PhoneNumber();
