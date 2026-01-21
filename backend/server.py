from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'portfolio_db')]

# Create the main app
app = FastAPI(title="Portfolio API", version="1.0.0")

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
    name: str = "Studio Marquet"
    tagline: str = "Design Elements"
    description: str = "Création d'atmosphères uniques à travers le design d'intérieur"
    email: str = "contact@studiomarquet.com"
    phone: str = "+32 87 85 85 00"
    address: str = "Bruxelles, Belgique"
    social: SocialLinks = SocialLinks()

class HeroContent(BaseModel):
    title: str = "Créateur d'Atmosphères"
    subtitle: str = "Design d'intérieur sur mesure"
    description: str = "Nous transformons vos espaces en expériences uniques, alliant élégance intemporelle et design contemporain."
    image: str = "https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg"
    cta: str = "Découvrir nos projets"

class ServiceCreate(BaseModel):
    title: str
    description: str
    order: int = 0

class ServiceResponse(ServiceCreate):
    id: str

class AtmosphereCreate(BaseModel):
    title: str
    style: str
    description: str
    image: str
    colors: List[str] = []
    location: str
    order: int = 0

class AtmosphereResponse(AtmosphereCreate):
    id: str

class ProjectCreate(BaseModel):
    title: str
    category: str
    year: str
    location: str
    description: str
    images: List[str] = []
    featured: bool = False
    services: List[str] = []
    order: int = 0

class ProjectResponse(ProjectCreate):
    id: str

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: str
    message: str

class ContactMessageResponse(ContactMessage):
    id: str
    created_at: datetime
    read: bool = False

# ============================================
# HELPER FUNCTIONS
# ============================================

def serialize_doc(doc):
    """Convert MongoDB document to dict with string id"""
    if doc is None:
        return None
    doc["id"] = str(doc.pop("_id"))
    return doc

# ============================================
# SEED DATA
# ============================================

