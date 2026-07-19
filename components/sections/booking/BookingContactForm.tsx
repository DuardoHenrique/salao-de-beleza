'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { Button } from '../../ui/shared';
import { cn } from '@/lib/utils';

// Validação com Zod
const contactSchema = z.object({
  name: z.string().min(3, 'Por favor, insira seu nome completo (mínimo 3 letras).'),
  phone: z.string().refine((val) => {
    const digits = val.replace(/\D/g, '');
    return digits.length === 11;
  }, {
    message: 'Por favor, insira um WhatsApp válido com DDD e 9 dígitos (ex: (11) 99999-9999).',
  }),
  obs: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface BookingContactFormProps {
  defaultValues: { name: string; phone: string; obs: string };
  onSubmit: (data: ContactFormData) => void;
  prevStep: () => void;
}

export function BookingContactForm({
  defaultValues,
  onSubmit,
  prevStep,
}: BookingContactFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const phoneValue = watch('phone');

  // Máscara de telefone aplicada no onChange
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, '');
    const limitedDigits = digits.slice(0, 11);

    let masked = '';
    if (limitedDigits.length > 0) {
      masked = `(${limitedDigits.slice(0, 2)}`;
    }
    if (limitedDigits.length > 2) {
      masked += `) ${limitedDigits.slice(2, 7)}`;
    }
    if (limitedDigits.length > 7) {
      masked += `-${limitedDigits.slice(7, 11)}`;
    }

    setValue('phone', masked, { shouldValidate: true });
  };

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col"
    >
      <h3 className="font-display text-2xl text-text-primary mb-6 text-center">
        3. Confirme seus dados
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 font-body flex-grow">
        <div>
          <label htmlFor="booking-name" className="block text-xs font-medium text-text-secondary mb-1 uppercase tracking-wider">
            Nome completo
          </label>
          <input
            id="booking-name"
            type="text"
            className={cn(
              "w-full p-4 bg-surface border rounded-xl focus:outline-none focus:border-accent transition-colors",
              errors.name ? "border-error focus:border-error" : "border-text-muted/30"
            )}
            {...register('name')}
          />
          {errors.name && (
            <span className="text-xs text-error mt-1 block">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="booking-phone" className="block text-xs font-medium text-text-secondary mb-1 uppercase tracking-wider">
            WhatsApp
          </label>
          <input
            id="booking-phone"
            type="tel"
            placeholder="(11) 90000-0000"
            value={phoneValue}
            className={cn(
              "w-full p-4 bg-surface border rounded-xl focus:outline-none transition-colors",
              errors.phone ? "border-error focus:border-error" : "border-text-muted/30 focus:border-accent"
            )}
            {...register('phone', {
              onChange: handlePhoneChange
            })}
          />
          {errors.phone && (
            <span className="text-xs text-error mt-1 block">
              {errors.phone.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="booking-obs" className="block text-xs font-medium text-text-secondary mb-1 uppercase tracking-wider">
            Observações (opcional)
          </label>
          <textarea
            id="booking-obs"
            rows={2}
            placeholder="Algum detalhe especial? Ex: evento à noite..."
            className="w-full p-4 bg-surface border border-text-muted/30 rounded-xl focus:outline-none focus:border-accent transition-colors resize-none"
            {...register('obs')}
          />
        </div>

        <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-4">
          <Button variant="ghost" onClick={prevStep} className="w-full sm:w-auto">
            Voltar
          </Button>
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            Confirmar Agendamento
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
