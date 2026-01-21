import React, { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { atmospheres } from '../data/mock';

const Atmospheres = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">Inspirations</p>
          <h1 className="text-5xl md:text-6xl font-light tracking-wide text-stone-900 mb-6">Atmosphères</h1>
          <p className="text-lg text-stone-500 leading-relaxed">
            Explorez nos univers d'inspiration. Chaque atmosphère est une invitation au voyage,
            une exploration des possibilités infinies du design d'intérieur.
          </p>
        </div>
      </section>

      {/* Atmospheres Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {atmospheres.map((atm, index) => (
              <div
                key={atm.id}
                className={`group cursor-pointer ${index === 0 ? 'lg:col-span-2' : ''}`}
                onMouseEnter={() => setHoveredId(atm.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}>
                  <img
                    src={atm.image}
                    alt={atm.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
                    <div className="flex items-center gap-2 text-white/70 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{atm.location}</span>
                    </div>
                    <p className="text-xs tracking-[0.2em] uppercase text-white/60 mb-2">{atm.style}</p>
                    <h2 className={`font-light tracking-wide text-white mb-4 ${index === 0 ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                      {atm.title}
                    </h2>
                    <p className={`text-white/80 leading-relaxed mb-6 ${index === 0 ? 'max-w-2xl' : 'max-w-md'} ${
                      hoveredId === atm.id ? 'opacity-100' : 'opacity-0 lg:opacity-100'
                    } transition-opacity duration-500`}>
                      {atm.description}
                    </p>
                    
                    {/* Color Palette */}
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        {atm.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border-2 border-white/30 transition-transform duration-300 hover:scale-110"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors duration-300">
                        <span className="text-sm tracking-wider">Explorer</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Notre philosophie</p>
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-stone-900 mb-8 leading-relaxed">
            "Chaque espace possède une âme. Notre rôle est de la révéler à travers
            une harmonie parfaite entre matériaux, lumière et émotion."
          </h2>
          <div className="w-16 h-px bg-stone-300 mx-auto" />
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">Engagement</p>
              <h2 className="text-4xl font-light tracking-wide text-stone-900 mb-6">Développement Durable</h2>
              <p className="text-stone-500 leading-relaxed mb-6">
                Notre engagement envers la planète se traduit par des choix concrets :
                matériaux recyclés, processus de fabrication éco-responsables,
                et une vision circulaire de notre production.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-light text-stone-900 mb-2">85%</p>
                  <p className="text-sm text-stone-500">Matériaux recyclés</p>
                </div>
                <div>
                  <p className="text-3xl font-light text-stone-900 mb-2">100%</p>
                  <p className="text-sm text-stone-500">Énergie verte</p>
                </div>
                <div>
                  <p className="text-3xl font-light text-stone-900 mb-2">0</p>
                  <p className="text-sm text-stone-500">Déchets en décharge</p>
                </div>
                <div>
                  <p className="text-3xl font-light text-stone-900 mb-2">-40%</p>
                  <p className="text-sm text-stone-500">Empreinte carbone</p>
                </div>
              </div>
            </div>
            <div className="aspect-square bg-stone-200 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/35588942/pexels-photo-35588942.jpeg"
                alt="Sustainability"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Atmospheres;
