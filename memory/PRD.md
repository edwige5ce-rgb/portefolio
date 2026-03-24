# EDGS Design Portfolio - PRD

## Original Problem Statement
Portfolio personnel pour travaux de design d'intérieur, style Apple (thème sombre, grande typographie, ambiance cinématique). Nom de domaine : edgs-design.com.

## Architecture
- **Frontend**: React + TailwindCSS + React Router
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Data flow**: Frontend fetches from API, fallback to mock.js

## Core Pages
- **Home** (`/`): Hero slideshow, projects sorted by year, services, about
- **Project Detail** (`/projet/:slug`): Hero, stats, features, gallery carousel
- **Contact** (`/contact`): Form connected to backend API

## API Endpoints
- `GET /api/config` - Site configuration
- `GET /api/hero` - Hero section content
- `GET /api/about` - About section content
- `GET /api/services` - Services list
- `GET /api/projects` - All projects (sorted by year)
- `GET /api/projects/{slug}` - Single project by slug
- `POST /api/contact` - Submit contact message

## What's Been Implemented
- [x] Apple-style dark theme design
- [x] Hero background image slideshow (3s interval, cross-fade)
- [x] Projects sorted by year (oldest to newest)
- [x] Full backend API with MongoDB
- [x] Database seeding with all 7 projects
- [x] Contact form connected to backend
- [x] Project detail pages with interactive carousel
- [x] Inter font integration

## Backlog
- [ ] Admin panel for content management
- [ ] Image upload functionality
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Content from AVPV01 PDF (user to provide)
