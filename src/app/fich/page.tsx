import React from 'react';
// On suppose que vous avez des composants Header et Footer comme dans votre structure
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// Pour une meilleure organisation, on définit les données techniques ici
const technicalData = [
  {
    category: "Moteur",
    details: [
      { label: "Marque/Modèle", value: "Mitsubishi MVS3L2 Stage-V" },
      { label: "Puissance", value: "25 CV (19 kW)" },
      { label: "Nombre de cylindres", value: "3" },
      { label: "Cylindrée", value: "1319 cm³" },
      { label: "Régime nominal", value: "2500 tr/min" },
      { label: "Couple max", value: "76.3 Nm @ 2000 tr/min" },
      { label: "Refroidissement", value: "Liquide" },
    ],
  },
  {
    category: "Transmission",
    details: [
      { label: "Type", value: "Mécanique (Sliding Mesh)" },
      { label: "Roues motrices", value: "4WD (4 roues motrices)" },
      { label: "Boîte de vitesses", value: "9 avant + 3 arrière" },
      { label: "Embrayage", value: "Simple" },
      { label: "Vitesse maximale", value: "Environ 20-25 km/h" },
    ],
  },
  {
    category: "Prise de Force (PTO)",
    details: [
      { label: "Régimes", value: "540 / 540E (ou 1000 tr/min selon modèle)" },
      { label: "Puissance PTO", value: "Environ 21.5 CV" },
    ],
  },
  {
    category: "Système Hydraulique",
    details: [
      { label: "Direction", value: "Assistée hydrostatique" },
      { label: "Distributeurs", value: "1 distributeur double effet (standard)" },
      { label: "Capacité de relevage", value: "600 kg à 750 kg (aux rotules)" },
      { label: "Attelage", value: "3 points, Catégorie I" },
      { label: "Contrôle", value: "Détection d'effort et contrôle de position" },
    ],
  },
  {
    category: "Dimensions et Poids",
    details: [
      { label: "Pneus avant (standard)", value: "280/ 70 R 18" },
      { label: "Pneus arrière (standard)", value: "6.5 / 80 - 12" },
      { label: "Poids", value: "~ 950 - 1025 kg" },
      { label: "Empattement", value: "~ 1500 mm" },
      { label: "Longueur totale", value: "~ 2700 mm" },
      { label: "Largeur totale", value: "~ 1030 mm - 1167 mm" },
      { label: "Capacité réservoir", value: "23 Litres" },
      { label: "Taille", value: "2674 mm" },
    ],
  },
];

// Le composant de la page
export default function FicheTechniquePage() {
  return (
    <>
      {/* <Header /> */}
      <main className="bg-gray-50">
        <div className="container mx-auto px-4 py-8 mt-15">
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-red-700">Captain 263 4WD</h1>
            <p className="text-lg md:text-xl text-gray-600 mt-2">Fiche Technique Détaillée</p>
          </header>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-4xl mx-auto">
            <div className="p-6 md:p-10 space-y-8">

              {/* On utilise .map() pour générer dynamiquement chaque section */}
              {technicalData.map((section) => (
                <section key={section.category}>
                  <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-red-600 pb-3 mb-5">
                    {section.category}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {section.details.map((spec) => (
                      <div key={spec.label} className="flex justify-between border-b border-gray-200 py-2">
                        <strong className="text-gray-600 font-semibold">{spec.label}:</strong>
                        <span className="text-gray-800 text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

            </div>
          </div>

          {/* Download Button Section */}
          <div className="mt-12 text-center">
            <a
              href="/images/EU263.pdf"
              download="Captain_EU263_Brochure.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                >
                </path>
              </svg>
              Téléchargez la brochure du modèle EU263
            </a>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}