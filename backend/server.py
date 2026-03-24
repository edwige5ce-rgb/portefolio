from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="EDGS Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============================================
# PYDANTIC MODELS
# ============================================

class SocialLinks(BaseModel):
    instagram: str = "#"
    linkedin: str = "#"
    pinterest: str = "#"

class SiteConfig(BaseModel):
    name: str
    tagline: str
    description: str
    email: str
    phone: str
    address: str
    social: SocialLinks = SocialLinks()

class HeroContent(BaseModel):
    title: str
    subtitle: str
    description: str
    scrollText: str

class AboutContent(BaseModel):
    years: str
    yearsLabel: str
    philosophy: str

class ServiceItem(BaseModel):
    title: str
    description: str

class Feature(BaseModel):
    title: str
    description: str
    stat: str

class ProjectOut(BaseModel):
    id: int
    slug: str
    title: str
    subtitle: str
    location: str
    year: str
    category: str
    heroImage: str
    description: str
    features: List[Feature] = []
    materials: List[str] = []
    gallery: List[str] = []
    colors: List[str] = []
    services: List[str] = []

class ContactMessage(BaseModel):
    name: str
    email: str
    phone: Optional[str] = ""
    subject: str
    message: str

class ContactMessageOut(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = ""
    subject: str
    message: str
    created_at: str
    read: bool = False

# ============================================
# SEED DATA (matches mock.js)
# ============================================

SEED_SITE_CONFIG = {
    "name": "edgs-design.com",
    "tagline": "Design d'Intérieur",
    "description": "Créateur d'atmosphères uniques",
    "email": "edgs.designer@outlook.fr",
    "phone": "+33 0665781033",
    "address": "Paris, France",
    "social": {"instagram": "#", "linkedin": "#", "pinterest": "#"}
}

SEED_HERO = {
    "title": "Atmosphères",
    "subtitle": "Architecture & Technology Design",
    "description": "L'architecture et objet technologique ne font qu'un.",
    "scrollText": "Défiler pour explorer"
}

SEED_ABOUT = {
    "years": "8+",
    "yearsLabel": "Années d'expérience en design d'intérieur",
    "philosophy": "L'objet prolonge l'architecture, la technologie amplifie l'expérience, les images racontent une vision claire."
}

SEED_SERVICES = [
    {"title": "Space Planning", "description": "Conception et optimisation des espaces, visualisation et Immersion (3D/AR/VR)"},
    {"title": "Collaboration Asynchrone", "description": "Simplifier les workflows entre designers, ingénieurs, clients. Mesure d'impact sur les décisions design et vente."},
    {"title": "Data et AI", "description": "Structurer et exploiter les données design et usage. AI générative pour optimisation des plans et scénarios."}
]

SEED_PROJECTS = [
    {
        "id": 1,
        "slug": "suite-serenite",
        "title": "Sérénité",
        "subtitle": "Suite Hôtelière",
        "location": "Côte d'Azur, France",
        "year": "2026",
        "category": "Interior Design",
        "heroImage": "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/vj3dk2qp_Enscape_2026-01-26-14-36-48.png",
        "description": "Une suite hôtelière où le luxe rencontre la nature. Les boiseries chaleureuses dialoguent avec un mur de pierre brute spectaculaire, tandis que les baies vitrées ouvrent sur un balcon végétalisé baigné de lumière dorée.",
        "features": [
            {"title": "Mur Pierre Naturelle", "description": "Formation rocheuse authentique intégrée, pièce maîtresse sculpturale", "stat": "Unique"},
            {"title": "Boiseries Chêne", "description": "Panneaux muraux en chêne miel avec veinage naturel", "stat": "Premium"},
            {"title": "Balcon Végétalisé", "description": "Terrasse privative avec jardin suspendu luxuriant", "stat": "25 m²"}
        ],
        "materials": ["Chêne massif", "Pierre naturelle", "Verre trempé", "Lin naturel"],
        "gallery": [
            "https://customer-assets.emergentagent.com/job_6f92c830-0bfe-4c31-9041-4437941d9955/artifacts/36tssdv1_IMG_8653.JPG",
            "https://customer-assets.emergentagent.com/job_6f92c830-0bfe-4c31-9041-4437941d9955/artifacts/1obur1q7_IMG_8654.JPG",
            "https://customer-assets.emergentagent.com/job_6f92c830-0bfe-4c31-9041-4437941d9955/artifacts/t7mqp45k_IMG_8655.JPG"
        ],
        "colors": ["#D4A574", "#8B7355", "#E85D04", "#2D3A2E"],
        "services": ["Space planning", "APS/PRO/DCE", "3D (Sketchup/Enscape)", "Matériaux & détails"]
    },
    {
        "id": 2,
        "slug": "maison-edouard",
        "title": "Édouard",
        "subtitle": "Brasserie & Boulangerie",
        "location": "Bruxelles, Belgique",
        "year": "2025",
        "category": "Retail Design",
        "heroImage": "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/70jiw4uo_Enscape_2025-01-16-13-59-02.png",
        "description": "Maison Édouard réinvente la brasserie traditionnelle belge. Les murs vert sapin dialoguent avec les banquettes en cuir cognac et les boiseries chaleureuses, créant une atmosphère à la fois intemporelle et contemporaine.",
        "features": [
            {"title": "Murs Signature", "description": "Revêtement mural vert sapin avec lettrage doré artisanal", "stat": "Vert Forêt"},
            {"title": "Banquettes Cuir", "description": "Cuir naturel cognac capitonné, confort premium", "stat": "Sur mesure"},
            {"title": "Parquet Chêne", "description": "Parquet massif aspect vieilli pour une ambiance authentique", "stat": "250 m²"}
        ],
        "gallery": ["https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/70jiw4uo_Enscape_2025-01-16-13-59-02.png"],
        "colors": ["#2D4A3E", "#C4783A", "#D4A574", "#F5F0E6"],
        "materials": ["Cuir cognac", "Chêne vieilli", "Laiton brossé", "Peinture mate"],
        "services": ["Space planning", "APS/PRO/DCE", "3D (Sketchup/Enscape)", "Matériaux & détails"]
    },
    {
        "id": 3,
        "slug": "boulangerie-lulu",
        "title": "Lulu",
        "subtitle": "Boulangerie & Café",
        "location": "Bruxelles, Belgique",
        "year": "2024",
        "category": "Retail Design",
        "heroImage": "https://customer-assets.emergentagent.com/job_6f92c830-0bfe-4c31-9041-4437941d9955/artifacts/4b63a3sw_unnamed.jpg",
        "description": "Un espace gourmand où l'élégance parisienne rencontre la chaleur belge. Le sol en damier noir et blanc dialogue avec les boiseries claires et les accents de bleu profond.",
        "features": [
            {"title": "Sol Signature", "description": "Damier en marbre noir et blanc, motif intemporel réinterprété", "stat": "120 m²"},
            {"title": "Boiseries Sur Mesure", "description": "Chêne clair avec finitions laiton, conçues pour mettre en valeur les produits", "stat": "Artisanal"},
            {"title": "Éclairage Atmosphérique", "description": "Système LED intégré créant une ambiance chaleureuse et accueillante", "stat": "3000K"}
        ],
        "gallery": [],
        "colors": ["#0D1B2A", "#f5f5f0", "#2B4A6F", "#C9A86C"],
        "materials": ["Marbre Carrara", "Chêne clair", "Laiton poli", "Carrelage artisanal"],
        "services": ["Space planning", "APS/PRO/DCE", "3D (Sketchup/Enscape)", "Matériaux & détails"]
    },
    {
        "id": 4,
        "slug": "studio-da-tech",
        "title": "Studio DA & Tech",
        "subtitle": "Espace de Coworking",
        "location": "Paris, France",
        "year": "2025",
        "category": "Bureau",
        "heroImage": "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/kjnw5yx8_OFFICE%20FOUR.png",
        "description": "Un espace de travail contemporain où le bleu-vert profond rencontre le bois naturel. Les panneaux acoustiques beige et le parquet chevrons créent une atmosphère propice à la concentration et à la créativité.",
        "features": [
            {"title": "Parquet Chevrons", "description": "Chêne naturel posé en chevrons hongrois, élégance classique", "stat": "Premium"},
            {"title": "Mur Accent", "description": "Panneaux moulurés bleu-vert avec éclairage LED indirect", "stat": "Bleu Canard"},
            {"title": "Postes de Travail", "description": "Bureaux en bois massif avec gestion des câbles intégrée", "stat": "6 postes"}
        ],
        "gallery": [
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/kjnw5yx8_OFFICE%20FOUR.png",
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/5uiziv6e_OFFICE%20ONE.png",
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/jt3ekep2_OFFICE%20FOUR.png",
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/xkjigw3a_OFFICE%20ONE.png",
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/81h1k7mn_OFFICE%20THREE.png",
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/h3535nb6_OFFICE%20TWO.png"
        ],
        "colors": ["#3B5249", "#E8DFD0", "#C4A67C", "#F5F0E6"],
        "materials": ["Chêne chevrons", "Panneaux acoustiques", "Métal noir", "Tissu bouclé"],
        "services": ["Space planning", "APS/PRO/DCE", "3D (Sketchup/Enscape)", "Matériaux & détails"]
    },
    {
        "id": 5,
        "slug": "bazar-savant",
        "title": "Bazar Savant",
        "subtitle": "Boutique d'Ensemblière",
        "location": "Lyon, France",
        "year": "2024",
        "category": "Interior Design",
        "heroImage": "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/zvsicm76_ChatGPT%20Image%2025%20janv.%202026%2C%2016_29_26.png",
        "description": "Ancienne boutique d'ensemblière qui respire la passion du cinéma. Le cuir noir, le parquet chevrons et les techniques de rénovation médiévale créent un univers intemporel et immersif pour les artistes anachroniques.",
        "features": [
            {"title": "Espace Lounge", "description": "Canapé en cuir noir premium avec table basse en verre fumé", "stat": "VIP"},
            {"title": "Déco Cinéma", "description": "Éléments décoratifs inspirés du 7ème art", "stat": "Collector"},
            {"title": "Parquet Chevrons", "description": "Chêne clair posé en chevrons, techniques médiévales", "stat": "45 m²"}
        ],
        "gallery": ["https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/zvsicm76_ChatGPT%20Image%2025%20janv.%202026%2C%2016_29_26.png"],
        "colors": ["#C2452D", "#F5F5F5", "#C4A67C", "#E85D04"],
        "materials": ["Cuir noir premium", "Chêne chevrons", "Verre fumé", "Acier brossé"],
        "services": ["Space planning", "APS/PRO/DCE", "3D (Sketchup/Enscape)", "Matériaux & détails"]
    },
    {
        "id": 6,
        "slug": "n3-horizon",
        "title": "N.3 Horizon",
        "subtitle": "Yacht de Luxe",
        "location": "Monaco",
        "year": "2024",
        "category": "Nautical Design & Product Design",
        "heroImage": "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/0uz16oqr_Enscape_2025-10-14-11-26-00.png",
        "description": "L'intérieur de ce yacht incarne le summum du raffinement maritime. Les boiseries en teck, l'éclairage d'ambiance et les matériaux nobles créent un sanctuaire flottant.",
        "features": [
            {"title": "Boiseries Teck", "description": "Panneaux de teck massif avec veinage naturel, traitement marine", "stat": "Premium"},
            {"title": "Éclairage LED", "description": "Système d'ambiance intégré avec variation chromatique", "stat": "RGB"},
            {"title": "Cave à Cigares", "description": "Espace dédié avec contrôle d'humidité et température", "stat": "Sur mesure"}
        ],
        "gallery": [
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/0uz16oqr_Enscape_2025-10-14-11-26-00.png",
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/cmghhf49_Enscape_2025-10-14-11-47-25.png"
        ],
        "colors": ["#722F37", "#F5F0E6", "#2C1810", "#D4AF37"],
        "materials": ["Teck massif", "Cuir ivoire", "Laiton doré", "Verre teinté"],
        "services": ["Space planning", "APS/PRO/DCE", "3D (Sketchup/Enscape)", "Matériaux & détails"]
    },
    {
        "id": 7,
        "slug": "altitude-aframe",
        "title": "Altitude",
        "subtitle": "Refuge A-Frame",
        "location": "Alpes Suisses",
        "year": "2025",
        "category": "Retail Design",
        "heroImage": "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/4myq3y0d_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180558.png",
        "description": "Capteur de rosée minimaliste captant l'humidité du brouillard, stockant l'eau puis la redistribuant par goutte-à-goutte pour renforcer la biodiversité sur pentes vallonnées exposées aux incendies.",
        "features": [
            {"title": "Capteur de Rosée", "description": "Tissu poreux captant l'humidité du brouillard nocturne", "stat": "350 L/jour"},
            {"title": "Biodiversité", "description": "Irrigation goutte-à-goutte pour végétation sauvage et maîtrisée", "stat": "290 L"},
            {"title": "Structure Bois", "description": "Ossature poteau poutre en matériaux simples et durables", "stat": "100% Bois"}
        ],
        "gallery": [
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/p1sbig6b_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180706.png",
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/8epmvmra_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180729.png",
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/cw1hzfsy_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180706.png",
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/yiuseojc_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180729.png",
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/sj07vp3u_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180558.png",
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/zfmy5sk3_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180613.png",
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/4myq3y0d_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180558.png",
            "https://customer-assets.emergentagent.com/job_da9f0a9f-e94f-4264-86ca-a11327eaffef/artifacts/3kvgk9a0_Capture%20d%E2%80%99%C3%A9cran%202025-11-11%20180613.png"
        ],
        "colors": ["#1F3A93", "#8B9A7D", "#F5F5F0", "#3D3D3D"],
        "materials": ["Épicéa local", "Polycarbonate", "Tissu poreux", "Acier corten"],
        "services": ["Space planning", "APS/PRO/DCE", "3D (Sketchup/Enscape)", "Matériaux & détails"]
    }
]

# ============================================
# SEED FUNCTION
# ============================================

async def seed_initial_data():
    """Initialize database with portfolio data if empty"""
    config = await db.site_config.find_one({"_id": "site_config"})
    if config:
        logger.info("Database already seeded")
        return

    logger.info("Seeding initial data...")

    await db.site_config.insert_one({"_id": "site_config", **SEED_SITE_CONFIG})
    await db.hero.insert_one({"_id": "hero", **SEED_HERO})
    await db.about.insert_one({"_id": "about", **SEED_ABOUT})
    await db.services_list.insert_many([{**s} for s in SEED_SERVICES])
    await db.projects.insert_many([{**p} for p in SEED_PROJECTS])

    logger.info("Initial data seeded successfully")

# ============================================
# API ROUTES
# ============================================

@api_router.get("/")
async def root():
    return {"message": "EDGS Portfolio API"}

@api_router.get("/config")
async def get_config():
    config = await db.site_config.find_one({"_id": "site_config"}, {"_id": 0})
    if not config:
        raise HTTPException(status_code=404, detail="Config not found")
    return config

@api_router.get("/hero")
async def get_hero():
    hero = await db.hero.find_one({"_id": "hero"}, {"_id": 0})
    if not hero:
        raise HTTPException(status_code=404, detail="Hero not found")
    return hero

@api_router.get("/about")
async def get_about():
    about = await db.about.find_one({"_id": "about"}, {"_id": 0})
    if not about:
        raise HTTPException(status_code=404, detail="About not found")
    return about

@api_router.get("/services")
async def get_services():
    services = await db.services_list.find({}, {"_id": 0}).to_list(100)
    return services

@api_router.get("/projects")
async def get_projects():
    projects = await db.projects.find({}, {"_id": 0}).sort("year", -1).to_list(100)
    return projects

@api_router.get("/projects/{slug}")
async def get_project_by_slug(slug: str):
    project = await db.projects.find_one({"slug": slug}, {"_id": 0})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@api_router.post("/contact")
async def send_contact_message(message: ContactMessage):
    doc = {
        **message.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "read": False
    }
    result = await db.contact_messages.insert_one(doc)
    return {
        "id": str(result.inserted_id),
        "name": doc["name"],
        "email": doc["email"],
        "phone": doc["phone"],
        "subject": doc["subject"],
        "message": doc["message"],
        "created_at": doc["created_at"],
        "read": doc["read"]
    }

# ============================================
# APP SETUP
# ============================================

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await seed_initial_data()

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
