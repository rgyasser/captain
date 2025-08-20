"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import AccessoriesCarousel from "@/components/AccessoriesCarousel";
import { motion } from "framer-motion";

interface UniqueFeatureRowProps {
  title: string;
  description: string;
  images: string[];
  isReversed?: boolean;
}

const UniqueFeatureRow: React.FC<UniqueFeatureRowProps> = ({
  title,
  description,
  images,
  isReversed = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const thumbnailColumn = (
    <div className="flex flex-row md:flex-col justify-center items-center gap-4 col-span-1 md:col-span-2">
      {images.map((imgSrc, index) => (
        <div
          key={index}
          className={`relative w-28 h-20 rounded-md cursor-pointer ring-2 transition-all ${currentIndex === index ? "ring-red-600" : "ring-transparent"
            }`}
          onClick={() => handleThumbnailClick(index)}
        >
          <Image
            src={imgSrc}
            alt={`Thumbnail ${index + 1}`}
            fill
            sizes="120px"
            className="object-cover rounded-md"
          />
        </div>
      ))}
    </div>
  );

  const mainImageColumn = (
    <div className="col-span-1 md:col-span-5 aspect-video relative rounded-lg shadow-lg overflow-hidden">
      <Image
        src={images[currentIndex]}
        alt={title}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );

  const textColumn = (
    <div className="col-span-1 md:col-span-5">
      <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );

  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center`}>
      {isReversed ? (
        <>
          {thumbnailColumn}
          {mainImageColumn}
          {textColumn}
        </>
      ) : (
        <>
          {thumbnailColumn}
          {mainImageColumn}
          {textColumn}
        </>
      )}
    </div>
  );
};

export default function HomePage() {
  // Background carousel images
  const bgImagesDesktop = [
    '/images/bg1.png',
    '/images/bg2.png',
  ];
  
  const bgImagesMobile = [
    '/images/mobilebacjground.png',
    '/images/mobilebacjground2.png',
  ];
  
  const [bgIndex, setBgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Cycle background images every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((i) => (i + 1) % bgImagesDesktop.length);
    }, 4000);
    
    return () => clearInterval(id);
  }, []);
  
  // Get current background image based on device
  const currentBgImage = isMobile ? bgImagesMobile[bgIndex] : bgImagesDesktop[bgIndex];
  
  // Hero images for the tractor
  const heroImages = [
    '/images/image1.png',
  ];
  const [heroIndex, setHeroIndex] = useState(0);
  
  // Cycle hero images
  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const feature1 = {
    title: "Passe partout et puissant",
    description:
      "Avec sa taille compacte, Captain passe facilement entre les arbres et atteint les zones les plus étroites, tout en restant puissant et précis.",
    images: ["/images/pss.png", "/images/pss2.png", "/images/pss3.png"],
  };

  const feature2 = {
    title: "Rentable et écologique",
    description:
      "Captain consomme moins de carburant, réduit vos coûts d'exploitation et limite son impact sur l'environnement — un choix gagnant pour votre activité et pour la planète.",
    images: ["/images/pss5.png", "/images/pss6.png", "/images/img1.png"],
  };

  return (
    <main>
      <Header />
      <section
        className="relative w-full h-[60vh] md:h-[100vh] bg-cover bg-center mb-16 md:mb-24"
        style={{
          backgroundImage: `url(${currentBgImage})`,
          transition: 'background-image 0.5s ease-in-out'
        }}
      >
        {/* Optional: Background navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {(isMobile ? bgImagesMobile : bgImagesDesktop).map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${i === bgIndex ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => setBgIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 h-full relative">
          <motion.div
            className="absolute right-0 -bottom-12 md:-bottom-12 z-10 w-2/3 md:w-1/2 lg:w-5/12 cursor-pointer"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <Image
              src={heroImages[heroIndex]}
              alt="Captain Tractor"
              width={900}
              height={900}
              className="w-full h-auto"
              priority
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/900x900/cccccc/FFFFFF?text=Tracteur")
              }
            />
          </motion.div>
        </div>
      </section>

      <section className="pb-10 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 text-center">
            <motion.div
              className="px-4 md:border-r md:border-gray-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-red-600 mb-4">Moteur</h3>
              <div className="text-gray-700 space-y-1">
                <p>Diesel Mitsubishi</p>
                <p>3 cylindres</p>
                <p>25 CV</p>
              </div>
            </motion.div>

            <motion.div
              className="px-4 md:border-r md:border-gray-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-red-600 mb-4">Vitesse</h3>
              <div className="text-gray-700 space-y-1">
                <p>25km/h</p>
                <p>Basse/Moyenne/Elevé</p>
              </div>
            </motion.div>

            <motion.div
              className="px-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-red-600 mb-4">Pneu</h3>
              <div className="text-gray-700 space-y-1">
                <p>Pneu avant : 6.5 / 80 - 12</p>
                <p>Pneu arrière : 280 / 70 R 18</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Ce qui rend Captain unique :
          </h2>
          <div>
            <UniqueFeatureRow {...feature1} />
            <div className="py-12 flex items-center justify-end mr-32">
              <div className="w-1/3">
                <hr className="border-t-2 border-gray-300" />
              </div>
            </div>
            <UniqueFeatureRow {...feature2} isReversed={true} />
          </div>
        </div>
      </section>

      <section id="accessories" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold text-red-600 text-center uppercase">
            ACCESSOIRES
          </h1>
          <p className="text-center text-gray-600 mt-2 max-w-3xl mx-auto">
            {/* CORRECTION: Bddelna ' b &apos; */}
            Large possibilité d&apos;extension grâce à de nombreux accessoires
            et fonctionnalités.
          </p>
          <div className="mt-12 space-y-16 text-left">
            <AccessoriesCarousel />
          </div>
        </div>
      </section>
    </main>
  );
}
