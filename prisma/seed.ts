import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()
async function main() {
  const strongPassword = await bcrypt.hash('Password@123', 10);
  const prueba = await prisma.user.upsert({
    where: { email: 'prueba@gmail.com' },
    update: {},
    create: {
      email: 'prueba@gmail.com',
      password: strongPassword,
      role: 'CUSTOMER', 
      emailConfirmed: true     
    },
  })
  console.log({ prueba })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })