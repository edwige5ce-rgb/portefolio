import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { siteConfig as mockSiteConfig, heroContent as mockHeroContent, projects as mockProjects, services as mockServices, aboutContent as mockAboutContent } from '../data/mock';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionsRef = useRef([]);
  const [siteConfig] = useState(mockSiteConfig);
  const [heroContent] = useState(mockHeroContent);
  const [aboutContent] = useState(mockAboutContent);
  const [services] = useState(Array.isArray(mockServices) ? mockServices : []);
  const [projectsData] = useState(Array.isArray(mockProjects) ? mockProjects : []);

  // Sort projects by year (newest to oldest)
  const projects = useMemo(() => 
    [...projectsData].sort((a, b) => parseInt(b.year) - parseInt(a.year)),
    [projectsData]
  );

  // Collect all hero images for the slideshow
  const heroImages = useMemo(() => 
    projects.map(p => p.heroImage).filter(Boolean),
    [projects]
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Background slideshow every 3 seconds
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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
    <div className="bg-black min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 100 ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent'
      }`} data-testid="main-nav">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-white font-semibold text-lg tracking-tight" data-testid="nav-logo">
              {siteConfig.name}
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#projets" className="text-sm text-white/80 hover:text-white transition-colors" data-testid="nav-projets">Projets</a>
              <a href="#about" className="text-sm text-white/80 hover:text-white transition-colors" data-testid="nav-about">À propos</a>
              <Link to="/contact" className="text-sm text-white/80 hover:text-white transition-colors" data-testid="nav-contact">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        <div 
          className="absolute inset-0 transition-transform duration-100"
          style={{ transform: `scale(${1 + scrollY * 0.0003})` }}
        >
          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slideshow ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              style={{ opacity: index === currentSlide ? 0.4 : 0 }}
              data-testid={`hero-slide-${index}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="text-white/60 text-sm tracking-[0.3em] uppercase mb-6 animate-fadeInUp">
            {heroContent.subtitle}
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-semibold text-white tracking-tight leading-none mb-8 animate-fadeInUp animation-delay-200" data-testid="hero-title">
            {heroContent.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-light max-w-xl mx-auto animate-fadeInUp animation-delay-400">
            {heroContent.description}
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/40" />
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projets" className="py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div ref={addToRefs} className="reveal mb-20">
            <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-4">Portfolio</p>
            <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight">
              Les Projets
            </h2>
          </div>

          <div className="space-y-40">
            {projects.map((project, index) => (
              <Link 
                to={`/projet/${project.slug}`} 
                key={project.id}
                ref={addToRefs}
                className="reveal block group"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  <div className={`relative overflow-hidden rounded-3xl ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className={`${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                    <p 
                      className="text-sm tracking-[0.2em] uppercase mb-4"
                      style={{ color: project.colors?.[0] || '#ffffff' }}
                    >
                      {project.category} — {project.year}
                    </p>
                    <h3 
                      className="text-4xl md:text-6xl font-semibold tracking-tight mb-4"
                      style={{ color: project.colors?.[0] || '#ffffff' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xl text-white/60 mb-2">{project.subtitle}</p>
                    <p className="text-white/40 mb-8">{project.location}</p>
                    <p className={`text-white/70 text-lg leading-relaxed mb-8 max-w-md ${
                      index % 2 === 1 ? 'lg:ml-auto' : ''
                    }`}>
                      {project.description}
                    </p>
                    <div className={`flex items-center gap-2 text-white group-hover:gap-4 transition-all duration-300 ${
                      index % 2 === 1 ? 'lg:justify-end' : ''
                    }`}>
                      <span className="text-sm font-medium">Voir le projet</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div ref={addToRefs} className="reveal text-center mb-20">
            <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-4">Expertise</p>
            <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight">
              Ce que nous faisons
            </h2>
          </div>

          <div ref={addToRefs} className="reveal grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="w-px h-20 bg-white/20 mx-auto mb-8" />
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-white/50">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div ref={addToRefs} className="reveal">
              <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-4">Notre vision</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-8 leading-tight">
                {aboutContent.philosophy}
              </h2>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-3 text-white font-medium hover:gap-5 transition-all duration-300"
              >
                Discutons de votre projet
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            {aboutImage && (
              <div ref={addToRefs} className="reveal">
                <div className="relative">
                  <div className="aspect-square rounded-3xl overflow-hidden">
                    <img
                      src={aboutImage}
                      alt="About"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-8 -left-8 bg-white text-black p-8 rounded-2xl max-w-xs">
                    <p className="text-4xl font-bold mb-2">{aboutContent.years}</p>
                    <p className="text-gray-600">{aboutContent.yearsLabel}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-semibold text-white mb-4">{siteConfig.name}</h3>
              <p className="text-white/50 mb-6 max-w-md">{siteConfig.description}</p>
            </div>
            <div>
              <h4 className="text-white/40 text-sm uppercase tracking-wider mb-4">Navigation</h4>
              <div className="flex flex-col gap-3">
                <a href="#projets" className="text-white/60 hover:text-white transition-colors">Projets</a>
                <a href="#about" className="text-white/60 hover:text-white transition-colors">À propos</a>
                <Link to="/contact" className="text-white/60 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white/40 text-sm uppercase tracking-wider mb-4">Contact</h4>
              <div className="flex flex-col gap-3 text-white/60">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">{siteConfig.email}</a>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">{siteConfig.phone}</a>
                <p>{siteConfig.address}</p>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/30 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
