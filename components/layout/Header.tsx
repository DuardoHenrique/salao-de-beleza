'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/shared';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Serviços', id: 'servicos' },
    { label: 'Noivas', id: 'noivas' },
    { label: 'Galeria', id: 'galeria' },
    { label: 'Equipe', id: 'equipe' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="font-display text-3xl font-normal tracking-wide cursor-pointer text-text-primary"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Élara
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-body text-text-secondary hover:text-accent transition-colors duration-250 uppercase tracking-[0.05em] cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <Button onClick={() => scrollTo('agendamento')} className="px-6 py-3 ml-4">
            Agendar Agora
          </Button>
        </nav>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden text-text-primary p-2 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={cn(
          "fixed inset-0 bg-background z-40 transition-transform duration-400 ease-inout transform md:hidden flex flex-col pt-24 px-6",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-6 items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-xl font-display text-text-primary hover:text-accent transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <Button onClick={() => scrollTo('agendamento')} className="mt-8 w-full max-w-xs">
            Agendar Agora
          </Button>
        </nav>
      </div>
    </header>
  );
}
