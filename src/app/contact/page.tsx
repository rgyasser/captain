'use client';

import React, { useState, useRef } from 'react';
import { User, Mail, MessageSquare, Send, MapPin, Phone, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Header from '@/components/Header';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  // To keep the name for the thank you message after clearing the form
  const submittedName = useRef('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    submittedName.current = formData.name; // Store name before clearing

    try {
      // Replace these values with your EmailJS information
      const serviceID = 'YOUR_SERVICE_ID';
      const templateID = 'YOUR_TEMPLATE_ID';
      const publicKey = 'YOUR_PUBLIC_KEY';

      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        publicKey
      );

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      // In a real app, you'd use a more elegant notification system
      alert('Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main
          className="flex-grow w-full bg-cover bg-center bg-fixed text-gray-900 pt-24"
          style={{ backgroundImage: "url('https://placehold.co/1920x1080/e2e8f0/e2e8f0?text=.')" }}
        >
          <div className="min-h-full w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center bg-white border border-gray-200 p-10 rounded-2xl shadow-lg max-w-2xl w-full"
            >
              <CheckCircle className="text-green-500 w-24 h-24 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-center mb-4">Message envoyé !</h2>
              <p className="text-gray-600 text-lg mb-8">
                Merci {submittedName.current || 'pour votre message'}.<br />
                Nous avons bien reçu votre demande et nous vous contacterons très prochainement.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Envoyer un autre message
              </button>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main
        className="flex-grow w-full bg-cover bg-center bg-fixed text-gray-900 pt-24"
        style={{ backgroundImage: "url('https://placehold.co/1920x1080/e2e8f0/e2e8f0?text=.')" }}
      >
        <div className="min-h-full w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Partie Gauche : Infos et Carte */}
            <div className="flex flex-col justify-between p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-3 tracking-wide text-gray-800">
                  Contactez-nous
                </h2>
                <p className="text-gray-600 mb-10 text-lg">
                  Prêt à prendre la route ? Remplissez le formulaire ou utilisez nos coordonnées.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <MapPin className="text-blue-600 text-2xl flex-shrink-0" />
                    <span className="text-lg text-gray-700 group-hover:text-blue-600 transition-colors">
                      RPN nº 1, Mag 6, Complexe Commercial Aïn Al Hayat, Skhirat 12050{' '}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <Mail className="text-blue-600 text-2xl flex-shrink-0" />
                    <a
                      href="mailto:Contact@cais.ma"
                      className="text-lg text-gray-700 group-hover:text-blue-600 transition-colors"
                    >
                      Contact@cais.ma
                    </a>
                  </div>
                </div>

                <a
                  href="tel:+212661387815"
                  className="mt-10 w-full flex items-center justify-center gap-3 p-4 bg-green-600 rounded-lg font-bold text-lg text-white hover:bg-green-700 active:scale-95 transform transition-all duration-300 ease-in-out shadow-lg shadow-green-500/20"
                >
                  <Phone />
                  <span>Appeler maintenant (+212 661 387 815)</span>
                </a>
              </div>

              {/* MODIFIED MAP SECTION */}
              <div className="mt-8 h-64 w-full rounded-2xl overflow-hidden relative border border-gray-200 group">
                {/* Background blurred map iframe */}
                <iframe
                  src="https://www.google.com/maps?q=Comptoir+Agricole+et+Industriel+de+Skhirat%2C%20RPN%20N%C2%BA%201%2C%20Mag%206%2C%20Complexe%20Commercial%20A%C3%AFn%20Al%20Hayat%2C%20Skhirat%2012050&hl=fr&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full blur-sm scale-110 transition-all duration-500 group-hover:blur-none"
                />
                {/* Overlay with button */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all duration-500 group-hover:bg-black/10">
                  <a
                    href="https://www.google.com/maps/place/Comptoir+Agricole+et+Industriel+de+Skhirat/@33.8548876,-7.042571,4141m/data=!3m1!1e3!4m10!1m2!2m1!1sComptoir+Agricole+et+Industriel+de+Skhirat,+RPN+N%C2%BA+1,+Mag+6,+Complexe+Commercial+A%C3%AFn+Al+Hayat,+Skhirat+12050!3m6!1s0xda7095e9ec123e3:0x4bca8ab27c796abf!8m2!3d33.8588275!4d-7.0245422!15sCm5Db21wdG9pciBBZ3JpY29sZSBldCBJbmR1c3RyaWVsIGRlIFNraGlyYXQsIFJQTiBOwrogMSwgTWFnIDYsIENvbXBsZXhlIENvbW1lcmNpYWwgQcOvbiBBbCBIYXlhdCwgU2toaXJhdCAxMjA1MFpsImpjb21wdG9pciBhZ3JpY29sZSBldCBpbmR1c3RyaWVsIGRlIHNraGlyYXQgcnBuIG7CuiAxIG1hZyA2IGNvbXBsZXhlIGNvbW1lcmNpYWwgYcOvbiBhbCBoYXlhdCBza2hpcmF0IDEyMDUwkgEXZmFybV9lcXVpcG1lbnRfc3VwcGxpZXKaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVTlVkMWxQWVRsUlJSQUKqAYICEAEqbiJqY29tcHRvaXIgYWdyaWNvbGUgZXQgaW5kdXN0cmllbCBkZSBza2hpcmF0IHJwbiBuwrogMSBtYWcgNiBjb21wbGV4ZSBjb21tZXJjaWFsIGHDr24gYWwgaGF5YXQgc2toaXJhdCAxMjA1MCgEMh4QASIaseVe9KPXT_5s0bHuI3EL36kOyNuDfH6kSv0ybhACImpjb21wdG9pciBhZ3JpY29sZSBldCBpbmR1c3RyaWVsIGRlIHNraGlyYXQgcnBuIG7CuiAxIG1hZyA2IGNvbXBsZXhlIGNvbW1lcmNpYWwgYcOvbiBhbCBoYXlhdCBza2hpcmF0IDEyMDUw4AEA-gEECAAQIg!16s%2Fg%2F11b6j7_vcz?entry=ttu&g_ep=EgoyMDI1MDgxOC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-white rounded-lg font-bold text-lg text-gray-800 hover:bg-gray-100 active:scale-95 transform transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
                  >
                    <MapPin className="text-blue-600" />
                    <span>Accéder à la carte</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Partie Droite : Formulaire */}
            <form onSubmit={handleSubmit} className="p-8 bg-white rounded-2xl shadow-xl border border-gray-200 space-y-6">
              <h3 className="text-3xl font-semibold mb-4 text-gray-800">Envoyez-nous un message</h3>

              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom complet"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 placeholder-gray-400"
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
                <input
                  type="email"
                  name="email"
                  placeholder="Votre adresse e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 placeholder-gray-400"
                />
              </div>

              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Votre numéro de téléphone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{8,15}"
                  inputMode="numeric"
                  className="w-full pl-12 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 placeholder-gray-400"
                />
              </div>

              <div className="relative group">
                <MessageSquare className="absolute left-4 top-6 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Votre message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 resize-none placeholder-gray-400"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-3 p-4 bg-blue-600 rounded-lg font-bold text-lg text-white hover:bg-blue-700 active:scale-95 transform transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {isLoading ? (
                  'Envoi en cours...'
                ) : (
                  <>
                    <Send />
                    <span>Envoyer le message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}