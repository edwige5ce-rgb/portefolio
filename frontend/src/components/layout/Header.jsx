import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../../data/mock';
import { Button } from '../ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/catalogue', label: 'Catalogue' },
    { path: '/atmospheres', label: 'Atmosphères' },
    { path: '/projets', label: 'Projets' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className={`text-2xl font-light tracking-[0.3em] transition-colors duration-300 ${
              isScrolled ? 'text-stone-900' : 'text-white'
            }`}>
              {siteConfig.name.toUpperCase()}
            </span>
            <span className={`text-[10px] tracking-[0.4em] uppercase transition-colors duration-300 ${
              isScrolled ? 'text-stone-500' : 'text-white/70'
            }`}>
              {siteConfig.tagline}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wider uppercase transition-all duration-300 relative group ${
                  isScrolled ? 'text-stone-600 hover:text-stone-900' : 'text-white/80 hover:text-white'
                } ${isActive(link.path) ? (isScrolled ? 'text-stone-900' : 'text-white') : ''}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-300 ${
                  isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                } ${isScrolled ? 'bg-stone-900' : 'bg-white'}`} />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-stone-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-stone-900' : 'text-white'}`} />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 mt-6' : 'max-h-0'
        }`}>
          <nav className="flex flex-col gap-4 pb-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm tracking-wider uppercase py-2 transition-colors duration-300 ${
                  isScrolled ? 'text-stone-600 hover:text-stone-900' : 'text-white/80 hover:text-white'
                } ${isActive(link.path) ? (isScrolled ? 'text-stone-900 font-medium' : 'text-white font-medium') : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
