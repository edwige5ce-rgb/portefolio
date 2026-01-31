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

export const aboutContent = {
  years: "8+",
  yearsLabel: "Années d'expérience en design d'intérieur",
  philosophy: "Nous croyons que le design d'intérieur est de concevoir des systèmes spatiaux où l'architecture et objets technologiques ne font qu'un."
};

export const projects = [
  {
    id: 1,
    slug: "suite-serenite",
    title: "Sérénité",
    subtitle: "Suite Hôtelière",
    location: "Côte d'Azur, France",
    year: "2026",
    category: "Interior Design",
    heroImage: "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/vj3dk2qp_Enscape_2026-01-26-14-36-48.png",
    description: "Une suite hôtelière où le luxe rencontre la nature. Les boiseries chaleureuses dialoguent avec un mur de pierre brute spectaculaire, tandis que les baies vitrées ouvrent sur un balcon végétalisé baigné de lumière dorée.",
    features: [
      {
        title: "Mur Pierre Naturelle",
        description: "Formation rocheuse authentique intégrée, pièce maîtresse sculpturale",
        stat: "Unique"
      },
      {
        title: "Boiseries Chêne",
        description: "Panneaux muraux en chêne miel avec veinage naturel",
        stat: "Premium"
      },
      {
        title: "Balcon Végétalisé",
        description: "Terrasse privative avec jardin suspendu luxuriant",
        stat: "25 m²"
      }
    ],
    gallery: [
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/vj3dk2qp_Enscape_2026-01-26-14-36-48.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/gz4fo4ep_Enscape_2026-01-26-14-36-48.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/69r345po_Enscape_2026-01-26-14-43-40.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/diyiree7_Enscape_2026-01-26-14-48-42.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/ibj0q6lm_Enscape_2026-01-26-15-04-02.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/eopfubdz_Enscape_2026-01-26-15-41-15.png"
    ],
    colors: ["#D4A574", "#8B7355", "#E85D04", "#2D3A2E"],
    services: ["Space planning", "APS/PRO/DCE", "3D (Sketchup/Enscape)", "Matériaux & détails"]
  },
  {
    id: 2,
    slug: "maison-edouard",
    title: "Édouard",
    subtitle: "Brasserie & Boulangerie",
    location: "Bruxelles, Belgique",
    year: "2025",
    category: "Retail Design",
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
    services: ["Space planning", "APS/PRO/DCE", "3D (Sketchup/Enscape)", "Matériaux & détails"]
  },
  {
    id: 3,
    slug: "boulangerie-lulu",
    title: "Lulu",
    subtitle: "Boulangerie & Café",
    location: "Bruxelles, Belgique",
    year: "2024",
    category: "Retail Design",
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
    services: ["Space planning", "APS/PRO/DCE", "3D (Sketchup/Enscape)", "Matériaux & détails"]
  },
  {
    id: 4,
    slug: "studio-da-tech",
    title: "Studio DA & Tech",
    subtitle: "Espace de Coworking",
    location: "Paris, France",
    year: "2025",
    category: "Bureau",
    heroImage: "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/kjnw5yx8_OFFICE%20FOUR.png",
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
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/5uiziv6e_OFFICE%20ONE.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/jt3ekep2_OFFICE%20FOUR.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/xkjigw3a_OFFICE%20ONE.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/81h1k7mn_OFFICE%20THREE.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/h3535nb6_OFFICE%20TWO.png"
    ],
    colors: ["#5B7B7A", "#E8DFD0", "#C4A67C", "#F5F0E6"],
    services: ["Space planning", "APS/PRO/DCE", "3D (Sketchup/Enscape)", "Matériaux & détails"]
  },
  {
    id: 5,
    slug: "bazar-savant",
    title: "Bazar Savant",
    subtitle: "Agence Sportive",
    location: "Lyon, France",
    year: "2024",
    category: "Interior Design",
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
    services: ["Space planning", "APS/PRO/DCE", "3D (Sketchup/Enscape)", "Matériaux & détails"]
  },
  {
    id: 6,
    slug: "n3-horizon",
    title: "N.3 Horizon",
    subtitle: "Yacht de Luxe",
    location: "Monaco",
    year: "2024",
    category: "Nautical Design & Product Design",
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
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/0uz16oqr_Enscape_2025-10-14-11-26-00.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/cmghhf49_Enscape_2025-10-14-11-47-25.png"
    ],
    colors: ["#8B7355", "#F5F0E6", "#2C1810", "#D4AF37"],
    services: ["Space planning", "APS/PRO/DCE", "3D (Sketchup/Enscape)", "Matériaux & détails"]
  },
  {
    id: 7,
    slug: "altitude-aframe",
    title: "Altitude",
    subtitle: "Refuge A-Frame",
    location: "Alpes Suisses",
    year: "2025",
    category: "Retail Design",
    heroImage: "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/4myq3y0d_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180558.png",
    images: [
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/4myq3y0d_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180558.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/3kvgk9a0_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180613.png"
    ],
    description: "Le projet consiste en un capteur de rosée léger et minimaliste, intégré à une structure poteau poutre utilisant des matériaux simples et un tissu poreux pour capter l'humidité du brouillard, laquelle est ensuite transformée en eau. Cette eau est produite principalement la nuit, stockée dans un réservoir intégré, puis redistribuée via un système d'irrigation goutte-à-goutte afin de soutenir une végétation à la fois sauvage et maîtrisée. Implanté sur des pentes raides au sein d'un environnement vallonné et exposé aux incendies, la cabane collectent en moyenne 350 litres d'eau par jour, dont 290 litres sont dédiés au renforcement de la biodiversité locale.",
    features: [
      {
        title: "Capteur de Rosée",
        description: "Tissu poreux captant l'humidité du brouillard nocturne",
        stat: "350 L/jour"
      },
      {
        title: "Biodiversité",
        description: "Irrigation goutte-à-goutte pour végétation sauvage et maîtrisée",
        stat: "290 L"
      },
      {
        title: "Structure Bois",
        description: "Ossature poteau poutre en matériaux simples et durables",
        stat: "100% Bois"
      }
    ],
    gallery: [
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/p1sbig6b_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180706.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/8epmvmra_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180729.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/cw1hzfsy_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180706.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/yiuseojc_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180729.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/sj07vp3u_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180558.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/zfmy5sk3_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180613.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/4myq3y0d_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180558.png",
      "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/3kvgk9a0_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180613.png"
    ],
    colors: ["#D4C4A8", "#8B9A7D", "#F5F5F0", "#3D3D3D"],
    services: ["Space planning", "APS/PRO/DCE", "3D (Sketchup/Enscape)", "Matériaux & détails"]
  }
];

export const services = [
  {
    title: "Space Planning",
    description: "Conception et optimisation des espaces"
  },
  {
    title: "3D Visualization",
    description: "Sketchup & Enscape"
  },
  {
    title: "Matériaux & Détails",
    description: "Sélection et mise en œuvre"
  }
];
