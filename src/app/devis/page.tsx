'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Image from 'next/image'; // ZEDNA IMPORT DYAL IMAGE
import { motion } from 'framer-motion';
import {
  // 7YEDNA 'Car' men hna
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  Zap,
  GaugeCircle,
  Gem,
} from 'lucide-react';

export default function DevisPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Données du devis :', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow flex items-center justify-center text-gray-900 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center bg-white border border-gray-200 p-10 rounded-2xl shadow-lg"
          >
            <CheckCircle className="text-green-500 w-24 h-24 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-center mb-4">Demande envoyée !</h2>
            <p className="text-gray-600 text-lg">
              Merci, {formData.name || 'pour votre intérêt'}.<br />
              Nous avons bien reçu votre demande et nous vous contacterons très prochainement.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Faire une autre demande
            </button>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow w-full pt-24">
        <div className="min-h-full w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Partie Gauche : Infos Véhicule */}
            <div className="p-8 flex flex-col justify-center">
              {/* CORRECTION: Bddelna <img> b <Image> w ghelfناه b motion.div */}
              <motion.div
                className="rounded-lg mb-6 shadow-md overflow-hidden"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Image
                  src="/images/img1.png"
                  alt="Voiture de sport"
                  width={500}
                  height={350}
                  className="w-full h-auto"
                />
              </motion.div>
              <p className="text-gray-600 mb-6">
                {/* CORRECTION: Bddelna ' b &apos; */}
                Vivez l&apos;exception. Remplissez le formulaire pour obtenir une offre personnalisée
                et faire le premier pas vers votre rêve.
              </p>
            </div>

            {/* Partie Droite : Formulaire */}
            <form onSubmit={handleSubmit} className="p-8 bg-gray-50 space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">Vos informations</h3>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nom complet"
                  required
                  onChange={handleChange}
                  className="w-full pl-12 p-4 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Adresse e-mail"
                  required
                  onChange={handleChange}
                  className="w-full pl-12 p-4 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Numéro de téléphone"
                  onChange={handleChange}
                  className="w-full pl-12 p-4 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-6 text-gray-400" />
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Un message ou des précisions ?"
                  onChange={handleChange}
                  className="w-full pl-12 p-4 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full p-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 active:scale-95 transform transition-all duration-300 ease-in-out shadow-md"
              >
                Envoyer ma demande
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}