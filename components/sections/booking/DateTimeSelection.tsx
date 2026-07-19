'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/shared';
import { cn } from '@/lib/utils';

interface DateTimeSelectionProps {
  date: string;
  setDate: (date: string) => void;
  time: string;
  setTime: (time: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  timeSlots: string[];
  nextDays: Date[];
}

export function DateTimeSelection({
  date,
  setDate,
  time,
  setTime,
  nextStep,
  prevStep,
  timeSlots,
  nextDays,
}: DateTimeSelectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col"
    >
      <h3 className="font-display text-2xl text-text-primary mb-6 text-center">
        2. Escolha data e horário
      </h3>

      {/* Hide scrollbars inline CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />

      {/* Compact date slider with premium arrows */}
      <div className="relative flex items-center mb-8 px-1 sm:px-4">
        {/* Left arrow button (1 click) */}
        <button
          type="button"
          onClick={() => scroll('left')}
          className="p-2 sm:p-2.5 rounded-full bg-background border border-text-muted/20 text-text-secondary hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-200 active:scale-95 shadow-sm mr-2 flex items-center justify-center cursor-pointer select-none"
          aria-label="Anterior"
        >
          <ChevronLeft size={16} className="stroke-[2.5]" />
        </button>

        {/* Days Scrollable List */}
        <div
          ref={scrollContainerRef}
          className="flex-grow flex gap-2 sm:gap-3 overflow-x-auto pb-1 no-scrollbar snap-x scroll-smooth"
        >
          {nextDays.map((d, i) => {
            const dateStr = d.toISOString().split('T')[0];
            const isSunday = d.getDay() === 0;
            return (
              <button
                type="button"
                key={i}
                disabled={isSunday}
                onClick={() => setDate(dateStr)}
                className={cn(
                  "flex-shrink-0 w-[60px] h-[64px] sm:w-[80px] sm:h-[84px] flex flex-col items-center justify-center rounded-xl border transition-all duration-200 snap-start select-none cursor-pointer",
                  date === dateStr
                    ? "bg-accent text-white border-accent shadow-md"
                    : isSunday
                    ? "opacity-40 cursor-not-allowed border-text-muted/20 text-text-muted bg-surface/50"
                    : "border-text-muted/30 text-text-secondary hover:border-accent hover:text-accent bg-surface/10"
                )}
              >
                <span className="text-[10px] sm:text-xs uppercase tracking-widest mb-0.5 sm:mb-1 font-body">
                  {d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}
                </span>
                <span className="text-lg sm:text-2xl font-display font-normal">
                  {d.getDate()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right arrow button (1 click) */}
        <button
          type="button"
          onClick={() => scroll('right')}
          className="p-2 sm:p-2.5 rounded-full bg-background border border-text-muted/20 text-text-secondary hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-200 active:scale-95 shadow-sm ml-2 flex items-center justify-center cursor-pointer select-none"
          aria-label="Próximo"
        >
          <ChevronRight size={16} className="stroke-[2.5]" />
        </button>
      </div>

      <div className="flex-grow">
        {date && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-400">
            <p className="font-body text-sm font-medium mb-4 text-text-secondary text-center">
              Horários disponíveis para {date.split('-').reverse().join('/')}:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {timeSlots.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={cn(
                    "px-6 py-3 rounded-xl border font-body text-sm transition-all",
                    time === t
                      ? "bg-text-primary text-white border-text-primary shadow-md"
                      : "border-text-muted/30 text-text-secondary hover:border-accent hover:text-accent"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
        <Button variant="ghost" onClick={prevStep} className="w-full sm:w-auto">
          Voltar
        </Button>
        <Button
          onClick={nextStep}
          disabled={!date || !time}
          className="w-full sm:w-auto disabled:opacity-50"
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  );
}
