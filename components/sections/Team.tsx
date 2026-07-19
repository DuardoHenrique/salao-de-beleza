'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { SectionHeader } from '../ui/shared';
import { Instagram } from 'lucide-react';

const team = [
  {
    name: 'Letícia Viana',
    role: 'Master Stylist & Visagista',
    image: '/assets/leticia-viana.webp'
  },
  {
    name: 'Bárbara Dias',
    role: 'Makeup Artist — Especialista em Noivas',
    image: '/assets/barbara-dias.webp'
  },
  {
    name: 'Marina Rouver',
    role: 'Colorista Senior',
    image: '/assets/marina-rouver.webp'
  },
  {
    name: 'Maiumi Akita',
    role: 'Nail Designer & Alongamentos',
    image: '/assets/Maiumi Akita.webp'
  }
];

export function Team() {
  return (
    <section id="equipe" className="py-24 bg-background px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          eyebrow="Nosso Talento"
          title="Conheça quem cuida de você"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5] bg-surface shadow-sm">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />
                <a 
                  href="#" 
                  className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent shadow-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out hover:bg-accent hover:text-white z-20"
                  title="Ver Instagram"
                  onClick={(e) => e.preventDefault()}
                >
                  <Instagram size={20} />
                </a>
              </div>
              <h3 className="font-display text-2xl text-text-primary mb-1 text-center md:text-left">{member.name}</h3>
              <p className="font-body text-sm font-light text-text-secondary text-center md:text-left">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
