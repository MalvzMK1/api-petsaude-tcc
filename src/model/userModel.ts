import prisma from '../lib/prisma';
import UserInfosProps from '../lib/userInfosProps';

export default class UserModel {
  async createUser(userInfos: UserInfosProps) {
    if (!userInfos.isVet) {
      return await prisma.user.create({
        data: {
          userName: userInfos.userName,
          personName: userInfos.personName,
          cpf: userInfos.cpf,
          rg: userInfos.rg,
          email: userInfos.email,
          password: userInfos.password,
          isVet: userInfos.isVet,
          profilePhoto: userInfos.profilePhoto,
          profileBannerPhoto: userInfos.profileBannerPhoto,
          Address: {
            create: {
              cep: userInfos.cep,
              number: userInfos.number,
              street: userInfos.street,
              complement: userInfos.complement,
              neighborhood: userInfos.neighborhood,
              city: {
                connectOrCreate: {
                  where: {
                    id: userInfos.cityId,
                  },
                  create: {
                    name: userInfos.cityName,
                    stateId: userInfos.stateId,
                  },
                },
              },
            },
          },
        },
      });
    } else if (userInfos.vetInfos)
      return await prisma.user.create({
        data: {
          userName: userInfos.userName,
          personName: userInfos.personName,
          cpf: userInfos.cpf,
          rg: userInfos.rg,
          email: userInfos.email,
          password: userInfos.password,
          isVet: userInfos.isVet,
          profilePhoto: userInfos.profilePhoto,
          profileBannerPhoto: userInfos.profileBannerPhoto,
          Address: {
            create: {
              cep: userInfos.cep,
              number: userInfos.number,
              street: userInfos.street,
              complement: userInfos.complement,
              neighborhood: userInfos.neighborhood,
              city: {
                connectOrCreate: {
                  where: {
                    id: userInfos.cityId,
                  },
                  create: {
                    name: userInfos.cityName,
                    stateId: userInfos.stateId,
                  },
                },
              },
            },
          },
          vetInfos: {
            create: {
              crmv: userInfos.vetInfos.crmv,
              formation: userInfos.vetInfos.formation,
              occupationArea: userInfos.vetInfos.occupationArea,
              institution: userInfos.vetInfos.institution,
            },
          },
        },
      });
    return false;
  }
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
              city: {
                include: {
                  state: true,
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
      throw new Error(`ERROR: ${err}`);
    }
  }
  async findAllUsers() {
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
              city: {
                include: {
                  state: true,
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
      throw new Error(`ERROR: ${err}`);
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
      const animalTypesVetInfosDelete =
        await prisma.animalTypesVetInfos.deleteMany({
          where: {
            vet: {
              User: {
                every: {
                  id: userID,
                },
              },
            },
          },
        });
      const veterinarySpecialitiesDelete =
        await prisma.veterinarySpecialities.deleteMany({
          where: {
            vetInfos: {
              User: {
                every: {
                  id: userID,
                },
              },
            },
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

      if (
        userPhoneNumberDelete &&
        userPetDelete &&
        animalTypesVetInfosDelete &&
        veterinarySpecialitiesDelete &&
        userVetInfos &&
        userDelete
      )
        return true;
      return false;
    } catch (err) {
      throw new Error(`ERROR: ${err}`);
    }
  }
}
