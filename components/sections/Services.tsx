'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { SectionHeader, Button } from '../ui/shared';
import { X } from 'lucide-react';

const services = [
  {
    id: 'cabelo',
    title: 'Cabelo',
    tagline: 'Do corte ao brilho perfeito',
    image: '/assets/cabelo.webp',
    description: 'Nossa equipe de hair stylists analisa seu perfil, visagismo e a saúde dos fios para criar cortes, cores e texturas perfeitos.',
    options: ['Corte Feminino', 'Coloração Global', 'Mechas / Iluminação', 'Tratamentos Avançados', 'Escova'],
    price: 'A partir de R$ 120'
  },
  {
    id: 'maquiagem',
    title: 'Maquiagem',
    tagline: 'Realce a sua beleza natural',
    image: '/assets/maquiagem.webp',
    description: 'Técnicas modernas e produtos premium para uma make de alta durabilidade, respeitando seus traços naturais.',
    options: ['Make Social', 'Make Editorial', 'Preparação de Pele Premium', 'Cílios Postiços'],
    price: 'A partir de R$ 180'
  },
  {
    id: 'unhas',
    title: 'Unhas',
    tagline: 'Detalhes que fazem a diferença',
    image: '/assets/unhas.webp',
    description: 'Cuidado completo com cutículas, hidratação profunda e técnicas duradouras para mãos e pés impecáveis.',
    options: ['Manicure e Pedicure', 'Esmaltação em Gel', 'Alongamento', 'Nail Art Minimalista'],
    price: 'A partir de R$ 60'
  },
  {
    id: 'pacote-noiva',
    title: 'Pacote Noiva',
    tagline: 'Um dia especial, do início ao fim',
    image: '/assets/pacote-noiva.webp',
    description: 'Acompanhamento completo no grande dia, com cronograma exclusivo e dedicação total da nossa equipe.',
    options: ['Cabelo e Make do Dia', 'Teste Prévio', 'Assessoria para Vestir', 'Lanche Especial'],
    price: 'Sob Consulta'
  }
];

export function Services() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const selectedService = services.find(s => s.id === selectedServiceId);

  const handleBook = (serviceId: string) => {
    setSelectedServiceId(null);
    const el = document.getElementById('agendamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('select-service', { detail: { service: serviceId } }));
      }, 500);
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedServiceId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedServiceId]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedServiceId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="servicos" className="py-24 bg-surface px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          eyebrow="Nossos Serviços"
          title="Escolha o que você precisa hoje"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 items-start">
          {services.map((svc) => (
            <motion.div 
              key={svc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-background rounded-2xl overflow-hidden shadow-sm flex flex-col h-full border border-accent-light/10 hover:shadow-md transition-shadow duration-300"
            >
              <div 
                className="h-48 cursor-pointer group relative overflow-hidden"
                onClick={() => setSelectedServiceId(svc.id)}
              >
                <Image 
                  src={svc.image}
                  alt={svc.title}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-250 z-10" />
              </div>
              
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-display text-2xl text-text-primary mb-1">{svc.title}</h3>
                  <p className="font-body text-sm text-text-secondary font-light leading-relaxed">{svc.tagline}</p>
                </div>
                
                <button 
                  onClick={() => setSelectedServiceId(svc.id)}
                  className="mt-6 text-left text-sm uppercase tracking-[0.05em] font-medium text-accent hover:text-accent-dark transition-colors duration-250 cursor-pointer self-start"
                >
                  Ver detalhes
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modern Premium Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedServiceId(null)}
            />

            {/* Modal Box Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-background rounded-3xl overflow-hidden shadow-2xl z-10 border border-accent-light/15"
            >
              {/* Service Header Image with Close Button inside */}
              <div className="h-56 md:h-64 relative overflow-hidden">
                <Image 
                  src={selectedService.image}
                  alt={selectedService.title}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 512px"
                />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedServiceId(null)}
                  className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md transition-all duration-200 cursor-pointer flex items-center justify-center border border-white/10 shadow-lg"
                  aria-label="Fechar detalhes"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Service Info Content */}
              <div className="p-6 md:p-8">
                <span className="text-[11px] font-body uppercase tracking-[0.15em] text-accent font-semibold block mb-1">
                  Serviço Especializado
                </span>
                <h3 className="font-display text-3xl text-text-primary mb-2">
                  {selectedService.title}
                </h3>
                <p className="font-body text-sm font-light text-text-secondary mb-6 leading-relaxed">
                  {selectedService.tagline}
                </p>

                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="font-body text-xs font-semibold uppercase tracking-wider text-text-primary mb-2">
                      Sobre o Serviço
                    </h4>
                    <p className="font-body text-[15px] font-light text-text-secondary leading-relaxed">
                      {selectedService.description}
                    </p>
                  </div>

                  {/* Highlights/Options */}
                  <div>
                    <h4 className="font-body text-xs font-semibold uppercase tracking-wider text-text-primary mb-2.5">
                      Opções inclusas / Especialidades
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[14px] font-light text-text-secondary">
                      {selectedService.options.map((opt, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer (Price & Action) */}
                  <div className="pt-6 border-t border-accent-light/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
                    <div>
                      <span className="font-body text-[11px] uppercase tracking-wider text-text-muted block mb-0.5">
                        Investimento
                      </span>
                      <span className="font-body text-lg font-medium text-accent">
                        {selectedService.price}
                      </span>
                    </div>
                    
                    <Button 
                      variant="primary" 
                      className="px-8 py-3 w-full sm:w-auto"
                      onClick={() => handleBook(selectedService.id)}
                    >
                      Agendar agora
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
