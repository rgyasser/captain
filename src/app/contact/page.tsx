"use client";
import React, { useState } from 'react';
import { User, Mail, MessageSquare, Send, MapPin, Phone, Menu, X, Car, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Remplacez ces valeurs par vos identifiants EmailJS
      const serviceId = 'YOUR_SERVICE_ID';
      const templateId = 'YOUR_TEMPLATE_ID';
      const publicKey = 'YOUR_PUBLIC_KEY';

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone_number: formData.phone,
          message: formData.message
        },
        publicKey
      );

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' }); // Réinitialiser le formulaire
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      alert("Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow w-full bg-cover bg-center bg-fixed text-gray-900 pt-24"
          style={{ backgroundImage: "url('images/image2.jpg')" }}>
          <div className="min-h-full w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center bg-white border border-gray-200 p-10 rounded-2xl shadow-lg max-w-md w-full"
            >
              <CheckCircle className="text-green-500 w-24 h-24 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-center mb-4">Message envoyé !</h2>
              <p className="text-gray-600 text-lg mb-6">
                Merci {formData.name || ''}, nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
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
        style={{ backgroundImage: "url('images/image2.jpg')" }}
      >
        <div className="min-h-full w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Partie Gauche : Infos et Carte */}
            <div className="flex flex-col justify-between p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-3 tracking-wide text-gray-800">
                  Contactez-nous
                </h2>
                <p className="text-gray-600 mb-10 text-lg">
                  Prêt à prendre la route ? Remplissez le formulaire ou utilisez
                  nos coordonnées.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <MapPin className="text-blue-600 text-2xl flex-shrink-0" />
                    <span className="text-lg text-gray-700 group-hover:text-blue-600 transition-colors">
                      RPN nº 1, Mag 6, Complexe Commercial Aïn Al Hayat, Skhirat 12050
                    </span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <Mail className="text-blue-600 text-2xl flex-shrink-0" />
                    <a
                      href="mailto:contact@autoprestige.com"
                      className="text-lg text-gray-700 group-hover:text-blue-600 transition-colors"
                    >
                      Contact@cais.ma
                    </a>
                  </div>
                </div>

                <a
                  href="tel:+33123456789"
                  className="mt-10 w-full flex items-center justify-center gap-3 p-4 bg-green-600 rounded-lg font-bold text-lg text-white hover:bg-green-700 active:scale-95 transform transition-all duration-300 ease-in-out shadow-lg shadow-green-500/20"
                >
                  <Phone />
                  <span>Appeler maintenant (+2126 61 38 78 15)</span>
                </a>
              </div>

              <div className="mt-8 h-64 w-full rounded-lg overflow-hidden border border-gray-300 relative">
                <iframe
                  src="https://www.google.com/maps?q=RPN+nº+1,+Mag+6,+Complexe+Commercial+Aïn+Al+Hayat,+Skhirat+12050&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="group-hover:opacity-90 transition-opacity duration-300"
                />
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
                className={`w-full flex items-center justify-center gap-3 p-4 bg-blue-600 rounded-lg font-bold text-lg text-white hover:bg-blue-700 active:scale-95 transform transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
              >
                {isLoading ? (
                  'Envoi en cours...'
                ) : (
                  <>
                    <Send className="group-hover:translate-x-1 transition-transform duration-300" />
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
