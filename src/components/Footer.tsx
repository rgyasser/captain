'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-100 text-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <Image src="/images/lg.png" alt="Logo Captain" width={120} height={40} />
              <Image src="/images/lg2.png" alt="Logo Cais" width={70} height={40} />
            </div>
            <p className="text-gray-600">
              Cais est le concessionnaire de la Marque Great Wall Motors Distribuer par Tractafric Maroc
            </p>
            <div className="space-y-2">
              <p className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" /> +212 (0) 661 387 815
              </p>
              <p className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" /> Contact@cais.ma
              </p>
              <p className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" /> Skhirat, Maroc
              </p>
            </div>
            <div className="flex space-x-4">{/* Add social media links here */}</div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/sav" className="text-gray-600 hover:text-gray-900">
                  Carrosserie et Peinture
                </Link>
              </li>
              <li>
                {/* CORRECTION: Bddelna ' b &apos; */}
                <Link href="/sav" className="text-gray-600 hover:text-gray-900">
                  Pièces d&apos;Origine
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/devis" className="text-gray-600 hover:text-gray-900">
                  Devis
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Lien</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Accueil
                </Link>
              </li>
              <li>
              </li>
              <li>
              </li>
              <li>
                <Link href="/sav" className="text-gray-600 hover:text-gray-900">
                  Service Après-Vente
                </Link>
              </li>
              <li>
                <Link href="/fich" className="text-gray-600 hover:text-gray-900">
                  Fiche technique
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-stone-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between text-gray-600">
          <p>&copy; {new Date().getFullYear()} Poer Maroc. Tous droits réservés.</p>
          <div className="flex space-x-4">
            <h2>Mentions légales</h2>
            <h2>Politique de confidentialité</h2>
            <h2>CGV </h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;