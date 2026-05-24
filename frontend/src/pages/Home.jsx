import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { siteConfig as mockSiteConfig, heroContent as mockHeroContent, projects as mockProjects, services as mockServices, aboutContent as mockAboutContent } from '../data/mock';
import CustomCursor from '../components/CustomCursor';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionsRef = useRef([]);
  const [siteConfig] = useState(mockSiteConfig);
  const [heroContent] = useState(mockHeroContent);
  const [aboutContent] = useState(mockAboutContent);
  const [services] = useState(Array.isArray(mockServices) ? mockServices : []);
  const [projectsData] = useState(Array.isArray(mockProjects) ? mockProjects : []);

  // Tri des projets par année
  const projects = useMemo(() => 
    [...projectsData].sort((a, b) => parseInt(b.year) - parseInt(a.year)),
    [projectsData]
  );

  // Fixer l'image principale validée en fond pour l'immersion
  const staticHeroImage = projects[0]?.heroImage;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -100px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const aboutImage = projects.length > 2 ? projects[2].heroImage : projects[0]?.heroImage;

  return (
    <div className="bg-black min-h-screen selection:bg-white selection:text-black">
      {/* Activation du curseur personnalisé haut de gamme */}
      <CustomCursor />

      {/* Navigation Épurée */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrollY > 50 ? 'bg-black/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`} data-testid="main-nav">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="text-white uppercase font-light text-base tracking-[0.2em]" data-testid="nav-logo">
              {siteConfig.name}
            </Link>
            <div className="hidden md:flex items-center gap-12">
              <a href="#projets" className="text-xs uppercase tracking-[0.15em] text-white/60 hover:text-white transition-opacity duration-300" data-testid="nav-projets">Projets</a>
              <a href="#about" className="text-xs uppercase tracking-[0.15em] text-white/60 hover:text-white transition-opacity duration-300" data-testid="nav-about">Studio</a>
              <Link to="/contact" className="text-xs uppercase tracking-[0.15em] text-white/60 hover:text-white transition-opacity duration-300" data-testid="nav-contact">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Manifeste */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        <div 
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `scale(${1 + scrollY * 0.0002})` }}
        >
          {staticHeroImage && (
            <img
              src={staticHeroImage}
              alt="Studio Main Identity"
              className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <p className="text-white/40 text-xs tracking-[0.4em] uppercase mb-8 animate-fadeInUp">
            {heroContent.subtitle}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-normal leading-tight mb-8">
            {heroContent.title}
          </h1>
          <div className="w-12 h-px bg-white/20 mx-auto mb-8" />
          <p className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
            {heroContent.description}
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30">
          <ChevronDown className="w-5 h-5 text-white" />
        </div>
      </section>

      {/* Projects Showcase - Grille Géométrique Asymétrique */}
      <section id="projets" className="py-48 bg-black">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div ref={addToRefs} className="reveal mb-32 border-b border-white/5 pb-12">
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">Selected Works</p>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
              Architecture & Data Design
            </h2>
          </div>

          <div className="space-y-64">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <Link 
                  to={`/projet/${project.slug}`} 
                  key={project.id}
                  ref={addToRefs}
                  data-cursor="Voir"
                  className="reveal block group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    
                    {/* Conteneur Image rectiligne */}
                    <div className={`lg:col-span-7 relative overflow-hidden ${
                      !isEven ? 'lg:order-2' : ''
                    }`}>
                      <div className="aspect-[16/10] overflow-hidden bg-neutral-900">
                        <img
                          src={project.heroImage}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-102 filter grayscale hover:grayscale-0"
                        />
                      </div>
                    </div>

                    {/* Conteneur Contenu */}
                    <div className={`lg:col-span-5 ${!isEven ? 'lg:order-1' : ''}`}>
                      <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-3">
                        {project.category} &mdash; {project.year}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight mb-4">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/40 font-light tracking-wide mb-2">{project.subtitle}</p>
                      <p className="text-xs text-white/30 tracking-widest uppercase mb-6">{project.location}</p>
                      <p className="text-white/60 font-light text-sm leading-relaxed mb-8 max-w-md">
                        {project.description}
                      </p>
                      <div className="inline-flex items-center gap-3 text-white/80 border-b border-white/20 pb-1 group-hover:text-white group-hover:border-white transition-all duration-300">
                        <span className="text-xs uppercase tracking-widest font-light">Explorer</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section Épurée */}
      <section className="py-48 bg-[#050505] border-t border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div ref={addToRefs} className="reveal mb-32">
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">Expertise</p>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
              L'Ingénierie Spatiale
            </h2>
          </div>

          <div ref={addToRefs} className="reveal grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col items-start">
                <span className="text-xs font-light text-white/20 mb-6 font-mono">0{index + 1} //</span>
                <h3 className="text-xl font-light text-white tracking-wide mb-4">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-light">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section Manifeste */}
      <section id="about" className="py-48 bg-black">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            <div ref={addToRefs} className="lg:col-span-6 reveal">
              <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Manifesto</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-tight mb-12 leading-relaxed">
                {aboutContent.philosophy}
              </h2>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-light text-white border-b border-white/20 pb-1 hover:border-white transition-all duration-300"
              >
                Engager un dialogue
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {aboutImage && (
              <div ref={addToRefs} className="lg:col-span-6 reveal">
                <div className="relative">
                  <div className="aspect-square bg-neutral-900 overflow-hidden">
                    <img
                      src={aboutImage}
                      alt="Studio Atmosphere"
                      className="w-full h-full object-cover opacity-60 grayscale"
                    />
                  </div>
                  <div className="absolute -bottom-8 -left-8 bg-[#0a0a0a] border border-white/5 p-8 max-w-xs">
                    <p className="text-4xl font-light text-white tracking-tight mb-1">{aboutContent.years}</p>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-light">{aboutContent.yearsLabel}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Footer Minimaliste de Prestige */}
      <footer className="py-24 bg-black border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="md:col-span-2">
              <h3 className="text-base uppercase tracking-[0.2em] font-light text-white mb-6">{siteConfig.name}</h3>
              <p className="text-white/40 text-xs leading-relaxed max-w-sm font-light">{siteConfig.description}</p>
            </div>
            <div>
              <h4 className="text-white/30 text-xs uppercase tracking-[0.15em] mb-6">Index</h4>
              <div className="flex flex-col gap-3">
                <a href="#projets" className="text-xs text-white/50 hover:text-white transition-colors font-light">Projets</a>
                <a href="#about" className="text-xs text-white/50 hover:text-white transition-colors font-light">Le Studio</a>
                <Link to="/contact" className="text-xs text-white/50 hover:text-white transition-colors font-light">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white/30 text-xs uppercase tracking-[0.15em] mb-6">Inquiries</h4>
              <div className="flex flex-col gap-3 text-xs text-white/50 font-light">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">{siteConfig.email}</a>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">{siteConfig.phone}</a>
                <p className="text-white/30 leading-relaxed mt-2">{siteConfig.address}</p>
              </div>
            </div>
          </div>
          <div className="mt-24 pt-8 border-t border-white/5 text-left text-white/20 text-[10px] uppercase tracking-widest font-mono">
            © {new Date().getFullYear()} {siteConfig.name}. Permanent Architecture & Technologies.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
