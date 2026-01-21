// ============================================
// DONNÉES MODIFIABLES DU PORTFOLIO
// Modifiez ce fichier pour personnaliser le contenu
// ============================================

export const siteConfig = {
  name: "Studio Marquet",
  tagline: "Design Elements",
  description: "Création d'atmosphères uniques à travers le design d'intérieur",
  email: "contact@studiomarquet.com",
  phone: "+32 87 85 85 00",
  address: "Bruxelles, Belgique",
  social: {
    instagram: "#",
    linkedin: "#",
    pinterest: "#"
  }
};

export const heroContent = {
  title: "Créateur d'Atmosphères",
  subtitle: "Design d'intérieur sur mesure",
  description: "Nous transformons vos espaces en expériences uniques, alliant élégance intemporelle et design contemporain.",
  image: "https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg",
  cta: "Découvrir nos projets"
};

export const catalogueCategories = [
  { id: "all", name: "Tous", count: 12 },
  { id: "panels", name: "Panneaux Muraux", count: 4 },
  { id: "mouldings", name: "Moulures & Corniches", count: 3 },
  { id: "lighting", name: "Profils Lumineux", count: 2 },
  { id: "rosettes", name: "Rosaces", count: 2 },
  { id: "skirting", name: "Plinthes", count: 1 }
];

export const catalogueProducts = [
  {
    id: 1,
    name: "ARSTYL® Wall Panels",
    category: "panels",
    description: "Panneaux muraux 3D avec motifs géométriques modernes",
    image: "https://images.pexels.com/photos/207909/pexels-photo-207909.jpeg",
    designer: "Bertrand Lejoly",
    material: "Polyuréthane haute densité",
    isNew: true
  },
  {
    id: 2,
    name: "WALLSTYL® Cornice",
    category: "mouldings",
    description: "Corniche élégante pour plafonds classiques et contemporains",
    image: "https://images.pexels.com/photos/326347/pexels-photo-326347.jpeg",
    designer: "Michaël Bihain",
    material: "Polyuréthane flexible",
    isNew: false
  },
  {
    id: 3,
    name: "ARSTYL® Lighting Profile",
    category: "lighting",
    description: "Profil d'éclairage indirect LED intégré",
    image: "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg",
    designer: "Studio NMC",
    material: "Polyuréthane + diffuseur",
    isNew: true
  },
  {
    id: 4,
    name: "ARSTYL® Rosette R24",
    category: "rosettes",
    description: "Rosace de plafond classique avec détails ornementaux",
    image: "https://images.pexels.com/photos/32922266/pexels-photo-32922266.jpeg",
    designer: "Collection Heritage",
    material: "Polyuréthane",
    isNew: false
  },
  {
    id: 5,
    name: "WALLSTYL® Skirting",
    category: "skirting",
    description: "Plinthe moderne avec cache-câbles intégré",
    image: "https://images.pexels.com/photos/26571206/pexels-photo-26571206.jpeg",
    designer: "Studio NMC",
    material: "Polyuréthane flexible",
    isNew: false
  },
  {
    id: 6,
    name: "ARSTYL® Wave Panel",
    category: "panels",
    description: "Panneau mural ondulé pour effets de texture",
    image: "https://images.pexels.com/photos/35588942/pexels-photo-35588942.jpeg",
    designer: "Bertrand Lejoly",
    material: "Polyuréthane haute densité",
    isNew: true
  },
  {
    id: 7,
    name: "WALLSTYL® Crown Moulding",
    category: "mouldings",
    description: "Moulure de couronne pour finitions haut de gamme",
    image: "https://images.pexels.com/photos/35585253/pexels-photo-35585253.jpeg",
    designer: "Collection Classic",
    material: "Polyuréthane",
    isNew: false
  },
  {
    id: 8,
    name: "ARSTYL® Linear Panel",
    category: "panels",
    description: "Panneau linéaire pour créer des effets de profondeur",
    image: "https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg",
    designer: "Michaël Bihain",
    material: "Polyuréthane recyclé",
    isNew: false
  }
];

