import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, siteConfig } from '../data/mock';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [scrollY, setScrollY] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
  
  const project = projects.find(p => p.slug === slug);
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Get dominant color from project
  const dominantColor = project?.colors?.[0] || '#ffffff';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Generate highlight texts for gallery
  const highlightTexts = [
    `${project.features[0]?.title || 'Design'}. ${project.features[0]?.description || project.description.slice(0, 80)}`,
    `${project.features[1]?.title || 'Matériaux'}. ${project.features[1]?.description || 'Sélection premium de matériaux nobles.'}`,
    `${project.features[2]?.title || 'Finitions'}. ${project.features[2]?.description || 'Attention aux détails et finitions haut de gamme.'}`,
    `${project.category}. ${project.subtitle} à ${project.location}.`,
    `Conception ${project.year}. Alliant esthétique et fonctionnalité.`,
    `Space planning. Organisation optimale pour un confort maximal.`,
    `Ambiance. Une atmosphère unique et personnalisée.`,
    `Lumière. Mise en valeur des volumes par un éclairage étudié.`
  ];

  // Filter unique images from gallery
  const uniqueGalleryImages = project?.gallery ? [...new Set(project.gallery)] : [];

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
          <p 
            className="text-sm tracking-[0.2em] uppercase mb-6 animate-fadeInUp"
            style={{ color: dominantColor }}
          >
            {project.category}
          </p>
          
          <h1 
            className="text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-none mb-6 animate-fadeInUp animation-delay-200"
            style={{ color: dominantColor }}
          >
            {project.title}
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/70 font-light mb-4 animate-fadeInUp animation-delay-400">
            {project.subtitle}
          </p>
          
          <p className="text-white/40 text-sm tracking-wider animate-fadeInUp animation-delay-400">
            {project.year}
          </p>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-20 animate-fadeInUp animation-delay-600">
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto animate-fadeInUp animation-delay-800">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-auto rounded-2xl shadow-2xl"
            style={{ boxShadow: `0 50px 100px -20px ${dominantColor}30` }}
          />
        </div>
      </section>

      {/* Project Info Cards */}
      <section className="py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 rounded-2xl p-8">
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-2">Localisation</p>
              <p className="text-white text-xl">{project.location}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-8">
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-2">Année</p>
              <p className="text-white text-xl">{project.year}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-8">
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-2">Type</p>
              <p className="text-white text-xl">{project.category}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-white/5 rounded-2xl p-8">
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-4">Services</p>
              <div className="flex flex-wrap gap-3">
                {project.services.map((service, i) => (
                  <span key={i} className="px-4 py-2 bg-white/10 text-white/80 text-sm rounded-full">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Apple Style with Image */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Les détails qui font la différence.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-7">
              <img
                src={project.gallery?.[Math.min(1, project.gallery.length - 1)] || project.heroImage}
                alt={project.title}
                className="w-full h-auto rounded-2xl"
              />
            </div>

            <div className="lg:col-span-5 space-y-8">
              {project.features.map((feature, index) => (
                <div key={index}>
                  <p className="text-white/50 text-xs mb-1">{feature.title}</p>
                  <p className="text-3xl md:text-4xl font-semibold" style={{ color: dominantColor }}>
                    {feature.stat}
                  </p>
                </div>
              ))}

              <div className="pt-6 border-t border-white/10">
                <p className="text-white/50 text-xs mb-3">Palette couleurs</p>
                <div className="flex flex-wrap gap-3">
                  {project.colors.map((color, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-full shadow-lg"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-white/40 text-[10px] font-mono">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {project.materials && (
                <div className="pt-4">
                  <p className="text-white/50 text-xs mb-3">Matériaux</p>
                  <div className="flex flex-wrap gap-2">
                    {project.materials.map((material, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-full"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/40 text-sm leading-relaxed">
              {project.features.map((f, i) => (
                <span key={i}>
                  <span className="text-white/60">{f.title}</span> — {f.description}
                  {i < project.features.length - 1 ? '. ' : '.'}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery - Apple Carousel Style */}
      {uniqueGalleryImages && uniqueGalleryImages.length > 0 && (
        <section className="py-32 bg-[#111]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
                Points forts.
              </h2>
              
              {/* Navigation Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (carouselRef.current) {
                      const scrollAmount = carouselRef.current.offsetWidth * 0.68;
                      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                      setActiveSlide(prev => Math.max(0, prev - 1));
                    }
                  }}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => {
                    if (carouselRef.current) {
                      const scrollAmount = carouselRef.current.offsetWidth * 0.68;
                      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                      setActiveSlide(prev => Math.min(uniqueGalleryImages.length - 1, prev + 1));
                    }
                  }}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div 
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-[16%] pb-8 cursor-grab active:cursor-grabbing"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
              onScroll={(e) => {
                const container = e.target;
                const scrollLeft = container.scrollLeft;
                const cardWidth = container.offsetWidth * 0.68;
                const newActiveSlide = Math.round(scrollLeft / cardWidth);
                setActiveSlide(newActiveSlide);
              }}
            >
              {uniqueGalleryImages.map((img, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 snap-center"
                  style={{ width: '68%' }}
                >
                  <div className="relative rounded-3xl overflow-hidden bg-[#1a1a1a]">
                    <div className="absolute top-0 left-0 right-0 z-10 p-6 md:p-8">
                      <p className="text-white text-sm md:text-lg leading-relaxed max-w-lg">
                        {highlightTexts[index % highlightTexts.length]}
                      </p>
                    </div>
                    
                    <div className="aspect-[16/10] relative">
                      <img
                        src={img}
                        alt={`${project.title} - Vue ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {uniqueGalleryImages.map((_, index) => (
                <button
                  onClick={() => {
                    if (carouselRef.current) {
                      const cardWidth = carouselRef.current.offsetWidth * 0.68;
                      carouselRef.current.scrollTo({ left: index * (cardWidth + 16), behavior: 'smooth' });
                      setActiveSlide(index);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeSlide ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
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
