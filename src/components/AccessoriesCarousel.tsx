// components/AccessoriesCarousel.tsx
"use client";

import React from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation } from 'swiper/modules';

// Sample data for the accessories. Replace with your actual data.
const accessories = [
    { image: '/images/imgi_30_35.png' },
    { image: '/images/imgi_32_32.png' },
    { image: '/images/imgi_33_30.png' },
    { image: '/images/imgi_34_38.png' },
    { image: '/images/imgi_35_33.png' },
    { image: '/images/imgi_36_45.png' },
];

export default function AccessoriesSlider() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4">Accessoires arrière :</h2>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                slidesPerGroup={1}
                navigation={true}
                loop={true}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 30 }
                }}
                modules={[Navigation]}
                // Zedt had l'className bach n'controliw les flèches men l'CSS
                className="accessories-swiper"
            >
                {accessories.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-center h-48 bg-gray-100">
                            {/* BDELT HNA L OBJECT-CONTAIN */}
                            <img src={item.image} alt={''} className="w-full h-full object-contain" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}