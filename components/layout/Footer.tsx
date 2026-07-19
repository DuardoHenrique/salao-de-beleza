import { Instagram, MapPin, Mail, Phone, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background py-16 px-6 md:px-8 border-t border-accent-light/20">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 md:grid md:grid-cols-[1.4fr_0.9fr_1.7fr] md:gap-8 items-start mb-10">
        
        {/* Coluna 1: Marca */}
        <div className="flex flex-col">
          <div className="font-display text-3xl mb-4 text-text-primary leading-none">Élara</div>
          <p className="font-sans text-[15px] font-light text-text-primary max-w-xs mb-6 leading-relaxed">
            Beleza que conta histórias. Um espaço premium pensado para realçar a sua melhor versão.
          </p>
          <div className="flex gap-4 items-center">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors duration-250 shrink-0"
              aria-label="Instagram"
            >
              <Instagram size={20} className="block shrink-0" />
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors duration-250 shrink-0"
              aria-label="TikTok"
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current block shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.7 1.53V6.69z" />
              </svg>
            </a>
            <a 
              href="https://wa.me/5511987654321" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors duration-250 shrink-0"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current block shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.066 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Coluna 2: Navegação */}
        <div className="flex flex-col">
          <h4 className="font-sans text-[12px] uppercase tracking-[0.1em] text-text-secondary font-semibold mb-4 leading-none">
            Navegação
          </h4>
          <ul className="flex flex-col gap-2.5 font-sans text-[15px] font-light text-text-primary">
            <li><a href="#servicos" className="hover:text-accent transition-colors duration-200">Serviços</a></li>
            <li><a href="#noivas" className="hover:text-accent transition-colors duration-200">Noivas</a></li>
            <li><a href="#galeria" className="hover:text-accent transition-colors duration-200">Galeria</a></li>
            <li><a href="#equipe" className="hover:text-accent transition-colors duration-200">Nossa Equipe</a></li>
            <li><a href="#agendamento" className="hover:text-accent transition-colors duration-200">Agendamento</a></li>
          </ul>
        </div>

        {/* Coluna 3: Contato */}
        <div className="flex flex-col min-w-0">
          <h4 className="font-sans text-[12px] uppercase tracking-[0.1em] text-text-secondary font-semibold mb-4 leading-none">
            Contato
          </h4>
          <ul className="flex flex-col gap-3 font-sans text-[15px] font-light text-text-primary min-w-0">
            <li className="flex gap-3 items-center min-w-0">
              <MapPin size={18} className="text-accent shrink-0" />
              <span className="truncate block" title="Rua das Magnólias, 142 — Jardins, São Paulo/SP">
                Rua das Magnólias, 142 — Jardins, São Paulo/SP
              </span>
            </li>
            <li className="flex gap-3 items-center min-w-0">
              <Phone size={18} className="text-accent shrink-0" />
              <span className="truncate block">(11) 98765-4321</span>
            </li>
            <li className="flex gap-3 items-center min-w-0">
              <Mail size={18} className="text-accent shrink-0" />
              <span className="truncate block">contato@studioelara.com.br</span>
            </li>
            <li className="flex gap-3 items-center min-w-0">
              <Clock size={18} className="text-accent shrink-0" />
              <span className="truncate block">Seg–Sex 09h–19h | Sáb 09h–17h | Dom fechado</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Container de Baixo: Mapa 100% Largura */}
      <div className="max-w-[1200px] mx-auto mb-16">
        <h4 className="font-sans text-[12px] uppercase tracking-[0.1em] text-text-secondary font-semibold mb-4 leading-none">
          Localização
        </h4>
        {/* Mockup de mapa 100% de largura */}
        <div className="rounded-2xl border border-accent-light/15 overflow-hidden h-[300px] max-h-[300px] w-full relative bg-[#F7F4F0] flex flex-col justify-between p-4 shadow-sm">
          {/* Street Grid Decoration */}
          <div className="absolute inset-0 opacity-15">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#7A6E66" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <line x1="0" y1="50" x2="1200" y2="150" stroke="#7A6E66" strokeWidth="8" />
              <line x1="150" y1="0" x2="400" y2="200" stroke="#7A6E66" strokeWidth="6" />
              <line x1="600" y1="0" x2="800" y2="200" stroke="#7A6E66" strokeWidth="6" />
              <line x1="1000" y1="0" x2="1100" y2="200" stroke="#7A6E66" strokeWidth="5" />
            </svg>
          </div>
          
          {/* Pulsing Accent */}
          <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 rounded-full bg-accent/20 animate-ping absolute -inset-3" />
            <div className="w-6 h-6 rounded-full bg-accent/30 animate-pulse absolute -inset-0" />
          </div>

          {/* Premium Pin Overlay */}
          <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <MapPin className="text-accent fill-white filter drop-shadow-md" size={28} />
          </div>

          {/* Address Overlay Capsule */}
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-accent-light/10 shadow-sm z-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <div>
              <span className="font-display text-sm text-text-primary block font-medium">Studio Élara</span>
              <span className="font-sans text-[10px] text-accent-dark tracking-widest uppercase font-semibold">Jardins, SP</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-accent-light/30" />
            <span className="hidden sm:inline font-sans text-xs text-text-secondary font-light">
              Rua das Magnólias, 142 — Jardins, São Paulo/SP
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1200px] mx-auto pt-8 border-t border-[#7A6E66]/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-sans text-[12px] uppercase tracking-[0.1em] text-text-secondary">
          © 2026 Studio Élara. Todos os direitos reservados.
        </p>
        <p className="font-sans text-[12px] uppercase tracking-[0.1em] text-text-secondary">
          Beleza com Essência & Sofisticação
        </p>
      </div>
    </footer>
  );
}
