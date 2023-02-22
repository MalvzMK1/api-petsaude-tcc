export default interface UserInfosProps {
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
