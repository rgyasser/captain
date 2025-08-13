'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Galerie', href: '/galerie' },
    { label: 'Devis', href: '/devis' },
    { label: 'Service Après-Vente', href: '/sav' },

    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`w-full bg-white backdrop-blur-sm text-gray-900 fixed top-0 left-0 right-0 z-50 shadow-md ${className}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">  {/* was h-20 */}
          {/* Logo */}
          <a href="/" className="flex-shrink-0 flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-500 transition-colors">
            <img src="images/logo.png" alt="" className='w-15 hover:scale-95 transition-transform'/> {/* was w-15 */}
          </a>

          {/* Hamburger Menu Icon (Mobile only) */}
          <button
            className="block lg:hidden p-2 text-gray-700 focus:outline-none"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex gap-8">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="relative group font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50">
          <div className="flex flex-col p-4 space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-lg text-gray-700 text-left py-3 px-4 rounded-md hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;