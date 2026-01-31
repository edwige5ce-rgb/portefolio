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

  useEffect(() => {
    window.scrollTo(0, 0);
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div 
          className="absolute inset-0 transition-transform duration-100"
          style={{ transform: `scale(${1 + scrollY * 0.0002})` }}
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 w-full pb-20 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-white/50 text-sm tracking-[0.2em] uppercase mb-4 animate-fadeInUp">
              {project.category} — {project.year}
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold text-white tracking-tight leading-none mb-4 animate-fadeInUp animation-delay-200">
              {project.title}
            </h1>
            <p className="text-2xl md:text-3xl text-white/70 font-light animate-fadeInUp animation-delay-400">
              {project.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div ref={addToRefs} className="reveal">
              <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-6">Description</p>
              <p className="text-2xl md:text-3xl text-white leading-relaxed">
                {project.description}
              </p>
            </div>
            <div ref={addToRefs} className="reveal">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-2">Localisation</p>
                  <p className="text-white text-lg">{project.location}</p>
                </div>
                <div>
                  <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-2">Année</p>
                  <p className="text-white text-lg">{project.year}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-3">Services</p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service, i) => (
                      <span key={i} className="px-4 py-2 bg-white/10 text-white/80 text-sm rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Apple Style Cards */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div ref={addToRefs} className="reveal mb-20">
            <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-4">Caractéristiques</p>
            <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight">
              Les détails qui<br/>font la différence.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.features.map((feature, index) => (
              <div 
                key={index} 
                ref={addToRefs}
                className="reveal bg-white/5 rounded-3xl p-10 hover:bg-white/10 transition-colors duration-300"
              >
                <p className="text-5xl md:text-6xl font-bold text-white mb-4">{feature.stat}</p>
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
          <div ref={addToRefs} className="reveal mb-16">
            <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-4">Palette</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
              Couleurs du projet
            </h2>
          </div>

          <div ref={addToRefs} className="reveal flex flex-wrap gap-6">
            {project.colors.map((color, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <div 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-lg"
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
            <div ref={addToRefs} className="reveal mb-16">
              <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-4">Galerie</p>
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
          <Link to={`/projet/${nextProject.slug}`} className="group block">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-4">Projet suivant</p>
                <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight group-hover:text-white/80 transition-colors">
                  {nextProject.title}
                </h2>
                <p className="text-xl text-white/50 mt-2">{nextProject.subtitle}</p>
              </div>
              <div className="flex items-center gap-3 text-white group-hover:gap-5 transition-all duration-300">
                <span className="font-medium">Voir le projet</span>
                <ArrowRight className="w-6 h-6" />
              </div>
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
