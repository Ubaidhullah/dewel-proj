/* eslint-disable prettier/prettier */
// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();
async function main() {
  // create two dummy articles
  const location1 = await prisma.location.upsert({
    where: { island: 'Guraidhoo' },
    update: {},
    create: {
      island: 'Guraidhoo',
      description:"Located in the North of Maldives, Guraidhoo is a small island with a population of 1,500 people.",
    },
  });

  const location2 = await prisma.location.upsert({
    where: { island: 'Maafushi' },
    update: {},
    create: {
      island: 'Maafushi',
      description: "Located in the North of Maldives, Maafushi is a small island with a population of 1,500 people.",
    },
  });
  
  console.log({ location1, location2 });
}


// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
