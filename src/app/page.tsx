"use client"; // Daroria bach nkhadmo l'hooks (useState, useEffect)

import Image from "next/image";
import React, { useState, useEffect } from "react"; // Jbna useState w useEffect
import Header from "@/components/Header";

// =================================================================
// Interface Jdida: Bdelnaha chwiya
// =================================================================
interface UniqueFeatureRowProps {
  title: string;
  description: string;
  images: string[]; // Mabqatch mainImage w thumbnails, wellat ghir liste wa7da
  isReversed?: boolean;
}

// =================================================================
// Component wella fih l'7araka dyal Carousel
// =================================================================
const UniqueFeatureRow: React.FC<UniqueFeatureRowProps> = ({
  title,
  description,
  images,
  isReversed = false,
}) => {
  // Kanbdayw b'tswira l'wla (index 0)
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect bach nbedlo tswira kolla 3 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      // Kanziydo l'index b wa7d, w ila wsel l'kher kanrje3 l 0
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3000ms = 3 secondes

    // Darori n'waqfo l'timer mli nkhourjo men l'component
    return () => clearInterval(timer);
  }, [images.length]);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const thumbnailColumn = (
    <div className="flex flex-row md:flex-col justify-center items-center gap-4 col-span-1 md:col-span-2">
      {images.map((imgSrc, index) => (
        <div
          key={index}
          className={`p-1 border-2 rounded-md cursor-pointer transition-all ${
            currentIndex === index
              ? "border-red-600"
              : "border-gray-200 hover:border-gray-400"
          }`}
          onClick={() => handleThumbnailClick(index)} // Hna fin kayn l'event dyal l'click
        >
          <Image
            src={imgSrc}
            alt={`Thumbnail ${index + 1}`}
            width={120}
            height={80}
            className="object-cover rounded-sm"
          />
        </div>
      ))}
    </div>
  );

  const mainImageColumn = (
    <div className="col-span-1 md:col-span-5">
      {/* Tswira lkbira daba katakhd l'path men l'images[currentIndex] */}
      <Image
        src={images[currentIndex]}
        alt={title}
        width={600}
        height={400}
        className="w-full h-auto rounded-lg shadow-lg"
      />
    </div>
  );

  const textColumn = (
    <div className="col-span-1 md:col-span-5">
      <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <hr className="mt-6 border-gray-300" />
    </div>
  );

  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center`}>
      {isReversed ? (
        <>
          {textColumn} {mainImageColumn} {thumbnailColumn}{" "}
        </>
      ) : (
        <>
          {thumbnailColumn} {mainImageColumn} {textColumn}{" "}
        </>
      )}
    </div>
  );
};

// =================================================================
// Main Page Component
// =================================================================
export default function HomePage() {
  // L'ma3lomat dyal l'bloc l'wel
  const feature1 = {
    title: "Passe partout et puissant",
    description:
      "Avec sa taille compacte, Captain passe facilement entre les arbres et atteint les zones les plus étroites, tout en restant puissant et précis.",
    images: ["/images/img1.png", "/images/img2.png", "/images/img3.png"],
  };

  // L'ma3lomat dyal l'bloc tani
  const feature2 = {
    title: "Moteur Robuste et Économique",
    description:
      "Le nouveau moteur diesel offre un couple exceptionnel pour les travaux les plus exigeants, tout en garantissant une faible consommation de carburant.",
    images: ["/images/img4.png", "/images/img5.png", "/images/img6.png"],
  };

  return (
    <main>
      <Header />
      <section
        className="relative w-full h-[60vh] md:h-[80vh] bg-cover bg-center pt-20"
        style={{ backgroundImage: "url('/images/imgi_16_bg1.png')" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/imgi_6_1.png"
            alt="Captain Tractor"
            width={700}
            height={700}
            className="w-auto h-auto max-w-[90%] max-h-[80%] object-contain"
            priority
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
          <div className="space-y-16">
            <UniqueFeatureRow {...feature1} />
            <UniqueFeatureRow {...feature2} isReversed={true} />
          </div>
        </div>
      </section>
    </main>
  );
}