async def seed_initial_data():
    """Initialize database with default data if empty"""
    
    # Check if data exists
    config = await db.site_config.find_one({"_id": "site_config"})
    if config:
        logger.info("Database already seeded")
        return
    
    logger.info("Seeding initial data...")
    
    # Site Config
    await db.site_config.insert_one({
        "_id": "site_config",
        **SiteConfig().model_dump()
    })
    
    # Hero
    await db.hero.insert_one({
        "_id": "hero",
        **HeroContent().model_dump()
    })
    
    # Services
    services = [
        {"title": "Design d'Intérieur", "description": "Conception complète de vos espaces de vie et de travail", "order": 1},
        {"title": "Conseil en Matériaux", "description": "Sélection experte d'éléments décoratifs et de finitions", "order": 2},
        {"title": "Suivi de Projet", "description": "Accompagnement de A à Z jusqu'à la livraison finale", "order": 3}
    ]
    await db.services.insert_many(services)
    
    # Atmospheres
    atmospheres = [
        {
            "title": "Pâtisserie à Bruxelles",
            "style": "Douceur Pastel",
            "description": "Un espace gourmand où les teintes douces de rose poudré et vert menthe créent une atmosphère accueillante et raffinée.",
            "image": "https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg",
            "colors": ["#F5E6E0", "#E8D5D0", "#A8C5B5"],
            "location": "Bruxelles, Belgique",
            "order": 1
        },
        {
            "title": "Appartement à Valencia",
            "style": "Méditerranéen Moderne",
            "description": "Luminosité méditerranéenne avec des accents jaunes solaires et des moulures classiques réinterprétées.",
            "image": "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg",
            "colors": ["#F4E4BA", "#E8D4A0", "#C9B896"],
            "location": "Valencia, Espagne",
            "order": 2
        },
        {
            "title": "Concept Store à Hamburg",
            "style": "Contemporain Audacieux",
            "description": "Design retail moderne avec panneaux bleus audacieux et lignes épurées pour une expérience shopping unique.",
            "image": "https://images.pexels.com/photos/32922266/pexels-photo-32922266.jpeg",
            "colors": ["#2B4A6F", "#3D5A80", "#E0E1DD"],
            "location": "Hamburg, Allemagne",
            "order": 3
        },
        {
            "title": "Maison près de Rotterdam",
            "style": "Minimaliste Serein",
            "description": "Pureté des lignes et lumière naturelle pour un intérieur zen où chaque élément respire.",
            "image": "https://images.pexels.com/photos/26571206/pexels-photo-26571206.jpeg",
            "colors": ["#F5F5F0", "#E8E8E3", "#D4D4CF"],
            "location": "Rotterdam, Pays-Bas",
            "order": 4
        },
        {
            "title": "Appartement à Vienne",
            "style": "Néoclassique Élégant",
            "description": "Grandeur viennoise avec rosaces ornementales et corniches travaillées dans un écrin contemporain.",
            "image": "https://images.pexels.com/photos/35588942/pexels-photo-35588942.jpeg",
            "colors": ["#F8F4F0", "#E5DDD5", "#C4B8AC"],
            "location": "Vienne, Autriche",
            "order": 5
        },
        {
            "title": "Cottage au Danemark",
            "style": "Scandinave Chaleureux",
            "description": "L'essence du hygge danois avec des matériaux naturels et une palette de tons neutres apaisants.",
            "image": "https://images.pexels.com/photos/35585253/pexels-photo-35585253.jpeg",
            "colors": ["#E8E4DE", "#D4CFC6", "#B8B0A4"],
            "location": "Copenhague, Danemark",
            "order": 6
        }
    ]
    await db.atmospheres.insert_many(atmospheres)
    
    # Projects
    projects = [
        {
            "title": "Rénovation Haussmannienne",
            "category": "Résidentiel",
            "year": "2024",
            "location": "Paris, France",
            "description": "Transformation complète d'un appartement haussmannien avec intégration de moulures contemporaines et éclairage indirect.",
            "images": [
                "https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg",
                "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg"
            ],
            "featured": True,
            "services": ["Design d'intérieur", "Sélection matériaux", "Suivi de chantier"],
            "order": 1
        },
        {
            "title": "Boutique Hôtel",
            "category": "Hôtellerie",
            "year": "2024",
            "location": "Londres, UK",
            "description": "Création d'ambiances distinctes pour chaque étage, mêlant éléments classiques et touches contemporaines.",
            "images": [
                "https://images.pexels.com/photos/32922266/pexels-photo-32922266.jpeg",
                "https://images.pexels.com/photos/26571206/pexels-photo-26571206.jpeg"
            ],
            "featured": True,
            "services": ["Concept global", "Design mobilier", "Éclairage"],
            "order": 2
        },
        {
            "title": "Showroom Design",
            "category": "Commercial",
            "year": "2023",
            "location": "Milan, Italie",
            "description": "Espace d'exposition mettant en valeur les éléments décoratifs à travers des mises en scène immersives.",
            "images": [
                "https://images.pexels.com/photos/35588942/pexels-photo-35588942.jpeg",
                "https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg"
            ],
            "featured": False,
            "services": ["Scénographie", "Éclairage", "Signalétique"],
            "order": 3
        },
        {
            "title": "Villa Contemporaine",
            "category": "Résidentiel",
            "year": "2023",
            "location": "Barcelone, Espagne",
            "description": "Architecture intérieure minimaliste sublimée par des panneaux muraux texturés et profils lumineux.",
            "images": [
                "https://images.pexels.com/photos/35585253/pexels-photo-35585253.jpeg",
                "https://images.pexels.com/photos/207909/pexels-photo-207909.jpeg"
            ],
            "featured": False,
            "services": ["Architecture intérieure", "Mobilier sur mesure"],
            "order": 4
        }
    ]
    await db.projects.insert_many(projects)
    
    logger.info("Initial data seeded successfully")

# ============================================
# API ROUTES
# ============================================

@api_router.get("/")
async def root():
    return {"message": "Portfolio API - Bienvenue"}

# --- Site Config ---
@api_router.get("/config", response_model=SiteConfig)
async def get_config():
    config = await db.site_config.find_one({"_id": "site_config"})
    if not config:
        raise HTTPException(status_code=404, detail="Configuration non trouvée")
    config.pop("_id")
    return config

@api_router.put("/config", response_model=SiteConfig)
async def update_config(config: SiteConfig):
    await db.site_config.update_one(
        {"_id": "site_config"},
        {"$set": config.model_dump()},
        upsert=True
    )
    return config

# --- Hero ---
@api_router.get("/hero", response_model=HeroContent)
async def get_hero():
    hero = await db.hero.find_one({"_id": "hero"})
    if not hero:
        raise HTTPException(status_code=404, detail="Hero non trouvé")
    hero.pop("_id")
    return hero

@api_router.put("/hero", response_model=HeroContent)
async def update_hero(hero: HeroContent):
    await db.hero.update_one(
        {"_id": "hero"},
        {"$set": hero.model_dump()},
        upsert=True
    )
    return hero

