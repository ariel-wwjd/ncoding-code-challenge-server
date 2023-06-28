import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.create({
    data: {
      name: 'software',
    },
  });
  await prisma.category.create({
    data: {
      name: 'design',
    },
  });
  await prisma.course.create({
    data: {
      name: 'Java Advanced',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  });
  await prisma.course.create({
    data: {
      name: 'Python',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  });
  await prisma.course.create({
    data: {
      name: 'UX/UI',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  });
  await prisma.course_category.create({
    data: {
      course_id: 1,
      category_id: 1,
    },
  });
  await prisma.course_category.create({
    data: {
      course_id: 2,
      category_id: 1,
    },
  });
  await prisma.course_category.create({
    data: {
      course_id: 2,
      category_id: 2,
    },
  });
  await prisma.course_category.create({
    data: {
      course_id: 3,
      category_id: 2,
    },
  });
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
