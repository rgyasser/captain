// AccessoriesCarousel.tsx

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// --- Données des accessoires ---

const rearAccessories = [
    { image: '/images/Leveler.png', alt: 'Leveler', title: 'Leveler' },
    { image: '/images/Reversible.png', alt: 'Reversible', title: 'Reversible' },
    { image: '/images/Cultivateur.png', alt: 'Cultivateur', title: 'Cultivateur' },
    { image: '/images/Rotavateur.png', alt: 'Rotavateur', title: 'Rotavateur' },
    { image: '/images/remorque.png', alt: 'remorque', title: 'remorque' },
    { image: '/images/Planteuse.png', alt: 'Planteuse de pommes de terre', title: 'Planteuse de pommes de terre' },
    { image: '/images/Butteuse.png', alt: 'Butteuse ', title: 'Butteuse ' },
    { image: '/images/Herse.png', alt: 'Herse à disques', title: 'Herse à disques' },
];


export default function AccessoriesLayout() {
    // 2. On crée un état pour CHAQUE carrousel
    const [frontCurrentIndex, setFrontCurrentIndex] = useState(0);
    const [rearCurrentIndex, setRearCurrentIndex] = useState(0);

    // --- Fonctions pour le carrousel ARRIÈRE ---
    const nextRearSlide = () => {
        setRearCurrentIndex((prev) => (prev + 1) % rearAccessories.length);
    };
    const prevRearSlide = () => {
        setRearCurrentIndex((prev) => (prev - 1 + rearAccessories.length) % rearAccessories.length);
    };
    const getVisibleRearItems = () => {
        const center = rearAccessories[rearCurrentIndex];
        const left = rearAccessories[(rearCurrentIndex - 1 + rearAccessories.length) % rearAccessories.length];
        const right = rearAccessories[(rearCurrentIndex + 1) % rearAccessories.length];
        return { left, center, right };
    };
    const { left: rearLeft, center: rearCenter, right: rearRight } = getVisibleRearItems();


    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">

            {/* ============================ */}
            {/* === SECTION ARRIÈRE ======== */}
            {/* ============================ */}
            <div>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-green-700">Accessoires arrière :</h3>
                </div>

                {/* Version PC (Desktop) - ARRIÈRE */}
                <div className="hidden md:flex relative items-center justify-center">
                    <button onClick={prevRearSlide} className="absolute left-0 z-20 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors border border-gray-200">
                        <ChevronLeft className="w-8 h-8 text-gray-700" />
                    </button>
                    {/* CORRECTION: Changed items-end to items-start to align items at the top */}
                    <div className="flex items-start justify-center space-x-8">
                        <div className="relative cursor-pointer group" onClick={prevRearSlide}>
                            <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg shadow-md transform perspective-1000 transition-transform duration-300 group-hover:scale-105" style={{ transform: 'rotateY(-8deg) rotateX(4deg)' }}>
                                <div className="w-full h-full flex flex-col items-center justify-center p-4 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <img src={rearLeft.image} alt={rearLeft.alt} className="w-40 h-40 object-contain mb-4" />
                                    <span className="text-base font-medium text-gray-800 text-center">{rearLeft.title}</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10">
                            <div className="w-80 h-80 bg-white rounded-lg shadow-2xl">
                                <div className="w-full h-full flex flex-col items-center justify-center p-6">
                                    <img src={rearCenter.image} alt={rearCenter.alt} className="w-52 h-52 object-contain mb-5" />
                                    <span className="text-lg font-semibold text-gray-900 text-center">{rearCenter.title}</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative cursor-pointer group" onClick={nextRearSlide}>
                            <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg shadow-md transform perspective-1000 transition-transform duration-300 group-hover:scale-105" style={{ transform: 'rotateY(8deg) rotateX(4deg)' }}>
                                <div className="w-full h-full flex flex-col items-center justify-center p-4 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <img src={rearRight.image} alt={rearRight.alt} className="w-40 h-40 object-contain mb-4" />
                                    <span className="text-base font-medium text-gray-800 text-center">{rearRight.title}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={nextRearSlide} className="absolute right-0 z-20 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors border border-gray-200">
                        <ChevronRight className="w-8 h-8 text-gray-700" />
                    </button>
                </div>

                {/* Version MOBILE - ARRIÈRE */}
                <div className="md:hidden">
                    <div className="relative pb-10">
                        <Swiper
                            modules={[Pagination, Navigation]}
                            slidesPerView={1}
                            spaceBetween={30}
                            loop={true}
                            pagination={{
                                clickable: true,
                                el: '.swiper-pagination'
                            }}
                            navigation={true}
                            className="mobile-accessories-swiper"
                        >
                            {rearAccessories.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="w-full max-w-xs mx-auto border border-gray-200 rounded-xl bg-white shadow-lg flex flex-col overflow-hidden">
                                        <div className='bg-white p-4 flex flex-col items-center justify-center'>
                                            <img src={item.image} alt={item.alt} className="w-48 h-48 object-contain mb-4" />
                                        </div>
                                        <div className="p-4 text-center bg-gray-50 border-t border-gray-200">
                                            <span className="font-semibold text-base text-gray-800">{item.title}</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="swiper-pagination absolute bottom-0 w-full"></div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .mobile-accessories-swiper .swiper-button-next,
                .mobile-accessories-swiper .swiper-button-prev {
                    color: #4a5568; 
                    width: 32px;
                    height: 32px;
                    background-color: rgba(255, 255, 255, 0.8);
                    border-radius: 9999px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                .mobile-accessories-swiper .swiper-button-next:after,
                .mobile-accessories-swiper .swiper-button-prev:after {
                    font-size: 14px;
                    font-weight: bold;
                }
                .mobile-accessories-swiper .swiper-pagination {
                    position: absolute;
                    bottom: -30px;
                    left: 0;
                    right: 0;
                    width: 100%;
                    text-align: center;
                }
                .mobile-accessories-swiper .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    margin: 0 4px;
                }
                .mobile-accessories-swiper .swiper-pagination-bullet-active {
                    background-color: #38a169;
                }
            `}</style>
        </div>
    );
}