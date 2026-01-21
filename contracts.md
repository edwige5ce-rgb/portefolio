# API Contracts - Portfolio Design d'Intérieur

## Overview
Backend FastAPI pour gérer le contenu modifiable du portfolio.

## Collections MongoDB

### 1. `site_config`
Configuration générale du site (document unique)
```json
{
  "_id": "site_config",
  "name": "Studio Marquet",
  "tagline": "Design Elements",
  "description": "Création d'atmosphères uniques...",
  "email": "contact@studiomarquet.com",
  "phone": "+32 87 85 85 00",
  "address": "Bruxelles, Belgique",
  "social": { "instagram": "#", "linkedin": "#", "pinterest": "#" }
}
```

### 2. `hero`
Contenu hero section (document unique)
```json
{
  "_id": "hero",
  "title": "Créateur d'Atmosphères",
  "subtitle": "Design d'intérieur sur mesure",
  "description": "...",
  "image": "url",
  "cta": "Découvrir nos projets"
}
```

### 3. `services`
```json
{
  "_id": "ObjectId",
  "title": "Design d'Intérieur",
  "description": "...",
  "order": 1
}
```

### 4. `atmospheres`
```json
{
  "_id": "ObjectId",
  "title": "Pâtisserie à Bruxelles",
  "style": "Douceur Pastel",
  "description": "...",
  "image": "url",
  "colors": ["#F5E6E0", "#E8D5D0", "#A8C5B5"],
  "location": "Bruxelles, Belgique",
  "order": 1
}
```

### 5. `projects`
```json
{
  "_id": "ObjectId",
  "title": "Rénovation Haussmannienne",
  "category": "Résidentiel",
  "year": "2024",
  "location": "Paris, France",
  "description": "...",
  "images": ["url1", "url2"],
  "featured": true,
  "services": ["Design d'intérieur", "..."],
  "order": 1
}
```

### 6. `contact_messages`
```json
{
  "_id": "ObjectId",
  "name": "...",
  "email": "...",
  "phone": "...",
  "subject": "...",
  "message": "...",
  "created_at": "datetime",
  "read": false
}
```

## API Endpoints

### Site Config
- `GET /api/config` - Récupérer config
- `PUT /api/config` - Modifier config

### Hero
- `GET /api/hero` - Récupérer hero
- `PUT /api/hero` - Modifier hero

### Services
- `GET /api/services` - Liste services
- `POST /api/services` - Créer service
- `PUT /api/services/{id}` - Modifier service
- `DELETE /api/services/{id}` - Supprimer service

### Atmosphères
- `GET /api/atmospheres` - Liste atmosphères
- `POST /api/atmospheres` - Créer atmosphère
- `PUT /api/atmospheres/{id}` - Modifier atmosphère
- `DELETE /api/atmospheres/{id}` - Supprimer atmosphère

### Projets
- `GET /api/projects` - Liste projets
- `GET /api/projects?featured=true` - Projets en vedette
- `POST /api/projects` - Créer projet
- `PUT /api/projects/{id}` - Modifier projet
- `DELETE /api/projects/{id}` - Supprimer projet

### Contact
- `POST /api/contact` - Envoyer message
- `GET /api/contact` - Liste messages (admin)

## Frontend Integration
- Remplacer imports de `mock.js` par appels API via axios
- Utiliser useEffect pour charger les données au mount
- Gérer états loading/error
