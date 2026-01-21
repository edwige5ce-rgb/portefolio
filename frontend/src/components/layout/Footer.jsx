import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '../../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-light tracking-[0.3em]">
                {siteConfig.name.toUpperCase()}
              </h3>
              <p className="text-[10px] tracking-[0.4em] text-stone-400 uppercase mt-1">
                {siteConfig.tagline}
              </p>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-md">
              {siteConfig.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-6">Navigation</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-stone-300 hover:text-white transition-colors duration-300">Accueil</Link>
              <Link to="/catalogue" className="text-sm text-stone-300 hover:text-white transition-colors duration-300">Catalogue</Link>
              <Link to="/atmospheres" className="text-sm text-stone-300 hover:text-white transition-colors duration-300">Atmosphères</Link>
              <Link to="/projets" className="text-sm text-stone-300 hover:text-white transition-colors duration-300">Projets</Link>
              <Link to="/contact" className="text-sm text-stone-300 hover:text-white transition-colors duration-300">Contact</Link>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-sm text-stone-300 hover:text-white transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 text-sm text-stone-300 hover:text-white transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.phone}
              </a>
              <div className="flex items-start gap-3 text-sm text-stone-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {siteConfig.address}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-500">
            © {currentYear} {siteConfig.name}. Tous droits réservés.
          </p>
          <p className="text-xs text-stone-500">
            Développement durable • Qualité Premium • Design d'exception
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
