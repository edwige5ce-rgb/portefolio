import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { siteConfig } from '../data/mock';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi (sera remplacé par le backend)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">Parlons de votre projet</p>
          <h1 className="text-5xl md:text-6xl font-light tracking-wide text-stone-900 mb-6">Contact</h1>
          <p className="text-lg text-stone-500 leading-relaxed">
            Vous avez un projet en tête ? N'hésitez pas à nous contacter.
            Nous serons ravis de discuter de vos idées et de vous accompagner.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-light tracking-wide text-stone-900 mb-8">Informations</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-stone-600" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-1">Email</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-stone-900 hover:text-stone-600 transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-stone-600" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-1">Téléphone</p>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-stone-900 hover:text-stone-600 transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-stone-600" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-1">Adresse</p>
                  <p className="text-stone-900">{siteConfig.address}</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 aspect-video bg-stone-200 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg"
                alt="Location"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 lg:p-12">
            <h2 className="text-2xl font-light tracking-wide text-stone-900 mb-8">Envoyez-nous un message</h2>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-light text-stone-900 mb-2">Message envoyé !</h3>
                <p className="text-stone-500">Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs tracking-wider uppercase text-stone-500">
                      Nom complet *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="rounded-none border-stone-200 focus:ring-stone-900 focus:border-stone-900"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs tracking-wider uppercase text-stone-500">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-none border-stone-200 focus:ring-stone-900 focus:border-stone-900"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs tracking-wider uppercase text-stone-500">
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="rounded-none border-stone-200 focus:ring-stone-900 focus:border-stone-900"
                      placeholder="+32 xxx xxx xxx"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-xs tracking-wider uppercase text-stone-500">
                      Sujet *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="rounded-none border-stone-200 focus:ring-stone-900 focus:border-stone-900"
                      placeholder="Objet de votre message"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs tracking-wider uppercase text-stone-500">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="rounded-none border-stone-200 focus:ring-stone-900 focus:border-stone-900 resize-none"
                    placeholder="Décrivez votre projet..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-none py-6 text-sm tracking-wider uppercase transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Envoyer le message
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
