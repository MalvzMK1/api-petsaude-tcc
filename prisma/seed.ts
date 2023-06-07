import { PrismaClient } from '@prisma/client';
import bcrypt from '../src/lib/bcrypt';

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
			profilePhoto:
				'https://pbs.twimg.com/profile_images/1216142489112870914/bRgFG5zJ_400x400.jpg',
			profileBannerPhoto:
				'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?cs=srgb&dl=pexels-pixabay-36717.jpg&fm=jpg',
			Address: {
				create: {
					cep: '76814-054',
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
							name: 'Cachorro',
						},
					},
				},
			},
		},
	});

	await prisma.client.create({
		data: {
			personName: 'John Doe',
			userName: 'johhnyDoe',
			cpf: '368.063.750-06',
			rg: '28.860.489-1',
			email: 'johndoe@gmail.com',
			password: await bcrypt.hash('password123', 10),
			phoneNumber: '',
			cellphoneNumber: '11994600546',
			profilePhoto:
				'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=934&q=80',
			profileBannerPhoto: 'https://wallpapercave.com/wp/wp3123600.jpg',
			Address: {
				create: {
					cep: '51150-650',
					number: '905',
				},
			},
			Pet: {
				create: {
					name: 'Bob',
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

	await prisma.client.create({
		data: {
			personName: 'Maisha Fernandez',
			userName: 'maisha_fer',
			cpf: '333.298.120-01',
			rg: '33.410.892-5',
			email: 'maisha@gmail.com',
			password: await bcrypt.hash('maisha', 10),
			phoneNumber: '',
			cellphoneNumber: '13984567321',
			profilePhoto:
				'https://plus.unsplash.com/premium_photo-1664442593274-38caa77af985?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
			profileBannerPhoto:
				'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
			Address: {
				create: {
					cep: '68506-610',
					number: '905',
				},
			},
			Pet: {
				create: {
					name: 'Rex',
					birthDate: new Date(),
					photo:
						'https://images.unsplash.com/photo-1620001796685-adf7110fe1a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
					microship: false,
					petSize: 'BIG',
					petGender: 'M',
					petSpecieId: 1,
				},
			},
		},
	});

	/** VETERINÁRIOS **/

	const veterinary = await prisma.veterinary.create({
		data: {
			personName: 'Will Ramos',
			userName: 'will123',
			cpf: '961.980.830-47',
			rg: '11.943.060-5',
			email: 'will.ramos@gmail.com',
			password: await bcrypt.hash('senhawill', 10),
			phoneNumber: '',
			cellphoneNumber: '11999999999',
			profilePhoto:
				'https://cms.kerrang.com/images/Lorna-Shore-Will-Ramos-Kerrang-cover-story-2022-header-credit-Nick-Karp.png',
			profileBannerPhoto:
				'https://t4.ftcdn.net/jpg/05/21/18/03/360_F_521180377_2iAVJqBQSo3cgKaVp8vMBR8asrC61DoU.jpg',
			Address: {
				create: {
					cep: '69905-112',
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
							name: 'Gato',
						},
					},
				},
			},
			Appointments: {
				create: {
					date: new Date(),
					startsAt: new Date('2023-07-03T10:00:00'),
					duration: 30,
					clientId: 2,
					price: 99.5,
					description: 'lorem ipsum',
					petId: 2,
				},
			},
		},
	});

	await prisma.veterinary.create({
		data: {
			personName: 'Ricardo Ohara',
			userName: 'ric_ohara',
			cpf: '321.123.654-78',
			rg: '23.123.123-12',
			email: 'ohara@gmail.com',
			password: await bcrypt.hash('password123', 10),
			phoneNumber: '',
			cellphoneNumber: '12995513265',
			profilePhoto:
				'https://www.shopveterinario.com.br/blog/wp-content/uploads/2021/03/medico-veterinario-bem-sucedido-artigo.jpg',
			profileBannerPhoto:
				'https://i0.wp.com/abglt.org.br/wp-content/uploads/2020/10/wallpaper-pc1-scaled-1.jpg?fit=2560%2C1440&ssl=1',
			Address: {
				create: {
					cep: '71996-240',
					number: '654',
				},
			},
			crmv: '3287',
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
							name: 'Exóticos',
						},
					},
				},
			},
		},
	});

	await prisma.veterinary.create({
		data: {
			personName: 'Angus Buck',
			userName: 'angus_buck',
			cpf: '347.585.870-35',
			rg: '12.259.012-0',
			email: 'buck@gmail.com',
			password: await bcrypt.hash('password123', 10),
			phoneNumber: '',
			cellphoneNumber: '12995513265',
			profilePhoto:
				'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1085&q=80',
			profileBannerPhoto:
				'https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/613f65bbaf30031d31df3077/1631544779120/California+Streaming+6K+No+Logo.png',
			Address: {
				create: {
					cep: '63504-325',
					number: '321',
				},
			},
			crmv: '1937',
			formation: 'Veterinary',
			institution: 'USP',
			formationDate: new Date('2017-02-03'),
			startActingDate: new Date('2017-04-03'),
			occupationArea: 'Zoológico',
			VeterinaryEspecialities: {
				connect: {
					id: 1,
				},
			},
			PetSpecieVeterinary: {
				connect: {
					id: 1,
				},
			},
		},
	});

	await prisma.veterinary.create({
		data: {
			personName: 'Judy Harrison',
			userName: 'judy_har',
			cpf: '230.696.200-60',
			rg: '49.492.797-5',
			email: 'judy@gmail.com',
			password: await bcrypt.hash('password123', 10),
			phoneNumber: '',
			cellphoneNumber: '12995513265',
			profilePhoto:
				'https://yt3.googleusercontent.com/_EMbFejwX_g7MXYP0wIaruoQAVB-4RshNhvXp08xkA7pasRtJe51O6woRznAQ4Wx4EYThNmuMiE=s900-c-k-c0x00ffffff-no-rj',
			profileBannerPhoto:
				'https://i0.wp.com/abglt.org.br/wp-content/uploads/2020/10/wallpaper-pc1-scaled-1.jpg?fit=2560%2C1440&ssl=1',
			Address: {
				create: {
					cep: '04301-905',
					number: '4241',
				},
			},
			crmv: '9173',
			formation: 'Veterinary',
			institution: 'USP',
			formationDate: new Date('2017-02-03'),
			startActingDate: new Date('2017-04-03'),
			occupationArea: 'Zoológico',
			VeterinaryEspecialities: {
				connect: {
					id: 1,
				},
			},
			PetSpecieVeterinary: {
				connect: {
					id: 1,
				},
			},
		},
	});

	await prisma.veterinary.create({
		data: {
			personName: 'Markus Sykes',
			userName: 'markus_sykes',
			cpf: '077.201.110-95',
			rg: '33.021.845-1',
			email: 'markus@gmail.com',
			password: await bcrypt.hash('password123', 10),
			phoneNumber: '',
			cellphoneNumber: '12995513265',
			profilePhoto:
				'https://yt3.googleusercontent.com/_EMbFejwX_g7MXYP0wIaruoQAVB-4RshNhvXp08xkA7pasRtJe51O6woRznAQ4Wx4EYThNmuMiE=s900-c-k-c0x00ffffff-no-rj',
			profileBannerPhoto:
				'https://i0.wp.com/abglt.org.br/wp-content/uploads/2020/10/wallpaper-pc1-scaled-1.jpg?fit=2560%2C1440&ssl=1',
			Address: {
				create: {
					cep: '04301-905',
					number: '4241',
				},
			},
			crmv: '6482',
			formation: 'Veterinary',
			institution: 'USP',
			formationDate: new Date('2017-02-03'),
			startActingDate: new Date('2017-04-03'),
			occupationArea: 'Zoológico',
			VeterinaryEspecialities: {
				connect: {
					id: 1,
				},
			},
			PetSpecieVeterinary: {
				connect: {
					id: 1,
				},
			},
		},
	});

	await prisma.veterinary.create({
		data: {
			personName: 'Rayhan Vargas',
			userName: 'ray_varg',
			cpf: '685.830.860-10',
			rg: '23.634.715-9',
			email: 'ray@gmail.com',
			password: await bcrypt.hash('password123', 10),
			phoneNumber: '',
			cellphoneNumber: '12995513265',
			profilePhoto:
				'https://yt3.googleusercontent.com/_EMbFejwX_g7MXYP0wIaruoQAVB-4RshNhvXp08xkA7pasRtJe51O6woRznAQ4Wx4EYThNmuMiE=s900-c-k-c0x00ffffff-no-rj',
			profileBannerPhoto:
				'https://i0.wp.com/abglt.org.br/wp-content/uploads/2020/10/wallpaper-pc1-scaled-1.jpg?fit=2560%2C1440&ssl=1',
			Address: {
				create: {
					cep: '04301-905',
					number: '4241',
				},
			},
			crmv: '5283',
			formation: 'Veterinary',
			institution: 'USP',
			formationDate: new Date('2017-02-03'),
			startActingDate: new Date('2017-04-03'),
			occupationArea: 'Zoológico',
			VeterinaryEspecialities: {
				connect: {
					id: 1,
				},
			},
			PetSpecieVeterinary: {
				connect: {
					id: 1,
				},
			},
		},
	});

	await prisma.veterinary.create({
		data: {
			personName: 'Maria Nolan',
			userName: 'nolan_vet',
			cpf: '868.357.030-40',
			rg: '34.680.590-9',
			email: 'nolan@gmail.com',
			password: await bcrypt.hash('password123', 10),
			phoneNumber: '',
			cellphoneNumber: '12995513265',
			profilePhoto:
				'https://yt3.googleusercontent.com/_EMbFejwX_g7MXYP0wIaruoQAVB-4RshNhvXp08xkA7pasRtJe51O6woRznAQ4Wx4EYThNmuMiE=s900-c-k-c0x00ffffff-no-rj',
			profileBannerPhoto:
				'https://i0.wp.com/abglt.org.br/wp-content/uploads/2020/10/wallpaper-pc1-scaled-1.jpg?fit=2560%2C1440&ssl=1',
			Address: {
				create: {
					cep: '04301-905',
					number: '4241',
				},
			},
			crmv: '4128',
			formation: 'Veterinary',
			institution: 'USP',
			formationDate: new Date('2017-02-03'),
			startActingDate: new Date('2017-04-03'),
			occupationArea: 'Zoológico',
			VeterinaryEspecialities: {
				connect: {
					id: 1,
				},
			},
			PetSpecieVeterinary: {
				connect: {
					id: 1,
				},
			},
		},
	});

	console.log({
		client,
		veterinary,
	});
}

main().catch(async (err: Error) => {
	console.log(err);
});
