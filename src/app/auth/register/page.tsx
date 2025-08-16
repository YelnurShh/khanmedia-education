'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, BookOpen, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase_auth';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError("Құпия сөздер сәйкес емес");
      setIsLoading(false);
      return;
    }

    try {
      // Firebase арқылы қолданушы тіркеу
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Қолданушы аты-жөнін қосу
      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      setSuccess('Тіркелу сәтті аяқталды! Енді кіре аласыз.');

      // Форманы тазалау
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      });

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const passwordRequirements = [
    { text: 'Кемінде 8 таңба', met: formData.password.length >= 8 },
    { text: 'Кемінде 1 үлкен әріп', met: /[A-Z]/.test(formData.password) },
    { text: 'Кемінде 1 сан', met: /\d/.test(formData.password) },
    { text: 'Құпия сөздер сәйкес келеді', met: formData.password === formData.confirmPassword && formData.password !== '' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center mb-8">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Басты бетке оралу
            </Link>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <BookOpen className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Тіркелу</h2>
            <p className="mt-2 text-sm text-gray-600">Тегін есептік жазба жасаңыз</p>
          </div>
        </motion.div>

        {/* Error/Success Messages */}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">{success}</div>}

        {/* Form */}
        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* First Name + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Аты</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="text" required value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Атыңыз" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Тегі</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="text" required value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Тегіңіз" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Электрондық пошта</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="email" required value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="example@email.com" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Құпия сөз</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Құпия сөз жасаңыз" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff /> : <Eye />}</button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Құпия сөзді қайталаңыз</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type={showConfirmPassword ? 'text' : 'password'} required value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Құпия сөзді қайталаңыз" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showConfirmPassword ? <EyeOff /> : <Eye />}</button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Құпия сөз талаптары:</h4>
              <ul className="space-y-1">
                {passwordRequirements.map((req, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className={`h-4 w-4 mr-2 ${req.met ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={req.met ? 'text-green-700' : 'text-gray-500'}>{req.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input type="checkbox" required checked={formData.agreeToTerms} onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <label className="ml-2 text-sm text-gray-900">
              Мен <a href="#" className="text-blue-600 hover:underline">пайдалану шарттарын</a> және <a href="#" className="text-blue-600 hover:underline">құпиялылық саясатын</a> қабылдаймын
            </label>
          </div>

          {/* Submit */}
          <button type="submit" disabled={isLoading} className="w-full py-3 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            {isLoading ? 'Тіркелуде...' : 'Тіркелу'}
          </button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Есептік жазбаңыз бар ма?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:underline">Кіріңіз</Link>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
