import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { heroContent, atmospheres, projects, services } from '../data/mock';

const Home = () => {
  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroContent.image}
            alt="Interior Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <p className="text-sm tracking-[0.4em] uppercase mb-6 animate-fade-in-up opacity-80">
            {heroContent.subtitle}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wider mb-8 animate-fade-in-up animation-delay-200">
            {heroContent.title}
          </h1>
          <p className="text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto text-white/80 animate-fade-in-up animation-delay-400">
            {heroContent.description}
          </p>
          <Link to="/projets">
            <Button
              size="lg"
              className="bg-white text-stone-900 hover:bg-stone-100 rounded-none px-10 py-6 text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 animate-fade-in-up animation-delay-600"
            >
              {heroContent.cta}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/60" />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="w-px h-16 bg-stone-300 mx-auto mb-8 group-hover:h-20 transition-all duration-500" />
              <h3 className="text-xl font-light tracking-wider mb-4 text-stone-900">
                {service.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Atmospheres */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-3">Inspirations</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-wide text-stone-900">Atmosphères</h2>
            </div>
            <Link
              to="/atmospheres"
              className="mt-6 md:mt-0 text-sm tracking-wider uppercase text-stone-500 hover:text-stone-900 transition-colors duration-300 flex items-center gap-2 group"
            >
              Toutes les atmosphères
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {atmospheres.slice(0, 3).map((atm) => (
              <Link
                key={atm.id}
                to="/atmospheres"
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden mb-6">
                  <img
                    src={atm.image}
                    alt={atm.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-2">{atm.style}</p>
                <h3 className="text-xl font-light tracking-wide text-stone-900 mb-2">{atm.title}</h3>
                <p className="text-sm text-stone-500">{atm.location}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-3">Portfolio</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-wide text-stone-900">Projets Récents</h2>
            </div>
            <Link
              to="/projets"
              className="mt-6 md:mt-0 text-sm tracking-wider uppercase text-stone-500 hover:text-stone-900 transition-colors duration-300 flex items-center gap-2 group"
            >
              Tous les projets
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.filter(p => p.featured).map((project) => (
              <Link
                key={project.id}
                to="/projets"
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden mb-6">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs tracking-[0.2em] uppercase text-stone-400">{project.category}</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300" />
                  <span className="text-xs text-stone-400">{project.year}</span>
                </div>
                <h3 className="text-2xl font-light tracking-wide text-stone-900 mb-2">{project.title}</h3>
                <p className="text-sm text-stone-500">{project.location}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-stone-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Votre projet</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-8">Créons ensemble votre atmosphère</h2>
          <p className="text-stone-400 mb-12 leading-relaxed">
            Chaque espace raconte une histoire. Partagez-nous votre vision et transformons-la en réalité.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-white text-stone-900 hover:bg-stone-100 rounded-none px-10 py-6 text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
            >
              Nous contacter
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
