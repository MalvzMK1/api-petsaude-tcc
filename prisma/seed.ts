import {PrismaClient} from '@prisma/client';
import bcrypt from '../src/lib/bcrypt'

const prisma = new PrismaClient();

async function main() {
	const client = await prisma.client.create({
		data: {
			personName: 'Herman Li',
			userName: 'hermanoli',
			cpf: '987.654.321-90',
			rg: '12.123.456-12',
			email: 'hermanli@gmail.com',
			password: await bcrypt.hash('senhaherman', 10),
			phoneNumber: '',
			cellphoneNumber: '11932169874',
			profilePhoto: 'https://whiplash.net/imagens_promo_22/dragonforce_herman_li_promo.jpg?nocache',
			profileBannerPhoto:
				'https://images.unsplash.com/photo-1563437018645-2bc38e3b5308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
			Address: {
				create: {
					cep: '06216-901',
					number: '305',
				},
			},
			Pet: {
				create: {
					name: 'Deco',
					birthDate: new Date('2021-04-04'),
					photo:
						'https://loucosporbichos.com.br/wp-content/uploads/2023/02/pastor-alemao.jpg',
					microship: false,
					petSize: 'BIG',
					petGender: 'M',
					petSpecie: {
						create: {
							name: 'Cachorro'
						}
					},
				},
			},
		},
	});

	await prisma.client.create({
		data: {
			personName: 'John Doe',
			userName: 'johhnyDoe',
			cpf: '333.333.333-00',
			rg: '00.000.000-00',
			email: 'johndoe@gmail.com',
			password: await bcrypt.hash('password123', 10),
			phoneNumber: '',
			cellphoneNumber: '11994600546',
			profilePhoto: 'github.com/malvzmk1.png',
			profileBannerPhoto:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-8k6DfaHAPvcDZfwfslGElUzDsMJkYqKN253N6TF7JEC9yv4EZBNwsWr_TJSt31owGQ&usqp=CAU',
			Address: {
				create: {
					cep: '06600-025',
					number: '905',
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
					petSpecieId: 1,
				},
			},
		},
	});

	const veterinary = await prisma.veterinary.create({
		data: {
			personName: 'Deco Alves',
			userName: 'Dedeco',
			cpf: '222.222.222-22',
			rg: '22.222.222-22',
			email: 'dedeco@gmail.com',
			password: await bcrypt.hash('senhadodeco', 10),
			phoneNumber: '',
			cellphoneNumber: '11999999999',
			profilePhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			profileBannerPhoto:
				'https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			Address: {
				create: {
					cep: '04012-909',
					number: '500',
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
			PetSpecieVeterinary: {
				create: {
					PetSpecie: {
						create: {
							name: 'Gato'
						}
					}
				}
			},
			Appointments: {
				create: {
					date: new Date(),
					startsAt: new Date('2023-07-03T10:00:00'),
					duration: 30,
					clientId: 2,
					price: 99.50,
					description: 'lorem ipsum',
					petId: 2
				},
			},
		},
	});

	await prisma.veterinary.create({
		data: {
			personName: 'Will Ramos',
			userName: 'willCore',
			cpf: '321.123.654-78',
			rg: '23.123.123-12',
			email: 'willramos@gmail.com',
			password: await bcrypt.hash('lorna321', 10),
			phoneNumber: '',
			cellphoneNumber: '12995513265',
			profilePhoto: 'https://cdn-p.smehost.net/sites/7f9737f2506941499994d771a29ad47a/wp-content/uploads/2022/03/Will-Ramos.png',
			profileBannerPhoto:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-8k6DfaHAPvcDZfwfslGElUzDsMJkYqKN253N6TF7JEC9yv4EZBNwsWr_TJSt31owGQ&usqp=CAU',
			Address: {
				create: {
					cep: '04301-905',
					number: '4241',
				},
			},
			crmv: '4321',
			formation: 'Veterinary',
			institution: 'USP',
			formationDate: new Date('2017-02-03'),
			startActingDate: new Date('2017-04-03'),
			occupationArea: 'Zoológico',
			VeterinaryEspecialities: {
				create: {
					specialities: {
						create: {
							name: 'Técnico em Zoológico',
						},
					},
				},
			},
			PetSpecieVeterinary: {
				create: {
					PetSpecie: {
						create: {
							name: 'Exóticos'
						}
					}
				}
			},
			Appointments: {
				create: {
					date: new Date(),
					startsAt: new Date('2023-07-03T10:00:00'),
					duration: 60,
					price: 89.90,
					clientId: 1,
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae metus arcu. Cras sit amet risus id nulla eleifend sagittis at ac justo. Vivamus orci diam, maximus sed dolor quis, porttitor cursus neque. Duis quis mauris eget justo imperdiet pellentesque faucibus sit amet nibh. Vestibulum dolor nisi, bibendum eget semper eleifend, pretium efficitur urna. Nulla gravida nulla id dui accumsan, ac luctus nulla pretium. Fusce vel elit at orci faucibus euismod. Vivamus maximus ut sem in posuere. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent porta rhoncus dui, sit amet fermentum nisi hendrerit ut. Curabitur sodales iaculis arcu quis aliquet.',
					petId: 1,
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
