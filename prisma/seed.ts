import * as bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await seedRoles();
  await configureSuperAdmin();
}

async function seedRoles() {
  const roles = ["SUPER_ADMIN", "ADMIN", "USER"];

  const upserts = roles.map((roleName) =>
    prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    })
  );

  await Promise.all(upserts);
  console.log("Roles seeded successfully");
}

async function configureSuperAdmin() {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = process.env.SUPER_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD must be provided");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  // Get the SUPER_ADMIN role
  const superAdminRole = await prisma.role.findUnique({
    where: { name: "SUPER_ADMIN" },
  });
  if (!superAdminRole) {
    throw new Error("SUPER_ADMIN role not found");
  }

  // Upsert the Super Admin user with the associated roleId
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      roleId: superAdminRole.id,
    },
    create: {
      name: "Super Admin",
      email,
      password: hashedPassword,
      roleId: superAdminRole.id,
    },
    select: {
      id: true,
      roleId: true,
    },
  });

  console.log("Super admin configured successfully", user);
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
