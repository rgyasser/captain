"use client";

import Image from "next/image";
import React, { useState } from "react";
import Header from "@/components/Header";
import AccessoriesCarousel from "@/components/AccessoriesCarousel"; // Zedt Import

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
      {/* HNA FIN SLLE7T L'LOGIC DYAL ISREVERSED */}
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
  const feature1 = {
    title: "Diagramme technique détaillé",
    description: "Explorez chaque composant et comprenez la mécanique de précision de votre Captain, de l'hydraulique au différentiel.",
    images: ["/images/img1.png", "/images/img2.png", "/images/img3.png"],
  };

  const feature2 = {
    title: "Prêt pour tous les terrains",
    description: "Que ce soit dans les champs, sur la route ou dans la neige, le Captain 263 est conçu pour offrir une performance et une fiabilité exceptionnelles.",
    images: ["/images/img4.png", "/images/img5.png", "/images/img6.png"],
  };

  const frontAccessories = [
    { name: "Pare-chocs avant", image: "/images/pickup-main-1.jpg" },
    { name: "Treuil intégré", image: "/images/pickup-side-1.jpg" },
    { name: "Phares LED additionnels", image: "/images/pickup-back-1.jpg" },
    { name: "Grille de protection", image: "/images/pickup-main-1.jpg" },
  ];

  const rearAccessories = [
    { name: "Attelage remorque", image: "/images/engine-main.jpg" },
    { name: "Couvre-benne rigide", image: "/images/engine-side.jpg" },
    { name: "Marchepied arrière", image: "/images/engine-close-up.jpg" },
    { name: "Roll bar", image: "/images/engine-main.jpg" },
  ];

  return (
    <main>
      <Header />
      <section
        className="relative w-full h-[60vh] md:h-[80vh] bg-cover bg-center pt-20"
        style={{ backgroundImage: "url('/images/bg11.png')" }}
      >
        <div className="absolute inset-0 flex items-start justify-end pt-10 pr-10 md:pt-39 md-pr-60">
          <Image
            src="/images/imgi_6_1.png"
            alt="Captain Tractor"
            width={700}
            height={700}
            className="w-auto h-auto max-w-[80%] md:max-w-[80%] max-h-[90%] object-contain"
            priority
            onError={(e) =>
            (e.currentTarget.src =
              "https://placehold.co/700x700/cccccc/FFFFFF?text=Tracteur")
            }
          />
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 text-center">
            <div className="px-4 md:border-r md:border-gray-300">
              <h3 className="text-2xl font-bold text-red-600 mb-4">Moteur</h3>
              <div className="text-gray-700 space-y-1">
                <p>Diesel Mitsubishi</p>
                <p>3 cylindres</p>
                <p>25 CV</p>
              </div>
            </div>
            <div className="px-4 md:border-r md:border-gray-300">
              <h3 className="text-2xl font-bold text-red-600 mb-4">Vitesse</h3>
              <div className="text-gray-700 space-y-1">
                <p>25km/h</p>
                <p>Basse/Moyenne/Elevé</p>
              </div>
            </div>
            <div className="px-4">
              <h3 className="text-2xl font-bold text-red-600 mb-4">Pneu</h3>
              <div className="text-gray-700 space-y-1">
                <p>Pneu avant : 180/85D12</p>
                <p>Pneu arrière : 8.3 x 20</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Ce qui rend Captain unique :
          </h2>
          <div>
            <UniqueFeatureRow {...feature1} />
            <div className="py-12">
              <hr className="border-t border-gray-200" />
            </div>
            <UniqueFeatureRow {...feature2} isReversed={true} />
          </div>
        </div>
      </section>

      {/* SECTION JDIDA DYAL LES ACCESSOIRES */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">ACCESSOIRES</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Large possibilité d'extension grâce à de nombreux accessoires et fonctionnalités.
          </p>

          <div className="mt-12 space-y-16 text-left">
            <AccessoriesCarousel title="Accessoires avant :" accessories={frontAccessories} />
            <AccessoriesCarousel title="Accessoires arrière :" accessories={rearAccessories} />
          </div>
        </div>
      </section>
    </main>
  );
}