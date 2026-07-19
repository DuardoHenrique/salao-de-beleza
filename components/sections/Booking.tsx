'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { SectionHeader } from '../ui/shared';
import { ServiceSelection } from './booking/ServiceSelection';
import { DateTimeSelection } from './booking/DateTimeSelection';
import { BookingContactForm } from './booking/BookingContactForm';
import { BookingSuccess } from './booking/BookingSuccess';
import { cn } from '@/lib/utils';

const servicesOptions = [
  { id: 'cabelo', label: 'Cabelo' },
  { id: 'maquiagem', label: 'Maquiagem' },
  { id: 'unhas', label: 'Unhas' },
  { id: 'pacote-noiva', label: 'Pacote Noiva' },
  { id: 'teste-make', label: 'Teste de Maquiagem' },
  { id: 'pacote-madrinhas', label: 'Pacote Madrinhas' },
];

const timeSlots = ['09:00', '10:30', '14:00', '15:30', '17:00'];

export function Booking() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [completed, setCompleted] = useState(false);

  // Dados do contato controlados centralizadamente para persistência no "voltar"
  const [contactData, setContactData] = useState({ name: '', phone: '', obs: '' });

  useEffect(() => {
    const handleSelect = (e: CustomEvent<{ service: string }>) => {
      const selected = e.detail?.service;
      if (selected && servicesOptions.some(s => s.id === selected)) {
        setService(selected);
        setStep(1);
      }
    };
    window.addEventListener('select-service', handleSelect as EventListener);
    return () => window.removeEventListener('select-service', handleSelect as EventListener);
  }, []);

  const today = new Date();
  const nextDays = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    return d;
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleContactSubmit = (data: { name: string; phone: string; obs?: string }) => {
    setContactData({
      name: data.name,
      phone: data.phone,
      obs: data.obs || '',
    });
    setCompleted(true);
  };

  const reset = () => {
    setStep(1);
    setService('');
    setDate('');
    setTime('');
    setContactData({ name: '', phone: '', obs: '' });
    setCompleted(false);
  };

  const selectedServiceLabel = servicesOptions.find((s) => s.id === service)?.label || '';

  return (
    <section id="agendamento" className="py-24 bg-surface px-6 md:px-8 border-t border-accent-light/30">
      <div className="max-w-3xl mx-auto bg-background rounded-3xl p-8 md:p-14 shadow-lg shadow-black/5 relative overflow-hidden border border-white">
        <SectionHeader
          eyebrow="Agendamento"
          title="Reserve seu momento"
          subtitle="Escolha o serviço, o dia e o horário. É rápido."
        />

        {!completed ? (
          <div className="mt-8">
            {/* Progress Bar */}
            <div className="flex gap-2 mb-12 h-1.5 bg-surface rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full bg-accent transition-all duration-400 ease-out",
                  step >= 1 ? "w-1/3" : "w-0"
                )}
              />
              <div
                className={cn(
                  "h-full bg-accent transition-all duration-400 ease-out",
                  step >= 2 ? "w-1/3" : "w-0"
                )}
              />
              <div
                className={cn(
                  "h-full bg-accent transition-all duration-400 ease-out",
                  step >= 3 ? "w-1/3" : "w-0"
                )}
              />
            </div>

            <div className="relative min-h-[350px]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <ServiceSelection
                    service={service}
                    setService={setService}
                    nextStep={nextStep}
                    servicesOptions={servicesOptions}
                  />
                )}

                {step === 2 && (
                  <DateTimeSelection
                    date={date}
                    setDate={setDate}
                    time={time}
                    setTime={setTime}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    timeSlots={timeSlots}
                    nextDays={nextDays}
                  />
                )}

                {step === 3 && (
                  <BookingContactForm
                    defaultValues={contactData}
                    onSubmit={handleContactSubmit}
                    prevStep={prevStep}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <BookingSuccess
            serviceLabel={selectedServiceLabel}
            date={date}
            time={time}
            reset={reset}
          />
        )}
      </div>
    </section>
  );
}
