'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { SectionHeader, Button } from '../ui/shared';
import { Sparkles, Crown, Heart, MessageCircle, Calendar } from 'lucide-react';

const pillars = [
  {
    icon: Sparkles,
    title: 'Teste de Maquiagem',
    desc: 'Simulamos o look completo antes do grande dia. Você aprova cada detalhe com antecedência.',
    cta: 'Agendar teste',
    action: 'teste-make'
  },
  {
    icon: Crown,
    title: 'Dia da Noiva',
    desc: 'Atendimento exclusivo, prioritário e completo: cabelo, make e unhas no mesmo espaço.',
    cta: 'Montar pacote',
    action: 'pacote-noiva'
  },
  {
    icon: Heart,
    title: 'Pacote Madrinhas',
    desc: 'Cuide também das mulheres ao seu lado. Pacotes especiais para grupos.',
    cta: 'Consultar',
    action: 'pacote-madrinhas'
  }
];

const timelineSteps = [
  {
    step: 1,
    icone: MessageCircle,
    titulo: "1. Consultoria",
    descricao: "Entendemos seu estilo e vestido."
  },
  {
    step: 2,
    icone: Sparkles,
    titulo: "2. O Teste",
    descricao: "Aprovação de cada detalhe do visual."
  },
  {
    step: 3,
    icone: Calendar,
    titulo: "3. Cronograma",
    descricao: "Alinhamento de horários com sua equipe de foto/vídeo."
  },
  {
    step: 4,
    icone: Heart,
    titulo: "4. O Grande Dia",
    descricao: "Você relaxa, nós cuidamos do resto."
  }
];

export function Brides() {
  const handleAction = (service: string) => {
    const el = document.getElementById('agendamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('select-service', { detail: { service } }));
      }, 500);
    }
  };

  return (
    <section id="noivas" className="relative py-24 bg-surface-warm px-6 md:px-8 overflow-hidden">
      {/* Background Image with low opacity */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <Image 
          src="/assets/background-noiva.webp"
          alt=""
          fill
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="relative max-w-7xl mx-auto z-10">
        <SectionHeader 
          eyebrow="Especial Noivas"
          title="Para a noiva que você sempre sonhou ser"
          subtitle="Cada detalhe pensado para o dia mais importante da sua vida."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-white/95 backdrop-blur-md p-10 pb-12 rounded-[24px] border-t-[3px] border-accent flex flex-col shadow-sm hover:shadow-md hover:shadow-accent/5 transition-all duration-400 ease-inout"
              >
                <div className="mb-6">
                  <IconComponent className="text-accent w-8 h-8" strokeWidth={1.2} />
                </div>
                <h3 className="font-display text-3xl text-text-primary mb-4 font-light">
                  {pillar.title}
                </h3>
                <p className="font-body text-text-secondary font-light mb-8 flex-grow leading-relaxed">
                  {pillar.desc}
                </p>
                <button 
                  onClick={() => handleAction(pillar.action)}
                  className="w-fit border border-accent text-accent hover:bg-accent hover:text-white rounded-full px-8 py-3 text-xs uppercase tracking-[0.08em] font-medium transition-all duration-250 ease-inout bg-white/50 cursor-pointer"
                >
                  {pillar.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline (A Jornada da Noiva) */}
        <div className="mt-24 relative flex flex-col items-center w-full">
          {/* Visual Signature */}
          <div className="w-10 h-[2px] bg-accent mb-4" />
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary text-center">
            A JORNADA DA NOIVA
          </span>

          {/* Timeline Steps Container */}
          <div className="relative w-full mt-16 px-4 md:px-0">
            {/* Desktop horizontal connecting line */}
            <div className="absolute top-7 left-[12.5%] right-[12.5%] h-[1px] bg-accent/30 hidden lg:block" />
            
            {/* Mobile vertical connecting line */}
            <div className="absolute left-11 lg:left-7 top-7 bottom-7 w-[1px] bg-accent/30 lg:hidden" />

            {/* Steps Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
              {timelineSteps.map((step, idx) => {
                const IconComponent = step.icone;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: idx * 0.08, ease: "easeOut" }}
                    className="flex flex-row lg:flex-col lg:items-center lg:text-center gap-6"
                  >
                    {/* Circular Icon Container */}
                    <div className="w-14 h-14 rounded-full border border-accent bg-surface-warm flex items-center justify-center shrink-0 relative z-10 shadow-sm">
                      <IconComponent className="text-accent w-6 h-6" strokeWidth={1.2} />
                    </div>

                    {/* Text content */}
                    <div className="flex flex-col pt-1.5 lg:pt-0">
                      <h4 className="font-body text-[20px] font-medium text-text-primary leading-snug mb-1">
                        {step.titulo}
                      </h4>
                      <p className="font-body text-[14px] font-normal text-text-secondary leading-relaxed">
                        {step.descricao}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Button onClick={() => handleAction('pacote-noiva')} className="px-10 py-5 text-base shadow-accent">
            Quero conhecer meu pacote noiva
          </Button>
        </div>
      </div>
    </section>
  );
}
