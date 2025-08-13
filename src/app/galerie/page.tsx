'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Les descriptions 'alt' sont maintenant vides
const galleryImages = [
  { src: '/images/img1.png', alt: '' },
  { src: '/images/img2.png', alt: '' },
  { src: '/images/img3.png', alt: '' },
  { src: '/images/img4.png', alt: '' },
  { src: '/images/img5.png', alt: '' },
  { src: '/images/img6.png', alt: '' },
  { src: '/images/img7.png', alt: '' },
  { src: '/images/img8.png', alt: '' },
  { src: '/images/img9.png', alt: '' },
  { src: '/images/img10.png', alt: '' },
  { src: '/images/img11.png', alt: '' },
  { src: '/images/img12.png', alt: '' },
  { src: '/images/img13.png', alt: '' },
  { src: '/images/img14.png', alt: '' },
  { src: '/images/img16.png', alt: '' },
  { src: '/images/img21.png', alt: '' },
  { src: '/images/img17.png', alt: '' },
  { src: '/images/img22.png', alt: '' },
  { src: '/images/img18.png', alt: '' },
  { src: '/images/img19.png', alt: '' },
  { src: '/images/img20.png', alt: '' },
];

const GalleryPage: React.FC = () => {
  // State pour suivre l'index de l'image sélectionnée
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex! + 1) % galleryImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prevIndex) => (prevIndex! - 1 + galleryImages.length) % galleryImages.length
      );
    }
  };

  // Ajout de la navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <div className="bg-stone-50">
      <Header />
      <main className="max-w-7xl mx-auto mt-12 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900">Galerie</h1>
          <p className="mt-4 text-lg text-stone-600">Découvrez le GWM Poer sous tous ses angles.</p>
          <div className="w-24 h-1 bg-stone-300 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="group relative w-full h-64 rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setSelectedImageIndex(index)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImageIndex(null)} // Fermer en cliquant sur le fond
          >
            <div
              className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant sur l'image
            >
              {/* Image Agrandie */}
              <motion.div layoutId={`gallery-image-${selectedImageIndex}`}>
                <Image
                  src={galleryImages[selectedImageIndex].src}
                  alt={galleryImages[selectedImageIndex].alt}
                  width={1200}
                  height={800}
                  className="object-contain w-auto h-auto max-w-full max-h-full rounded-lg shadow-2xl"
                />
              </motion.div>

              {/* Bouton Fermer (X) */}
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-0 right-0 m-4 text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition"
                aria-label="Fermer"
              >
                <X size={28} />
              </button>

              {/* Bouton Précédent (<) */}
              <button
                onClick={handlePrev}
                className="absolute left-0 m-4 text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition"
                aria-label="Image précédente"
              >
                <ChevronLeft size={32} />
              </button>

              {/* Bouton Suivant (>) */}
              <button
                onClick={handleNext}
                className="absolute right-0 m-4 text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition"
                aria-label="Image suivante"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
