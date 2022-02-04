import { PrismaClient, Prisma } from "@prisma/client";

import { hashPassword } from "../helpers/auth";

const prisma = new PrismaClient();

const handleSeeding = async () => {
  const eventTypeData: Prisma.EventTypeCreateInput[] = [
    {
      name: "Secret Meeting",
      duration: 15,
      user: {
        create: {
          name: "Emmanuel Dushime",
          email: "dushimeemma2@gmail.com",
          password: await hashPassword("Dushime@2020^1"),
        },
      },
    },
  ];
  return eventTypeData;
};

const main = async () => {
  const eventTypeData = await handleSeeding();
  console.log(`Start seeding ...`);
  for (const eventType of eventTypeData) {
    const newEventType = await prisma.eventType.create({
      data: eventType,
    });
    console.log(`Created event type with id: ${newEventType.id}`);
  }
  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
