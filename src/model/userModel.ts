import prisma from '../lib/prisma';

export default class UserModel {
  async findUserById(userID: number) {
    try {
      return await prisma.user.findUnique({
        where: {
          id: userID,
        },
        include: {
          Pet: {
            include: {
              petGender: true,
              petSize: true,
              petSpecie: true,
            },
          },
          PhoneNumber: true,
          Address: {
            include: {
              neighborhood: {
                include: {
                  city: {
                    include: {
                      state: true,
                    },
                  },
                },
              },
            },
          },
          vetInfos: {
            include: {
              VeterinaryEspecialities: {
                include: {
                  specialities: true,
                },
              },
              AnimalTypesVetInfos: {
                include: {
                  animalTypes: true,
                },
              },
            },
          },
        },
      });
    } catch (err) {
      throw new Error(`Unexpecter error in the database \n ERROR: ${err}`);
    }
  }
  async selectAllUser() {
    try {
      return await prisma.user.findMany({
        include: {
          Pet: {
            include: {
              petGender: true,
              petSize: true,
              petSpecie: true,
            },
          },
          PhoneNumber: true,
          Address: {
            include: {
              neighborhood: {
                include: {
                  city: {
                    include: {
                      state: true,
                    },
                  },
                },
              },
            },
          },
          vetInfos: {
            include: {
              VeterinaryEspecialities: {
                include: {
                  specialities: true,
                },
              },
              AnimalTypesVetInfos: {
                include: {
                  animalTypes: true,
                },
              },
            },
          },
        },
      });
    } catch (err) {
      throw new Error(`Unexpecter error in the database \n ERROR: ${err}`);
    }
  }
  async deleteUser(userID: number) {
    try {
      const userPhoneNumberDelete = await prisma.phoneNumber.deleteMany({
        where: {
          userId: userID,
        },
      });
      const userPetDelete = await prisma.pet.deleteMany({
        where: {
          userId: userID,
        },
      });
      const userVetInfos = await prisma.vetInfos.deleteMany({
        where: {
          User: {
            every: {
              id: userID,
            },
          },
        },
      });
      const userDelete = await prisma.user.deleteMany({
        where: {
          id: userID,
          Address: {},
        },
      });

      if (userPhoneNumberDelete && userPetDelete && userVetInfos && userDelete)
        return true;
      return false;
    } catch (err) {
      throw new Error(`Unexpecter error in the database \n ERROR: ${err}`);
    }
  }
}
