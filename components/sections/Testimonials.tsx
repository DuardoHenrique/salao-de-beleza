'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { SectionHeader } from '../ui/shared';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MiniCarouselProps {
  images: string[];
  autoplayDelay: number;
}

function MiniCarousel({ images, autoplayDelay }: MiniCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [images.length, autoplayDelay]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div 
      className="relative w-full aspect-[4/5] rounded-xl overflow-hidden group/carousel bg-surface mb-6 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images */}
      <div className="w-full h-full relative">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <Image
              src={src}
              alt={`Resultado ${idx + 1}`}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-accent-dark shadow-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 hidden md:block cursor-pointer"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-accent-dark shadow-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 hidden md:block cursor-pointer"
        aria-label="Próximo"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer",
              idx === currentIndex ? "bg-accent w-3.5" : "bg-white/60"
            )}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const testimonialsData = [
  {
    cliente: {
      nome: "Marina Silva",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      servico: "Dia da Noiva",
      texto: '"A equipe captou exatamente a minha essência. A maquiagem ficou impecável nas fotos e durou a festa inteira sem derreter!"',
      estrelas: 5
    },
    imagens_resultado: [
      "/assets/comentarios-marina-silva1.webp",
      "/assets/comentarios-marina-silva2.webp",
      "/assets/comentarios-marina-silva3.webp"
    ],
    delay: 4500
  },
  {
    cliente: {
      nome: "Camila Castro",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
      servico: "Corte & Coloração",
      texto: '"Primeira vez que saio de um salão me sentindo eu mesma. O tom do iluminado ficou super natural, do jeito que pedi."',
      estrelas: 5
    },
    imagens_resultado: [
      "/assets/comentario-camila-castro1.webp",
      "/assets/comentario-camila-castro2.webp",
      "/assets/comentario-camila-castro3.webp"
    ],
    delay: 5300
  },
  {
    cliente: {
      nome: "Juliana Costa",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      servico: "Nail Art em Gel",
      texto: '"Detalhes que fazem a diferença. A esmaltação é perfeita e o ambiente do Studio te faz não querer ir embora."',
      estrelas: 5
    },
    imagens_resultado: [
      "/assets/comentario-juliana-costa1.webp",
      "/assets/comentario-juliana-costa2.webp",
      "/assets/comentario-juliana-costa3.webp"
    ],
    delay: 6100
  },
  {
    cliente: {
      nome: "Isabela Mendes",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
      servico: "Maquiagem Social",
      texto: '"A melhor experiência de maquiagem que já tive! Os produtos são de altíssima qualidade e o acabamento ficou extremamente natural."',
      estrelas: 5
    },
    imagens_resultado: [
      "/assets/comentario-isabele-mendes1.webp",
      "/assets/comentario-isabele-mendes2.webp",
      "/assets/comentario-isabele-mendes3.webp"
    ],
    delay: 4900
  },
  {
    cliente: {
      nome: "Beatriz Oliveira",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      servico: "Penteado & Production",
      texto: '"O penteado superou todas as minhas expectativas e durou a noite toda. Além disso, o atendimento no Studio é impecável."',
      estrelas: 5
    },
    imagens_resultado: [
      "/assets/comentario-beatriz-oliveira1.webp",
      "/assets/comentario-beatriz-oliveira2.webp",
      "/assets/comentario-beatriz-oliveira3.webp"
    ],
    delay: 5700
  }
];

export function Testimonials() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const maxIndex = Math.max(0, testimonialsData.length - visibleCount);

  // Keep currentIndex bounded when resizing
  useEffect(() => {
    if (currentIndex > maxIndex) {
      const frameId = requestAnimationFrame(() => {
        setCurrentIndex(maxIndex);
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [visibleCount, maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Autoplay for the main outer testimonials slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 9000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className="py-24 bg-background px-6 md:px-8 border-y border-accent-light/20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header and Controls Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <SectionHeader 
              eyebrow="Avaliações"
              title="O que nossas clientes dizem"
            />
          </div>
          <div className="flex gap-3 justify-start md:justify-end shrink-0">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-full border border-accent/20 bg-white hover:bg-accent hover:text-white text-text-primary shadow-sm transition-colors duration-300 cursor-pointer"
              aria-label="Depoimento Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3.5 rounded-full border border-accent/20 bg-white hover:bg-accent hover:text-white text-text-primary shadow-sm transition-colors duration-300 cursor-pointer"
              aria-label="Próximo Depoimento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sliding Carousel Area */}
        <div 
          className="overflow-hidden w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {testimonialsData.map((item, idx) => (
              <div
                key={idx}
                className="shrink-0 px-3 w-full"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: (idx % visibleCount) * 0.1, ease: "easeOut" }}
                  className="bg-white p-6 rounded-2xl shadow-md border border-accent-light/10 flex flex-col justify-between h-full"
                >
                  {/* Top: Stars and Text */}
                  <div className="mb-6">
                    <div className="flex text-accent mb-4 gap-1">
                      {Array.from({ length: item.cliente.estrelas }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="font-body text-[16px] font-light italic text-text-primary leading-relaxed min-h-[80px]">
                      {item.cliente.texto}
                    </p>
                  </div>

                  {/* Middle: Mini-carousel */}
                  <MiniCarousel 
                    images={item.imagens_resultado} 
                    autoplayDelay={item.delay}
                  />

                  {/* Base: Client Info */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-accent-light/10">
                    <div className="relative w-10 h-10 shrink-0">
                      <Image 
                        src={item.cliente.avatar} 
                        alt={item.cliente.nome} 
                        fill
                        loading="lazy"
                        className="rounded-full object-cover shadow-sm"
                        sizes="40px"
                      />
                    </div>
                    <div className="text-left">
                      <h5 className="font-body text-[14px] font-medium text-text-primary leading-none mb-1">
                        {item.cliente.nome}
                      </h5>
                      <span className="font-body text-[12px] font-normal uppercase tracking-[0.08em] text-accent-dark block">
                        {item.cliente.servico}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
                idx === currentIndex ? "bg-accent w-6" : "bg-accent/20 hover:bg-accent/40"
              )}
              aria-label={`Ir para grupo ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
