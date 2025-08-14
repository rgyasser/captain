'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

// ZEDNA IMPORT DYAL LINK W IMAGE
import Link from 'next/link';
import Image from 'next/image';

interface MenuItem {
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash === '#accessories') {
      const element = document.getElementById('accessories');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname]);

  // CORRECTION: Sta3mlna l'interface MenuItem hna
  const menuItems: MenuItem[] = [
    { label: 'Accueil', href: '/' },
    { 
      label: 'Accessoires', 
      href: '/#accessories',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        if (pathname === '/') {
          const element = document.getElementById('accessories');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false);
          }
        } else {
          router.push('/#accessories');
          setMenuOpen(false);
        }
      }
    },
    { label: 'Devis', href: '/devis' },
    { label: 'Service Après-Vente', href: '/sav' },
    { label: 'Fiche technique', href: '/fich' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`w-full bg-white backdrop-blur-sm text-gray-900 fixed top-0 left-0 right-0 z-50 shadow-md ${className}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {/* CORRECTION: Bddelna <a> b <Link> w <img> b <Image> */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-500 transition-colors">
            <Image src="/images/logo.png" alt="Captain Maroc Logo" width={120} height={40} priority className='hover:scale-95 transition-transform' />
          </Link>

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
                // CORRECTION: Bddelna <a> b <Link>
                <Link
                  key={index}
                  href={item.href}
                  onClick={item.onClick}
                  className="relative group font-medium text-gray-700 hover:text-red-600 transition-colors duration-300"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
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
              // CORRECTION: Bddelna <a> b <Link>
              <Link
                key={index}
                href={item.href}
                className="text-lg text-gray-700 text-left py-3 px-4 rounded-md hover:bg-gray-100 transition-colors duration-200"
                onClick={(e) => {
                  if (item.onClick) {
                    item.onClick(e);
                  }
                  // We need to close the menu after any click on mobile
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;