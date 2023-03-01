import { create } from 'domain';
import prisma from '../lib/prisma';
import {
  CreateUserInfosProps,
  UpdateUserInfosProps,
  UpdateUserVetInfosProps,
} from '../lib/userInfosProps';

export default class UserModel {

    async createPhone(userID:number , PhoneNumber: string){

        try {
            
            return await prisma.phoneNumber.create({

                data:{
                    number: PhoneNumber,
                    userId: userID
                }
            })

        } catch (err) {
            throw new Error(`${err}`);
        }

    }

}

