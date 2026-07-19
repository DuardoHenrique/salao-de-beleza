import { Calendar, CheckCircle2, ChevronRight, Clock, MapPin, Search } from "lucide-react";

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string, title: string, subtitle?: string }) {
  return (
    <div className="flex flex-col items-center text-center mb-16 px-4">
      <div className="w-10 h-[2px] bg-accent mb-6" />
      <span className="font-body text-xs uppercase tracking-[0.08em] text-accent font-medium mb-4">
        {eyebrow}
      </span>
      <h2 className="text-4xl md:text-5xl text-text-primary mb-4 max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-text-secondary text-lg max-w-2xl font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Button({ 
  children, 
  variant = 'primary', 
  className = '',
  onClick,
  type = 'button',
  disabled = false
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'outline' | 'ghost',
  className?: string,
  onClick?: () => void,
  type?: 'button' | 'submit',
  disabled?: boolean
}) {
  const baseClasses = "inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-[0.08em] transition-all duration-250 ease-inout rounded-full";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-dark hover:shadow-accent",
    outline: "border border-accent text-accent hover:bg-accent-light hover:text-accent-dark",
    ghost: "text-text-secondary hover:text-accent"
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
