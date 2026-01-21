import React, { useState } from 'react';
import { MapPin, Calendar, ArrowRight, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { projects } from '../data/mock';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', ...new Set(projects.map(p => p.category))];

  const filteredProjects = filterCategory === 'all'
    ? projects
    : projects.filter(p => p.category === filterCategory);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">Portfolio</p>
          <h1 className="text-5xl md:text-6xl font-light tracking-wide text-stone-900 mb-6">Projets & Réalisations</h1>
          <p className="text-lg text-stone-500 leading-relaxed">
            Découvrez nos réalisations et laissez-vous inspirer par nos transformations d'espaces.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-4 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filterCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterCategory(cat)}
              className={`rounded-none text-xs tracking-wider capitalize transition-all duration-300 ${
                filterCategory === cat
                  ? 'bg-stone-900 text-white border-stone-900 hover:bg-stone-800'
                  : 'bg-transparent text-stone-600 border-stone-300 hover:bg-stone-100'
              }`}
            >
              {cat === 'all' ? 'Tous' : cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group cursor-pointer ${index === 0 ? 'lg:col-span-2' : ''}`}
              onClick={() => setSelectedProject(project)}
            >
              <div className={`relative overflow-hidden mb-6 ${index === 0 ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}>
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {project.featured && (
                  <Badge className="absolute top-4 left-4 bg-white text-stone-900 rounded-none text-[10px] tracking-wider">
                    PROJET PHARE
                  </Badge>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                  <span className="text-white text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                    Voir le projet <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs tracking-[0.2em] uppercase text-stone-400">{project.category}</span>
                <span className="w-1 h-1 rounded-full bg-stone-300" />
                <span className="text-xs text-stone-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {project.year}
                </span>
                <span className="w-1 h-1 rounded-full bg-stone-300" />
                <span className="text-xs text-stone-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {project.location}
                </span>
              </div>
              <h2 className={`font-light tracking-wide text-stone-900 mb-3 group-hover:text-stone-700 transition-colors duration-300 ${index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                {project.title}
              </h2>
              <p className="text-stone-500 leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {selectedProject.images.map((img, i) => (
                <div key={i} className="aspect-video">
                  <img
                    src={img}
                    alt={`${selectedProject.title} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Content */}
            <div className="p-8 lg:p-12">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs tracking-[0.2em] uppercase text-stone-400">{selectedProject.category}</span>
                    <span className="w-1 h-1 rounded-full bg-stone-300" />
                    <span className="text-xs text-stone-400">{selectedProject.year}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-light tracking-wide text-stone-900">
                    {selectedProject.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-stone-500 mb-6">
                <MapPin className="w-4 h-4" />
                <span>{selectedProject.location}</span>
              </div>
              
              <p className="text-stone-600 leading-relaxed mb-8">
                {selectedProject.description}
              </p>
              
              <div className="border-t border-stone-200 pt-6">
                <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4">Services</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.services.map((service, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="rounded-none text-xs text-stone-600 border-stone-300"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