# --- Services ---
@api_router.get("/services", response_model=List[ServiceResponse])
async def get_services():
    services = await db.services.find().sort("order", 1).to_list(100)
    return [serialize_doc(s) for s in services]

@api_router.post("/services", response_model=ServiceResponse)
async def create_service(service: ServiceCreate):
    result = await db.services.insert_one(service.model_dump())
    created = await db.services.find_one({"_id": result.inserted_id})
    return serialize_doc(created)

@api_router.put("/services/{service_id}", response_model=ServiceResponse)
async def update_service(service_id: str, service: ServiceCreate):
    result = await db.services.update_one(
        {"_id": ObjectId(service_id)},
        {"$set": service.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Service non trouvé")
    updated = await db.services.find_one({"_id": ObjectId(service_id)})
    return serialize_doc(updated)

@api_router.delete("/services/{service_id}")
async def delete_service(service_id: str):
    result = await db.services.delete_one({"_id": ObjectId(service_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service non trouvé")
    return {"message": "Service supprimé"}

# --- Atmospheres ---
@api_router.get("/atmospheres", response_model=List[AtmosphereResponse])
async def get_atmospheres():
    atmospheres = await db.atmospheres.find().sort("order", 1).to_list(100)
    return [serialize_doc(a) for a in atmospheres]

@api_router.post("/atmospheres", response_model=AtmosphereResponse)
async def create_atmosphere(atmosphere: AtmosphereCreate):
    result = await db.atmospheres.insert_one(atmosphere.model_dump())
    created = await db.atmospheres.find_one({"_id": result.inserted_id})
    return serialize_doc(created)

@api_router.put("/atmospheres/{atmosphere_id}", response_model=AtmosphereResponse)
async def update_atmosphere(atmosphere_id: str, atmosphere: AtmosphereCreate):
    result = await db.atmospheres.update_one(
        {"_id": ObjectId(atmosphere_id)},
        {"$set": atmosphere.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Atmosphère non trouvée")
    updated = await db.atmospheres.find_one({"_id": ObjectId(atmosphere_id)})
    return serialize_doc(updated)

@api_router.delete("/atmospheres/{atmosphere_id}")
async def delete_atmosphere(atmosphere_id: str):
    result = await db.atmospheres.delete_one({"_id": ObjectId(atmosphere_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Atmosphère non trouvée")
    return {"message": "Atmosphère supprimée"}

# --- Projects ---
@api_router.get("/projects", response_model=List[ProjectResponse])
async def get_projects(featured: Optional[bool] = None):
    query = {}
    if featured is not None:
        query["featured"] = featured
    projects = await db.projects.find(query).sort("order", 1).to_list(100)
    return [serialize_doc(p) for p in projects]

@api_router.get("/projects/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: str):
    project = await db.projects.find_one({"_id": ObjectId(project_id)})
    if not project:
        raise HTTPException(status_code=404, detail="Projet non trouvé")
    return serialize_doc(project)

@api_router.post("/projects", response_model=ProjectResponse)
async def create_project(project: ProjectCreate):
    result = await db.projects.insert_one(project.model_dump())
    created = await db.projects.find_one({"_id": result.inserted_id})
    return serialize_doc(created)

@api_router.put("/projects/{project_id}", response_model=ProjectResponse)
async def update_project(project_id: str, project: ProjectCreate):
    result = await db.projects.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": project.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Projet non trouvé")
    updated = await db.projects.find_one({"_id": ObjectId(project_id)})
    return serialize_doc(updated)

@api_router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    result = await db.projects.delete_one({"_id": ObjectId(project_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Projet non trouvé")
    return {"message": "Projet supprimé"}

# --- Contact ---
@api_router.post("/contact", response_model=ContactMessageResponse)
async def send_contact_message(message: ContactMessage):
    doc = {
        **message.model_dump(),
        "created_at": datetime.utcnow(),
        "read": False
    }
    result = await db.contact_messages.insert_one(doc)
    created = await db.contact_messages.find_one({"_id": result.inserted_id})
    return serialize_doc(created)

@api_router.get("/contact", response_model=List[ContactMessageResponse])
async def get_contact_messages():
    messages = await db.contact_messages.find().sort("created_at", -1).to_list(1000)
    return [serialize_doc(m) for m in messages]

@api_router.put("/contact/{message_id}/read")
async def mark_message_read(message_id: str):
    result = await db.contact_messages.update_one(
        {"_id": ObjectId(message_id)},
        {"$set": {"read": True}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Message non trouvé")
    return {"message": "Marqué comme lu"}

# ============================================
# APP SETUP
# ============================================

# Include the router
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
