import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle'; // 1. Importa el componente

interface NavItem {
  label: string;
  href: string;
}
interface Props {
  navigation: NavItem[];
  ctaText: string;
  ctaHref: string;
}

export default function NajalHeaderMobile({ navigation, ctaText, ctaHref }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buttonClasses = "inline-flex items-center justify-center rounded-lg font-futura font-medium transition-colors bg-najal-primary text-white hover:bg-najal-primary/90 h-11 px-6 text-base w-full";

  return (
    <div className="flex items-center space-x-4">
      {/* 2. Mueve el ThemeToggle aquí para que sea visible en móvil */}
      <ThemeToggle />
      
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-foreground hover:text-najal-primary z-20 relative"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menú desplegable */}
      {isMenuOpen && (
        // CAMBIO: de bg-white a bg-background para respetar el tema
        <div className="absolute top-0 left-0 w-full bg-background shadow-lg py-20 px-4">
          <nav className="flex flex-col space-y-4 text-center">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                // CAMBIO: de text-najal-primary-dark a text-foreground
                className="font-futura text-foreground hover:text-najal-primary transition-colors text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4">
              <a href={ctaHref} className={buttonClasses}>
                {ctaText}
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
