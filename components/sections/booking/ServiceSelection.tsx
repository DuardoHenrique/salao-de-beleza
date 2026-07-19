'use client';

import { motion } from 'motion/react';
import { Button } from '../../ui/shared';

interface ServiceOption {
  id: string;
  label: string;
}

interface ServiceSelectionProps {
  service: string;
  setService: (id: string) => void;
  nextStep: () => void;
  servicesOptions: ServiceOption[];
}

export function ServiceSelection({
  service,
  setService,
  nextStep,
  servicesOptions,
}: ServiceSelectionProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col"
    >
      <h3 className="font-display text-2xl text-text-primary mb-6 text-center">
        1. Qual serviço você deseja?
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-grow">
        {servicesOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setService(opt.id)}
            className={`p-3 sm:p-4 text-center sm:text-left rounded-xl border transition-all duration-250 font-body text-xs sm:text-sm tracking-wide ${
              service === opt.id
                ? 'border-accent bg-accent/10 text-accent-dark font-medium shadow-sm'
                : 'border-text-muted/30 text-text-secondary hover:border-accent hover:text-accent'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="mt-8 flex w-full">
        <Button
          onClick={nextStep}
          disabled={!service}
          className="w-full disabled:opacity-50"
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  );
}
