'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { SectionHeader } from '../ui/shared';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = ['Todos', 'Cabelo', 'Maquiagem', 'Unhas', 'Noivas'];

const images = [
  { id: 1, category: 'Cabelo', src: '/assets/grid-cabelo1.webp' },
  { id: 2, category: 'Maquiagem', src: '/assets/grid-maquiagem1.webp' },
  { id: 13, category: 'Cabelo', src: '/assets/grid-salao.webp' },
  { id: 3, category: 'Noivas', src: '/assets/grid-noiva1.webp' },
  { id: 4, category: 'Unhas', src: '/assets/grid-unhas1.webp' },
  { id: 5, category: 'Cabelo', src: '/assets/grid-cabelo2.webp' },
  { id: 6, category: 'Maquiagem', src: '/assets/grid-maquiagem2.webp' },
  { id: 7, category: 'Noivas', src: '/assets/grid-noiva2.webp' },
  { id: 8, category: 'Unhas', src: '/assets/grid-unhas2.webp' },
  { id: 9, category: 'Cabelo', src: '/assets/grid-cabelo3.webp' },
  { id: 10, category: 'Maquiagem', src: '/assets/grid-maquiagem3.webp' },
  { id: 11, category: 'Noivas', src: '/assets/grid-noiva3.webp' },
  { id: 12, category: 'Unhas', src: '/assets/grid-unhas3.webp' },
];

export function Gallery() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeTab === 'Todos' ? images : images.filter(i => i.category === activeTab);

  return (
    <section id="galeria" className="py-[146px] bg-background px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          eyebrow="Portfólio"
          title="Transformações que falam por si"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-6 py-2 rounded-full border transition-all duration-250 text-xs md:text-sm tracking-[0.05em] uppercase font-medium cursor-pointer",
                activeTab === cat
                  ? "bg-accent text-white border-accent"
                  : "border-text-muted/30 text-text-secondary hover:border-accent hover:text-accent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Layout: Masonry Grid */}
        <div className="hidden sm:block columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          <AnimatePresence>
            {filtered.map((img) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid"
                onClick={() => setLightboxIndex(images.findIndex(i => i.id === img.id))}
              >
                <Image 
                  src={img.src} 
                  alt={img.category} 
                  width={400}
                  height={500}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-accent-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                  <span className="text-white font-body tracking-wider uppercase text-sm font-medium border border-white/50 px-6 py-3 rounded-full backdrop-blur-sm bg-white/10">
                    Ampliar
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile Layout: Horizontal Swipeable Carousel */}
        <div className="sm:hidden flex flex-col gap-4">
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-none -mx-6 px-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((img) => (
                <motion.div
                  layout
                  key={`mobile-${img.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-[82vw] shrink-0 snap-center relative overflow-hidden rounded-2xl aspect-[4/5] shadow-md border border-accent-light/10"
                  onClick={() => setLightboxIndex(images.findIndex(i => i.id === img.id))}
                >
                  <Image 
                    src={img.src} 
                    alt={img.category}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="82vw"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex justify-between items-center text-white z-10">
                    <span className="font-sans text-[10px] tracking-widest uppercase font-semibold">
                      {img.category}
                    </span>
                    <span className="font-sans text-[10px] opacity-70">
                      Toque para ampliar
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex justify-center items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-secondary/60 font-medium">
            <span>Arraste para o lado</span>
            <span className="animate-pulse">➔</span>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-text-primary hover:text-accent transition-colors z-50 cursor-pointer"
              onClick={() => setLightboxIndex(null)}
              aria-label="Fechar galeria"
            >
              <X size={32} />
            </button>

            <button 
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 p-2 text-text-primary hover:text-accent transition-colors z-50 bg-background/50 backdrop-blur-md rounded-full shadow-md cursor-pointer"
              onClick={() => setLightboxIndex((prev) => prev! > 0 ? prev! - 1 : images.length - 1)}
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="relative max-h-[85vh] max-w-full aspect-[4/5] w-[600px] h-[750px] md:w-[700px] md:h-[875px]">
              <Image 
                src={images[lightboxIndex].src}
                className="object-contain rounded-xl shadow-lg"
                alt="Visualização ampliada"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>

            <button 
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 p-2 text-text-primary hover:text-accent transition-colors z-50 bg-background/50 backdrop-blur-md rounded-full shadow-md cursor-pointer"
              onClick={() => setLightboxIndex((prev) => prev! < images.length - 1 ? prev! + 1 : 0)}
              aria-label="Próxima imagem"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
