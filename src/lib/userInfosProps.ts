export interface CreateUserInfosProps {
  personName: string;
  userName: string;
  cpf: string;
  rg: string;
  profilePhoto?: string;
  profileBannerPhoto?: string;
  email: string;
  password: string;
  isVet: boolean;
  cep: string;
  street: string;
  complement?: string;
  number: string;
  neighborhood: string;
  cityId: number;
  cityInitials: string;
  cityName: string;
  stateId: number;
  vetInfos?: {
    occupationArea: string;
    formation: string;
    institution: string;
    crmv: string;
  };
}

export interface UpdateUserInfosProps {
  personName: string;
  userName: string;
  cpf: string;
  rg: string;
  profilePhoto?: string;
  profileBannerPhoto?: string;
  email: string;
  password: string;
  isVet: boolean;
  addressId: number;
  vetInfosId?: number;
  vetInfos?: {
    occupationArea: string;
    formation: string;
    institution: string;
    crmv: string;
  };
}

export interface UpdateUserVetInfosProps {
  occupationArea: string;
  formation: string;
  institution: string;
  crmv: string;
}
