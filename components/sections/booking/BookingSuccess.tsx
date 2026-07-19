'use client';

import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/shared';

interface BookingSuccessProps {
  serviceLabel: string;
  date: string;
  time: string;
  reset: () => void;
}

export function BookingSuccess({
  serviceLabel,
  date,
  time,
  reset,
}: BookingSuccessProps) {
  const formattedDate = date.split('-').reverse().join('/');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="text-center py-16"
    >
      <div className="w-24 h-24 bg-[#2E7D5B]/10 text-success rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
        <CheckCircle2 size={48} strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-4xl text-text-primary mb-4">
        Agendamento Confirmado!
      </h3>
      <p className="font-body text-text-secondary mb-10 text-lg font-light leading-relaxed max-w-lg mx-auto">
        Sua reserva para <strong className="text-text-primary font-medium">{serviceLabel}</strong> foi recebida.
        <br />
        Dia {formattedDate} às {time}.
        <br />
        <br />
        Você receberá uma mensagem no WhatsApp em breve com os detalhes finais.
      </p>
      <Button variant="outline" onClick={reset}>
        Fazer novo agendamento
      </Button>
    </motion.div>
  );
}
