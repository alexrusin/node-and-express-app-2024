import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const userIds = [
  "216c1653-7b13-49bd-9499-53007ead0126",
  "0cdbed84-0b12-4b89-91ae-5572e8e1258e",
  "4dd4510b-2b01-438d-be7a-0064460230a1",
];

async function main() {
  for (const userId of userIds) {
    const createdProject = await prisma.project.create({
      data: {
        user_id: userId,
        name: capitalize(faker.word.noun()),
      },
    });

    for (let i = 1; i <= 2; i++) {
      await prisma.task.create({
        data: {
          user_id: userId,
          project_id: i % 2 === 0 ? createdProject.id : null,
          name: `${capitalize(faker.word.verb())} ${faker.word.noun()}`,
          description: faker.lorem.sentence(),
          due_date: faker.date.future(),
        },
      });
    }
  }
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
