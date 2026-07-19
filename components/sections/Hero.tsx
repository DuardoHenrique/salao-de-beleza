'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Button } from '../ui/shared';

const slides = [
  {
    id: 1,
    image: '/assets/hero-cabelo.webp',
    headline: 'Cada fio, uma intenção.',
    subheadline: 'Cortes, coloração e tratamentos que realçam quem você já é.',
    cta: 'Agendar',
    target: 'agendamento'
  },
  {
    id: 2,
    image: '/assets/hero-maquiagem.webp',
    headline: 'O olhar que te entrega.',
    subheadline: 'Make para o dia a dia, eventos e ocasiões que pedem impacto.',
    cta: 'Agendar',
    target: 'agendamento'
  },
  {
    id: 3,
    image: '/assets/hero-unhas.webp',
    headline: 'Detalhes que completam.',
    subheadline: 'Esmaltação, gel e nail art feitos com precisão e cuidado.',
    cta: 'Agendar',
    target: 'agendamento'
  },
  {
    id: 4,
    image: '/assets/hero-noiva.webp',
    headline: 'O dia mais bonito merece o melhor preparo.',
    subheadline: 'Pacotes completos para noivas que querem se sentir únicas.',
    cta: 'Conhecer pacote noiva',
    target: 'noivas'
  }
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative min-h-[90vh] md:min-h-screen pt-24 pb-12 flex items-center overflow-hidden bg-background"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full h-full">
        <div className="relative w-full h-[80vh] md:h-[80vh] flex flex-col-reverse md:flex-row items-center bg-surface overflow-hidden rounded-3xl shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={current + '-text'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1] }}
              className="w-full md:w-1/2 px-6 py-8 sm:p-10 md:p-16 flex flex-col justify-center h-[58%] md:h-full z-10 bg-surface"
            >
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight mb-4 md:mb-6">
                {slides[current].headline}
              </h1>
              <p className="font-body text-text-secondary text-sm sm:text-base md:text-lg mb-6 md:mb-10 max-w-md font-light leading-relaxed">
                {slides[current].subheadline}
              </p>
              <div>
                <Button onClick={() => scrollTo(slides[current].target)}>
                  {slides[current].cta}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={current + '-img'}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.0, 0.0, 0.2, 1] }}
              className="w-full md:w-1/2 h-[42%] md:h-full relative overflow-hidden"
            >
              <Image 
                src={slides[current].image}
                alt={slides[current].headline}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-3 mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-400 ease-out ${
                current === idx ? 'w-10 bg-accent' : 'w-2 bg-text-muted/50 hover:bg-accent-light'
              }`}
              aria-label={`Ir para o slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
