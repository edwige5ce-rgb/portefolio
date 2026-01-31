import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects, siteConfig } from '../data/mock';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [scrollY, setScrollY] = useState(0);
  const sectionsRef = useRef([]);
  
  const project = projects.find(p => p.slug === slug);
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Get dominant color from project
  const dominantColor = project?.colors?.[0] || '#ffffff';

  useEffect(() => {
    window.scrollTo(0, 0);
    sectionsRef.current = [];
  }, [slug]);

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [slug]);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">Projet non trouvé</h1>
          <Link to="/" className="text-white/60 hover:text-white transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 100 ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-white font-semibold text-lg tracking-tight">
              {siteConfig.name}
            </Link>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Retour</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Apple Style */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Category Label */}
          <p 
            className="text-sm tracking-[0.2em] uppercase mb-6 animate-fadeInUp"
            style={{ color: dominantColor }}
          >
            {project.category}
          </p>
          
          {/* Project Title - Large */}
          <h1 
            className="text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-none mb-6 animate-fadeInUp animation-delay-200"
            style={{ color: dominantColor }}
          >
            {project.title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-white/70 font-light mb-4 animate-fadeInUp animation-delay-400">
            {project.subtitle}
          </p>
          
          {/* Year */}
          <p className="text-white/40 text-sm tracking-wider animate-fadeInUp animation-delay-400">
            {project.year}
          </p>
        </div>

        {/* Description - Centered */}
        <div className="max-w-3xl mx-auto text-center mb-20 animate-fadeInUp animation-delay-600">
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Hero Image - Floating */}
        <div className="w-full max-w-5xl mx-auto animate-fadeInUp animation-delay-800">
          <div className="relative">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-auto rounded-2xl shadow-2xl"
              style={{ 
                boxShadow: `0 50px 100px -20px ${dominantColor}20`
              }}
            />
          </div>
        </div>
      </section>

      {/* Project Info Cards */}
      <section className="py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div ref={addToRefs} className="reveal grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Location */}
            <div className="bg-white/5 rounded-2xl p-8">
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-2">Localisation</p>
              <p className="text-white text-xl">{project.location}</p>
            </div>
            
            {/* Year */}
            <div className="bg-white/5 rounded-2xl p-8">
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-2">Année</p>
              <p className="text-white text-xl">{project.year}</p>
            </div>
            
            {/* Category */}
            <div className="bg-white/5 rounded-2xl p-8">
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-2">Type</p>
              <p className="text-white text-xl">{project.category}</p>
            </div>
          </div>

          {/* Services */}
          <div ref={addToRefs} className="reveal mt-8">
            <div className="bg-white/5 rounded-2xl p-8">
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-4">Services</p>
              <div className="flex flex-wrap gap-3">
                {project.services.map((service, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 bg-white/10 text-white/80 text-sm rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Apple Style */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div ref={addToRefs} className="reveal text-center mb-20">
            <p 
              className="text-sm tracking-[0.2em] uppercase mb-4"
              style={{ color: dominantColor }}
            >
              Caractéristiques
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight">
              Les détails qui<br/>font la différence.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.features.map((feature, index) => (
              <div 
                key={index} 
                ref={addToRefs}
                className="reveal text-center"
              >
                <p 
                  className="text-6xl md:text-7xl font-bold mb-4"
                  style={{ color: dominantColor }}
                >
                  {feature.stat}
                </p>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div ref={addToRefs} className="reveal text-center mb-16">
            <p 
              className="text-sm tracking-[0.2em] uppercase mb-4"
              style={{ color: dominantColor }}
            >
              Palette
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
              Couleurs du projet
            </h2>
          </div>

          <div ref={addToRefs} className="reveal flex justify-center flex-wrap gap-8">
            {project.colors.map((color, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <div 
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
                  style={{ backgroundColor: color }}
                />
                <span className="text-white/40 text-sm font-mono">{color}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-32 bg-[#0a0a0a]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div ref={addToRefs} className="reveal text-center mb-16">
              <p 
                className="text-sm tracking-[0.2em] uppercase mb-4"
                style={{ color: dominantColor }}
              >
                Galerie
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
                Vues du projet
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((img, index) => (
                <div 
                  key={index} 
                  ref={addToRefs}
                  className={`reveal overflow-hidden rounded-2xl ${index === 0 ? 'md:col-span-2' : ''}`}
                >
                  <img
                    src={img}
                    alt={`${project.title} - Vue ${index + 1}`}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Project */}
      <section className="py-32 bg-black border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Link to={`/projet/${nextProject.slug}`} className="group block text-center">
            <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-6">Projet suivant</p>
            <h2 
              className="text-6xl md:text-8xl font-semibold tracking-tight mb-4 transition-colors duration-300"
              style={{ color: nextProject.colors?.[0] || '#ffffff' }}
            >
              {nextProject.title}
            </h2>
            <p className="text-xl text-white/50 mb-8">{nextProject.subtitle}</p>
            <div className="inline-flex items-center gap-3 text-white group-hover:gap-5 transition-all duration-300">
              <span className="font-medium">Voir le projet</span>
              <ArrowRight className="w-6 h-6" />
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="text-white font-semibold">{siteConfig.name}</Link>
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetail;
