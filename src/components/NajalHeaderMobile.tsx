// src/components/NajalHeaderMobile.tsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Necesitaremos instalar lucide-react

// Definimos las props que recibirá nuestro componente de React
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
    <>
      {/* Botón de hamburguesa / X */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-najal-primary-dark hover:text-najal-primary z-20 relative"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full bg-white shadow-lg py-20 px-4">
          <nav className="flex flex-col space-y-4 text-center">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-futura text-najal-primary-dark hover:text-najal-primary transition-colors text-lg"
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
    </>
  );
}