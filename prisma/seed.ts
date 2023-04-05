import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const veterinary = await prisma.veterinary.create({
		data: {
			personName: 'Deco Alves',
			userName: 'Dedeco',
			cpf: '222.222.222-22',
			rg: '22.222.222-22',
			email: 'johndoe@gmail.com',
			password: 'password123',
			phoneNumber: '',
			cellphoneNumber: '11994600546',
			profilePhoto: 'github.com/malvzmk1.png',
			profileBannerPhoto:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-8k6DfaHAPvcDZfwfslGElUzDsMJkYqKN253N6TF7JEC9yv4EZBNwsWr_TJSt31owGQ&usqp=CAU',
			Address: {
				create: {
					cep: '00000-000',
					number: '000',
				},
			},
			crmv: '1111',
			formation: 'Veterinary',
			institution: 'USP',
			formationDate: new Date('2017-02-03'),
			startActingDate: new Date('2017-04-03'),
			occupationArea: 'Clinic',
			VeterinaryEspecialities: {
				create: {
					specialities: {
						create: {
							name: 'Vacina',
						},
					},
				},
			},
			AnimalTypesVetInfos: {
				create: {
					animalTypes: {
						create: {
							name: 'Dog',
						},
					},
				},
			},
		},
	});

	const client = await prisma.client.create({
		data: {
			personName: 'John Doe',
			userName: 'johhnyDoe',
			cpf: '333.333.333-00',
			rg: '00.000.000-00',
			email: 'johndoe@gmail.com',
			password: 'password123',
			phoneNumber: '',
			cellphoneNumber: '11994600546',
			profilePhoto: 'github.com/malvzmk1.png',
			profileBannerPhoto:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-8k6DfaHAPvcDZfwfslGElUzDsMJkYqKN253N6TF7JEC9yv4EZBNwsWr_TJSt31owGQ&usqp=CAU',
			Address: {
				create: {
					cep: '00000-000',
					number: '000',
				},
			},
			Pet: {
				create: {
					name: 'Patinho',
					birthDate: new Date(),
					photo:
						'https://images.unsplash.com/photo-1558322394-4d8813ceef8a?ixid=MnwyNTE2NnwwfDF8c2VhcmNofDIwfHxzdHJheSUyMGRvZ3xlbnwwfHx8fDE2NDQyNDgzOTM&ixlib=rb-1.2.1&q=85&w=2160',
					microship: false,
					petSize: 'MEDIUM',
					petGender: 'M',
					petSpecie: {
						create: {
							name: 'Dog',
						},
					},
				},
			},
			Appointments: {
				create: {
					date: new Date(),
					startsAt: new Date(),
					endsAt: new Date(),
					status: 'WAITING_CONFIRMATION',
					veterinaryId: 1,
					description: 'lorem ipsum',
				},
			},
		},
	});

	console.log({
		client,
		veterinary,
	});
}

main().catch(async (err) => {
	console.log(err);
});
