'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Award, BookOpen, ArrowRight, Star, User } from 'lucide-react'; // ✅ осында User иконкасы қосылды
import Link from 'next/link';
import { auth } from '@/lib/firebase_auth';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // ✅ тек керек заттар қалды

export default function Home() {
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const courses = [
    {
      id: 1,
      title: 'Motion Design',
      description: 'Динамикалық анимациялар мен визуалды эффектер жасауды үйреніңіз',
      duration: '8 апта',
      students: 1247,
      rating: 4.8,
      image: '/motion-design.jpg',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      title: 'Graphic Design',
      description: 'Креативті дизайн және брендинг принциптерін меңгеріңіз',
      duration: '10 апта',
      students: 2156,
      rating: 4.9,
      image: '/graphic-design.jpg',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'Пайдаланушы тәжірибесін жақсартатын интерфейстер жасаңыз',
      duration: '12 апта',
      students: 1893,
      rating: 4.7,
      image: '/uiux-design.jpg',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 4,
      title: '3D Modeling',
      description: '3D объектілер мен анимациялар жасауды үйреніңіз',
      duration: '14 апта',
      students: 987,
      rating: 4.6,
      image: '/3d-modeling.jpg',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">KhanMedia Education</h1>
            </div>
            <div className="flex items-center space-x-4">
              {!user ? (
                <>
                  <Link
                    href="/auth/login"
                    className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Кіру
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Тіркелу
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/profile"
                    className="flex items-center bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
                  >
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Профиль
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:underline"
                  >
                    Шығу
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Болашақтың{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              креативті мамандарын
            </span>{' '}
            дайындаймыз
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Motion Design, Graphic Design және басқа да креативті салалардағы кәсіби курстар.
            Тегін бастапқы сабақтарды көру үшін тіркеліңіз.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/courses"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Play className="mr-2 h-5 w-5" />
              Тегін сабақтарды көру
            </Link>
            <Link
              href="/courses"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              Курстар туралы
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">6,000+</h3>
              <p className="text-gray-600">Түлектер</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <Award className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Курстар</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <Star className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8</h3>
              <p className="text-gray-600">Орташа баға</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Популярлық курстар</h2>
            <p className="text-xl text-gray-600">Тегін бастапқы сабақтарды көру үшін тіркеліңіз</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredCourse(course.id)}
                onHoverEnd={() => setHoveredCourse(null)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`h-48 bg-gradient-to-br ${course.color} relative`}>
                  <div className="absolute inset-0 bg-black bg-opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-16 w-16 text-white opacity-80" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">{course.duration}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{course.students} студент</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                      Көру
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Бүгін бастаңыз
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-blue-100 mb-8"
          >
            Тегін тіркеліп, бастапқы сабақтарды көріңіз
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/auth/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Тегін тіркелу
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <h3 className="ml-3 text-xl font-bold">KhanMedia Education</h3>
              </div>
              <p className="text-gray-400">
                Креативті салалардағы кәсіби білім беру платформасы
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Курстар</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Motion Design</li>
                <li>Graphic Design</li>
                <li>UI/UX Design</li>
                <li>3D Modeling</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Біз туралы</li>
                <li>Мұғалімдер</li>
                <li>Кері байланыс</li>
                <li>Жұмыс орындары</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Қолдау</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Көмек орталығы</li>
                <li>Жиі қойылатын сұрақтар</li>
                <li>Техникалық қолдау</li>
                <li>Байланыс</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KhanMedia Education. Барлық құқықтар қорғалған.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