export const atmospheres = [
  {
    id: 1,
    title: "Pâtisserie à Bruxelles",
    style: "Douceur Pastel",
    description: "Un espace gourmand où les teintes douces de rose poudré et vert menthe créent une atmosphère accueillante et raffinée.",
    image: "https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg",
    colors: ["#F5E6E0", "#E8D5D0", "#A8C5B5"],
    location: "Bruxelles, Belgique"
  },
  {
    id: 2,
    title: "Appartement à Valencia",
    style: "Méditerranéen Moderne",
    description: "Luminosité méditerranéenne avec des accents jaunes solaires et des moulures classiques réinterprétées.",
    image: "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg",
    colors: ["#F4E4BA", "#E8D4A0", "#C9B896"],
    location: "Valencia, Espagne"
  },
  {
    id: 3,
    title: "Concept Store à Hamburg",
    style: "Contemporain Audacieux",
    description: "Design retail moderne avec panneaux bleus audacieux et lignes épurées pour une expérience shopping unique.",
    image: "https://images.pexels.com/photos/32922266/pexels-photo-32922266.jpeg",
    colors: ["#2B4A6F", "#3D5A80", "#E0E1DD"],
    location: "Hamburg, Allemagne"
  },
  {
    id: 4,
    title: "Maison près de Rotterdam",
    style: "Minimaliste Serein",
    description: "Pureté des lignes et lumière naturelle pour un intérieur zen où chaque élément respire.",
    image: "https://images.pexels.com/photos/26571206/pexels-photo-26571206.jpeg",
    colors: ["#F5F5F0", "#E8E8E3", "#D4D4CF"],
    location: "Rotterdam, Pays-Bas"
  },
  {
    id: 5,
    title: "Appartement à Vienne",
    style: "Néoclassique Élégant",
    description: "Grandeur viennoise avec rosaces ornementales et corniches travaillées dans un écrin contemporain.",
    image: "https://images.pexels.com/photos/35588942/pexels-photo-35588942.jpeg",
    colors: ["#F8F4F0", "#E5DDD5", "#C4B8AC"],
    location: "Vienne, Autriche"
  },
  {
    id: 6,
    title: "Cottage au Danemark",
    style: "Scandinave Chaleureux",
    description: "L'essence du hygge danois avec des matériaux naturels et une palette de tons neutres apaisants.",
    image: "https://images.pexels.com/photos/35585253/pexels-photo-35585253.jpeg",
    colors: ["#E8E4DE", "#D4CFC6", "#B8B0A4"],
    location: "Copenhague, Danemark"
  }
];

export const projects = [
  {
    id: 1,
    title: "Rénovation Haussmannienne",
    category: "Résidentiel",
    year: "2024",
    location: "Paris, France",
    description: "Transformation complète d'un appartement haussmannien avec intégration de moulures contemporaines et éclairage indirect.",
    images: [
      "https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg",
      "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg"
    ],
    featured: true,
    services: ["Design d'intérieur", "Sélection matériaux", "Suivi de chantier"]
  },
  {
    id: 2,
    title: "Boutique Hôtel",
    category: "Hôtellerie",
    year: "2024",
    location: "Londres, UK",
    description: "Création d'ambiances distinctes pour chaque étage, mêlant éléments classiques et touches contemporaines.",
    images: [
      "https://images.pexels.com/photos/32922266/pexels-photo-32922266.jpeg",
      "https://images.pexels.com/photos/26571206/pexels-photo-26571206.jpeg"
    ],
    featured: true,
    services: ["Concept global", "Design mobilier", "Éclairage"]
  },
  {
    id: 3,
    title: "Showroom Design",
    category: "Commercial",
    year: "2023",
    location: "Milan, Italie",
    description: "Espace d'exposition mettant en valeur les éléments décoratifs à travers des mises en scène immersives.",
    images: [
      "https://images.pexels.com/photos/35588942/pexels-photo-35588942.jpeg",
      "https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg"
    ],
    featured: false,
    services: ["Scénographie", "Éclairage", "Signalétique"]
  },
  {
    id: 4,
    title: "Villa Contemporaine",
    category: "Résidentiel",
    year: "2023",
    location: "Barcelone, Espagne",
    description: "Architecture intérieure minimaliste sublimée par des panneaux muraux texturés et profils lumineux.",
    images: [
      "https://images.pexels.com/photos/35585253/pexels-photo-35585253.jpeg",
      "https://images.pexels.com/photos/207909/pexels-photo-207909.jpeg"
    ],
    featured: false,
    services: ["Architecture intérieure", "Mobilier sur mesure"]
  }
];

export const services = [
  {
    title: "Design d'Intérieur",
    description: "Conception complète de vos espaces de vie et de travail"
  },
  {
    title: "Conseil en Matériaux",
    description: "Sélection experte d'éléments décoratifs et de finitions"
  },
  {
    title: "Suivi de Projet",
    description: "Accompagnement de A à Z jusqu'à la livraison finale"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Marie Laurent",
    role: "Propriétaire",
    text: "Une transformation incroyable de notre appartement. L'attention aux détails et la qualité des finitions sont exceptionnelles.",
    image: "https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg"
  },
  {
    id: 2,
    name: "Jean-Pierre Dubois",
    role: "Directeur Hôtel",
    text: "Studio Marquet a su capturer l'essence de notre marque et créer des espaces mémorables pour nos clients.",
    image: "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg"
  }
];
