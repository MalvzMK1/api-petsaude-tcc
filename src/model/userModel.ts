import prisma from '../lib/prisma';

export default class UserModel {
  async selectClientById(userID: number) {
    try {
      return await prisma.user.findUnique({
        where: {
          id: userID,
        },
        include: {
          Pet: true,
          PhoneNumber: true,
          address: {
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
                  speecialities: true,
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
          Pet: true,
          PhoneNumber: true,
          address: {
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
                  speecialities: true,
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
  async DeletUser(userID: number) {
    try {
      return await prisma.user.delete({
        where: {
          id: userID,
        },
        include: {
          Pet: true,
          PhoneNumber: true,
          address: {
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
                  speecialities: true,
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
    } catch (err) {}
  }
}
