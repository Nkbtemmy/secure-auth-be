import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const roles = ['user', 'admin', 'manager'];

  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Roles seeded');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
