"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { motion } from "framer-motion";
import { LogOut, User as UserIcon, Mail } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase_auth";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/"; // шығу → басты бетке
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">Аккаунтқа кірмегенсіз</p>
        <Link href="/auth/login" className="text-blue-600 hover:underline">
          Кіру бетіне өту
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center space-x-6">
            <img
              src={user.photoURL || "https://w7.pngwing.com/pngs/141/425/png-transparent-user-profile-computer-icons-avatar-profile-s-free-angle-rectangle-profile-cliparts-free-thumbnail.png"}

              className="w-24 h-24 rounded-full border"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <UserIcon className="w-5 h-5 mr-2 text-blue-500" />
                {user.displayName || "Аты жоқ"}
              </h2>
              <p className="text-gray-600 flex items-center mt-1">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                {user.email}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Менің курстарым
            </h3>
            <p className="text-gray-600">Қазіргі уақытта курстар тізімі бос</p>
          </div>

          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Шығу
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
