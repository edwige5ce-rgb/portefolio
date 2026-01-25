// ============================================
// DONNÉES MODIFIABLES DU PORTFOLIO
// Style Apple - Design d'intérieur
// ============================================

export const siteConfig = {
  name: "STUDIO",
  tagline: "Design d'Intérieur",
  description: "Créateur d'atmosphères uniques",
  email: "contact@studio-design.com",
  phone: "+32 87 85 85 00",
  address: "Bruxelles, Belgique",
  social: {
    instagram: "#",
    linkedin: "#",
    pinterest: "#"
  }
};

export const heroContent = {
  title: "Atmosphères",
  subtitle: "Design d'intérieur d'exception",
  description: "Nous créons des espaces qui racontent votre histoire.",
  scrollText: "Défiler pour explorer"
};

export const projects = [
  {
    id: 1,
    slug: "maison-edouard",
    title: "Édouard",
    subtitle: "Brasserie & Boulangerie",
    location: "Bruxelles, Belgique",
    year: "2025",
    category: "Commercial",
    heroImage: "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/70jiw4uo_Enscape_2025-01-16-13-59-02.png",
    description: "Maison Édouard réinvente la brasserie traditionnelle belge. Les murs vert sapin dialoguent avec les banquettes en cuir cognac et les boiseries chaleureuses, créant une atmosphère à la fois intemporelle et contemporaine.",
    features: [
      {
        title: "Murs Signature",
        description: "Revêtement mural vert sapin avec lettrage doré artisanal",
        stat: "Vert Forêt"
      },
      {
        title: "Banquettes Cuir",
        description: "Cuir naturel cognac capitonné, confort premium",
        stat: "Sur mesure"
      },
      {
        title: "Parquet Chêne",
        description: "Parquet massif aspect vieilli pour une ambiance authentique",
        stat: "250 m²"
      }
    ],
    gallery: [
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/70jiw4uo_Enscape_2025-01-16-13-59-02.png"
    ],
    colors: ["#2D4A3E", "#C4783A", "#D4A574", "#F5F0E6"],
    services: ["Design d'intérieur", "Mobilier sur mesure", "Signalétique", "Éclairage"]
  },
  {
    id: 2,
    slug: "boulangerie-lulu",
    title: "Lulu",
    subtitle: "Boulangerie & Café",
    location: "Bruxelles, Belgique",
    year: "2024",
    category: "Commercial",
    heroImage: "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/mpdt9l6i_VUE%20ENSEMBLE.png",
    description: "Un espace gourmand où l'élégance parisienne rencontre la chaleur belge. Le sol en damier noir et blanc dialogue avec les boiseries claires et les accents de bleu profond.",
    features: [
      {
        title: "Sol Signature",
        description: "Damier en marbre noir et blanc, motif intemporel réinterprété",
        stat: "120 m²"
      },
      {
        title: "Boiseries Sur Mesure",
        description: "Chêne clair avec finitions laiton, conçues pour mettre en valeur les produits",
        stat: "Artisanal"
      },
      {
        title: "Éclairage Atmosphérique",
        description: "Système LED intégré créant une ambiance chaleureuse et accueillante",
        stat: "3000K"
      }
    ],
    gallery: [
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/mpdt9l6i_VUE%20ENSEMBLE.png"
    ],
    colors: ["#1a1a1a", "#f5f5f0", "#2B4A6F", "#C9A86C"],
    services: ["Design d'intérieur", "Mobilier sur mesure", "Éclairage", "Suivi de chantier"]
  },
  {
    id: 3,
    slug: "bureau-moderne",
    title: "Horizon",
    subtitle: "Espace de Coworking",
    location: "Paris, France",
    year: "2025",
    category: "Bureau",
    heroImage: "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/kjnw5yx8_OFFICE%20FOUR.png",
    images: [
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/kjnw5yx8_OFFICE%20FOUR.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/5uiziv6e_OFFICE%20ONE.png"
    ],
    description: "Un espace de travail contemporain où le bleu-vert profond rencontre le bois naturel. Les panneaux acoustiques beige et le parquet chevrons créent une atmosphère propice à la concentration et à la créativité.",
    features: [
      {
        title: "Parquet Chevrons",
        description: "Chêne naturel posé en chevrons hongrois, élégance classique",
        stat: "Premium"
      },
      {
        title: "Mur Accent",
        description: "Panneaux moulurés bleu-vert avec éclairage LED indirect",
        stat: "Bleu Canard"
      },
      {
        title: "Postes de Travail",
        description: "Bureaux en bois massif avec gestion des câbles intégrée",
        stat: "6 postes"
      }
    ],
    gallery: [
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/kjnw5yx8_OFFICE%20FOUR.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/5uiziv6e_OFFICE%20ONE.png"
    ],
    colors: ["#5B7B7A", "#E8DFD0", "#C4A67C", "#F5F0E6"],
    services: ["Design d'intérieur", "Aménagement bureau", "Mobilier", "Acoustique"]
  },
  {
    id: 4,
    slug: "bureau-sport",
    title: "Victory",
    subtitle: "Agence Sportive",
    location: "Lyon, France",
    year: "2024",
    category: "Bureau",
    heroImage: "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/zvsicm76_ChatGPT%20Image%2025%20janv.%202026%2C%2016_29_26.png",
    description: "Un bureau d'agence sportive qui respire la passion du basketball. Le cuir noir, le parquet chevrons et les éléments décoratifs sportifs créent un univers immersif pour les athlètes et agents.",
    features: [
      {
        title: "Espace Lounge",
        description: "Canapé en cuir noir premium avec table basse en verre fumé",
        stat: "VIP"
      },
      {
        title: "Déco Sportive",
        description: "Ballons signature et affiche iconique Michael Jordan",
        stat: "Collector"
      },
      {
        title: "Parquet Chevrons",
        description: "Chêne clair posé en chevrons, référence aux salles de sport",
        stat: "45 m²"
      }
    ],
    gallery: [
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/zvsicm76_ChatGPT%20Image%2025%20janv.%202026%2C%2016_29_26.png"
    ],
    colors: ["#1A1A1A", "#F5F5F5", "#C4A67C", "#E85D04"],
    services: ["Design d'intérieur", "Mobilier sur mesure", "Décoration thématique"]
  },
  {
    id: 5,
    slug: "chalet-bois",
    title: "Refuge",
    subtitle: "Intérieur Montagne",
    location: "Chamonix, France",
    year: "2024",
    category: "Résidentiel",
    heroImage: "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/cmghhf49_Enscape_2025-10-14-11-47-25.png",
    description: "Un intérieur de chalet où le bois règne en maître. L'espace ouvert combine cuisine, salle à manger et coin lecture sous une mezzanine, créant une atmosphère chaleureuse et authentique.",
    features: [
      {
        title: "Structure Bois",
        description: "Ossature et finitions en bois massif, construction traditionnelle",
        stat: "100% Bois"
      },
      {
        title: "Mezzanine",
        description: "Espace nuit suspendu avec garde-corps en bois ajouré",
        stat: "15 m²"
      },
      {
        title: "Coin Lecture",
        description: "Banquette intégrée avec bibliothèque murale",
        stat: "Cosy"
      }
    ],
    gallery: [
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/cmghhf49_Enscape_2025-10-14-11-47-25.png"
    ],
    colors: ["#8B7355", "#D4C4A8", "#5C5C5C", "#F5F0E6"],
    services: ["Architecture d'intérieur", "Mobilier intégré", "Aménagement montagne"]
  },
  {
    id: 6,
    slug: "yacht-prive",
    title: "Horizon",
    subtitle: "Yacht de Luxe",
    location: "Monaco",
    year: "2024",
    category: "Résidentiel",
    heroImage: "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/0uz16oqr_Enscape_2025-10-14-11-26-00.png",
    description: "L'intérieur de ce yacht incarne le summum du raffinement maritime. Les boiseries en teck, l'éclairage d'ambiance et les matériaux nobles créent un sanctuaire flottant.",
    features: [
      {
        title: "Boiseries Teck",
        description: "Panneaux de teck massif avec veinage naturel, traitement marine",
        stat: "Premium"
      },
      {
        title: "Éclairage LED",
        description: "Système d'ambiance intégré avec variation chromatique",
        stat: "RGB"
      },
      {
        title: "Cave à Cigares",
        description: "Espace dédié avec contrôle d'humidité et température",
        stat: "Sur mesure"
      }
    ],
    gallery: [
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/0uz16oqr_Enscape_2025-10-14-11-26-00.png"
    ],
    colors: ["#8B7355", "#F5F0E6", "#2C1810", "#D4AF37"],
    services: ["Concept naval", "Aménagement intérieur", "Mobilier yacht", "Éclairage"]
  },
  {
    id: 7,
    slug: "aframe-retreat",
    title: "Altitude",
    subtitle: "Refuge A-Frame",
    location: "Alpes Suisses",
    year: "2025",
    category: "Résidentiel",
    heroImage: "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/4myq3y0d_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180558.png",
    images: [
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/4myq3y0d_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180558.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/3kvgk9a0_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180613.png"
    ],
    description: "Une architecture biophilique où le bois et la lumière naturelle créent un dialogue permanent avec la montagne. Ce refuge minimaliste offre une expérience immersive au cœur de la nature.",
    features: [
      {
        title: "Structure Bois",
        description: "Ossature en épicéa local certifié, assemblages traditionnels",
        stat: "100% Bois"
      },
      {
        title: "Lumière Naturelle",
        description: "Panneaux translucides en polycarbonate pour une diffusion optimale",
        stat: "360°"
      },
      {
        title: "Mezzanine",
        description: "Espace de couchage suspendu avec vue panoramique",
        stat: "12 m²"
      }
    ],
    gallery: [
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/4myq3y0d_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180558.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/3kvgk9a0_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180613.png"
    ],
    colors: ["#D4C4A8", "#8B9A7D", "#F5F5F0", "#3D3D3D"],
    services: ["Architecture d'intérieur", "Design biophilique", "Mobilier intégré"]
  }
];

export const services = [
  {
    title: "Design d'Intérieur",
    description: "Conception complète de vos espaces"
  },
  {
    title: "Architecture",
    description: "Du concept à la réalisation"
  },
  {
    title: "Mobilier Sur Mesure",
    description: "Pièces uniques pour espaces uniques"
  }
];
