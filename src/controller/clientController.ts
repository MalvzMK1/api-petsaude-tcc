import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class ClientController {
  async selectClientById(userID: number) {
    return await prisma.user.findUnique({
      where: {
        id: userID,
      },
      include: {
        Pet: true,
        PhoneNumber: true,
        address: true,
      },
    });
  }
}
