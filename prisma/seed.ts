import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Курстарды қосу
  const courses = [
    {
      title: 'Motion Design Fundamentals',
      description: 'Динамикалық анимациялар мен визуалды эффектер жасаудың негіздерін үйреніңіз',
      category: 'motion',
      duration: '8 апта',
      price: 89000,
      isFree: false,
      instructor: 'Алексей Петров',
      level: 'Бастапқы',
      rating: 4.8,
      students: 1247,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Graphic Design Masterclass',
      description: 'Креативті дизайн және брендинг принциптерін меңгеріңіз',
      category: 'graphic',
      duration: '10 апта',
      price: 0,
      isFree: true,
      instructor: 'Мария Иванова',
      level: 'Орташа',
      rating: 4.9,
      students: 2156,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'UI/UX Design Principles',
      description: 'Пайдаланушы тәжірибесін жақсартатын интерфейстер жасаңыз',
      category: 'uiux',
      duration: '12 апта',
      price: 120000,
      isFree: false,
      instructor: 'Дмитрий Сидоров',
      level: 'Жоғары',
      rating: 4.7,
      students: 1893,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: '3D Modeling Basics',
      description: '3D объектілер мен анимациялар жасаудың негіздерін үйреніңіз',
      category: '3d',
      duration: '14 апта',
      price: 150000,
      isFree: false,
      instructor: 'Елена Козлова',
      level: 'Бастапқы',
      rating: 4.6,
      students: 987,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Video Editing Pro',
      description: 'Кәсіби видео редакциялау техникаларын меңгеріңіз',
      category: 'video',
      duration: '16 апта',
      price: 180000,
      isFree: false,
      instructor: 'Сергей Волков',
      level: 'Жоғары',
      rating: 4.8,
      students: 1456,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Web Design Fundamentals',
      description: 'Заманауи веб-дизайн принциптерін үйреніңіз',
      category: 'web',
      duration: '10 апта',
      price: 0,
      isFree: true,
      instructor: 'Анна Смирнова',
      level: 'Бастапқы',
      rating: 4.9,
      students: 2341,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  for (const course of courses) {
    await prisma.course.create({
      data: course,
    });
  }

  console.log('Бастапқы деректер сәтті қосылды!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
