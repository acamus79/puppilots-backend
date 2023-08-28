import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const strongPassword = await bcrypt.hash('Password@123', 10);
  const prueba = await prisma.user.upsert({
    where: { email: 'prueba@gmail.com' },
    update: {},
    create: {
      email: 'prueba@gmail.com',
      password: strongPassword,
      role: 'CUSTOMER',
      emailConfirmed: true,
    },
  });
  console.log({ prueba });

  //Razas de Perros
  const breeds = await prisma.breed.createMany({
    data: [
      {
        name: 'Akita Americano',
      },
      {
        name: 'Akita Inu',
      },
      {
        name: 'Basset Hound',
      },
      {
        name: 'Beagle',
      },
      {
        name: 'Bichón Frisé',
      },
      {
        name: 'Bichón Maltés',
      },
      {
        name: 'Border Collie',
      },
      {
        name: 'Boxer',
      },
      {
        name: 'Bóxer',
      },
      {
        name: 'Bull Terrier',
      },
      {
        name: 'Bulldog',
      },
      {
        name: 'Bulldog Americano',
      },
      {
        name: 'Bulldog Francés',
      },
      {
        name: 'Bulldog Inglés',
      },
      {
        name: 'Bullmastiff',
      },
      {
        name: 'Cane Corso',
      },
      {
        name: 'Caniche',
      },
      {
        name: 'Caniche Mini Toy',
      },
      {
        name: 'Carlino',
      },
      {
        name: 'Cavalier King Charles Spaniel',
      },
      {
        name: 'Chihuahua',
      },
      {
        name: 'Chow Chow',
      },
      {
        name: 'Cocker Spaniel',
      },
      {
        name: 'Cocker Spaniel Inglés',
      },
      {
        name: 'Collie',
      },
      {
        name: 'Dachshund (salchicha)',
      },
      {
        name: 'Dálmata',
      },
      {
        name: 'Dóberman',
      },
      {
        name: 'Doberman Pinscher',
      },
      {
        name: 'Dogo Alemán',
      },
      {
        name: 'Dogo Argentino',
      },
      {
        name: 'Dogo de Burdeos',
      },
      {
        name: 'Fox Terrier',
      },
      {
        name: 'Golden Retriever',
      },
      {
        name: 'Gran Danés',
      },
      {
        name: 'Husky',
      },
      {
        name: 'Husky Siberiano',
      },
      {
        name: 'Labrador',
      },
      {
        name: 'Labrador Retriever',
      },
      {
        name: 'Mastín',
      },
      {
        name: 'Mestizo',
      },
      {
        name: 'Pastor Alemán',
      },
      {
        name: 'Pinscher Miniatura',
      },
      {
        name: 'Pitbull',
      },
      {
        name: 'Pomerania',
      },
      {
        name: 'Poodle',
      },
      {
        name: 'Pug',
      },
      {
        name: 'Pug Carlino',
      },
      {
        name: 'Rottweiler',
      },
      {
        name: 'Samoyedo',
      },
      {
        name: 'San Bernardo',
      },
      {
        name: 'Schnauzer',
      },
      {
        name: 'Setter Gordon',
      },
      {
        name: 'Setter Inglés',
      },
      {
        name: 'Setter Irlandés',
      },
      {
        name: 'Shar Pei',
      },
      {
        name: 'Shiba Inu',
      },
      {
        name: 'Shih Tzu',
      },
      {
        name: 'Siberian Husky',
      },
      {
        name: 'Teckel',
      },
      {
        name: 'Terrier de Norfolk',
      },
      {
        name: 'Terrier Escocés',
      },
      {
        name: 'Terrier Tibetano',
      },
      {
        name: 'Whippet',
      },
      {
        name: 'Yorkshire Terrier',
      },
    ],
  });
  console.log({ breeds });

  //Paises
  const countries = await prisma.country.createMany({
    data: [
      {
        name: 'Argentina',
      },
      {
        name: 'Chile',
      },
      {
        name: 'Peru',
      },
      {
        name: 'Venezuela',
      },
      {
        name: 'Colombia',
      }
    ],
  });
  console.log({ countries });

  //Provincias
  const cities = await prisma.city.createMany({
    data: [
      //Argentina
      { name: 'Buenos Aires', countryId: 1 },
      { name: 'Cordoba', countryId: 1 },
      { name: 'Corrientes', countryId: 1 },
      { name: 'Formosa', countryId: 1 },
      { name: 'La Plata', countryId: 1 },
      { name: 'La Rioja', countryId: 1 },
      { name: 'Mendoza', countryId: 1 },
      { name: 'Neuquén', countryId: 1 },
      { name: 'Paraná', countryId: 1 },
      { name: 'Posadas', countryId: 1 },
      { name: 'Rawson', countryId: 1 },
      { name: 'Rio Gallegos', countryId: 1 },
      { name: 'Salta', countryId: 1 },
      { name: 'San Fernando del Valle de Catamarca', countryId: 1 },
      { name: 'San Juan', countryId: 1 },
      { name: 'San Luis', countryId: 1 },
      { name: 'San Miguel de Tucumán', countryId: 1 },
      { name: 'San Salvador de Jujuy', countryId: 1 },
      { name: 'Santa Fe', countryId: 1 },
      { name: 'Santa Rosa', countryId: 1 },
      { name: 'Santiago del Estero', countryId: 1 },
      { name: 'Ushuaia', countryId: 1 },
      { name: 'Viedma', countryId: 1 },
      //Chile
      { name: 'Antofagasta', countryId: 2 },
      { name: 'Arica', countryId: 2 },
      { name: 'Concepción', countryId: 2 },
      { name: 'Copiapó', countryId: 2 },
      { name: 'Coyhaique', countryId: 2 },
      { name: 'Iquique', countryId: 2 },
      { name: 'La Serena', countryId: 2 },
      { name: 'Puerto Montt', countryId: 2 },
      { name: 'Punta Arenas', countryId: 2 },
      { name: 'Rancagua', countryId: 2 },
      { name: 'Santiago', countryId: 2 },
      { name: 'Talca', countryId: 2 },
      { name: 'Temuco', countryId: 2 },
      { name: 'Valdivia', countryId: 2 },
      { name: 'Valparaíso', countryId: 2 },
      //Peru
      { name: 'Abancay', countryId: 3 },
      { name: 'Arequipa', countryId: 3 },
      { name: 'Ayacucho', countryId: 3 },
      { name: 'Cajamarca', countryId: 3 },
      { name: 'Callao', countryId: 3 },
      { name: 'Cerro de Pasco', countryId: 3 },
      { name: 'Chachapoyas', countryId: 3 },
      { name: 'Chiclayo', countryId: 3 },
      { name: 'Cuzco', countryId: 3 },
      { name: 'Huacho', countryId: 3 },
      { name: 'Huancavelica', countryId: 3 },
      { name: 'Huancayo', countryId: 3 },
      { name: 'Huanuco', countryId: 3 },
      { name: 'Huaraz', countryId: 3 },
      { name: 'Ica', countryId: 3 },
      { name: 'Iquitos', countryId: 3 },
      { name: 'Lima', countryId: 3 },
      { name: 'Moquegua', countryId: 3 },
      { name: 'Moyobamba', countryId: 3 },
      { name: 'Piura', countryId: 3 },
      { name: 'Pucallpa', countryId: 3 },
      { name: 'Puerto Maldonado', countryId: 3 },
      { name: 'Puno', countryId: 3 },
      { name: 'Tacna', countryId: 3 },
      { name: 'Trujillo', countryId: 3 },
      { name: 'Tumbes', countryId: 3 },
      //Venezuela
      { name: 'Barcelona', countryId: 4 },
      { name: 'Barinas', countryId: 4 },
      { name: 'Barquisimeto', countryId: 4 },
      { name: 'Caracas', countryId: 4 },
      { name: 'Ciudad Bolívar', countryId: 4 },
      { name: 'Coro', countryId: 4 },
      { name: 'Cumaná', countryId: 4 },
      { name: 'Gran Roque', countryId: 4 },
      { name: 'Guanare', countryId: 4 },
      { name: 'La Asunción', countryId: 4 },
      { name: 'La Guaira', countryId: 4 },
      { name: 'Los Teques', countryId: 4 },
      { name: 'Maracaibo', countryId: 4 },
      { name: 'Maracay', countryId: 4 },
      { name: 'Maturín', countryId: 4 },
      { name: 'Mérida', countryId: 4 },
      { name: 'Puerto Ayacucho', countryId: 4 },
      { name: 'San Carlos', countryId: 4 },
      { name: 'San Cristóbal', countryId: 4 },
      { name: 'San Felipe', countryId: 4 },
      { name: 'San Fernando de Apure', countryId: 4 },
      { name: 'San Juan de Los Morros', countryId: 4 },
      { name: 'Trujillo', countryId: 4 },
      { name: 'Tucupita', countryId: 4 },
      { name: 'Valencia', countryId: 4 },
      //Colombia
      { name: 'Bogota', countryId: 5 },
      { name: 'Cali', countryId: 5 },
      { name: 'Medellin', countryId: 5 },
      { name: 'Barranquilla', countryId: 5 },
      { name: 'Cartagena', countryId: 5 },
      { name: 'Cucuta', countryId: 5 },
      { name: 'Bucaramanga', countryId: 5 },
      { name: 'Pereira', countryId: 5 },
      { name: 'Santa Marta', countryId: 5 },
      { name: 'Ibagué', countryId: 5 },
      { name: 'Leticia', countryId: 5 },
      { name: 'Manizales', countryId: 5 },
      { name: 'Pasto', countryId: 5 },
      { name: 'Popayán', countryId: 5 },
      { name: 'Quibdó', countryId: 5 },
      { name: 'Riohacha', countryId: 5 },
      { name: 'San Andrés', countryId: 5 },
      { name: 'Sincelejo', countryId: 5 },
      { name: 'Tunja', countryId: 5 },
    ],
  });
  console.log({ cities });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
