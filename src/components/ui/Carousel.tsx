// src/components/ui/Carousel.tsx
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import useEmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType, type EmblaPluginType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Definimos el tipo para cada item del carrusel
type CarouselItemData = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

// --- Componente Principal y ÚNICO exportado ---
export const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    opts?: EmblaOptionsType; 
    items: CarouselItemData[];
  }
>(({ opts, items, className, ...props }, ref) => {
  // El plugin de Autoplay se inicializa aquí adentro
  const plugins = [
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  ];
  
  const [emblaRef, emblaApi] = useEmblaCarousel(opts, plugins);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div ref={ref} className={cn("relative group", className)} role="region" {...props}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {items.map((item, index) => (
            <div key={index} className="min-w-0 shrink-0 grow-0 basis-full relative aspect-video">
              {/* Usamos una etiqueta <img> normal porque estamos en React */}
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-xl">
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
                  <h3 className="font-futura font-bold text-white text-2xl md:text-3xl mb-2">{item.title}</h3>
                  <p className="text-white/90 max-w-2xl text-sm md:text-base">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CarouselButton className="left-4" onClick={scrollPrev} disabled={!canScrollPrev}>
        <ArrowLeft className="h-4 w-4" />
      </CarouselButton>
      <CarouselButton className="right-4" onClick={scrollNext} disabled={!canScrollNext}>
        <ArrowRight className="h-4 w-4" />
      </CarouselButton>
    </div>
  );
});
Carousel.displayName = "Carousel";

// El botón es un componente interno, no necesita ser exportado
const CarouselButton = ({ children, className, ...props }: React.ComponentProps<'button'>) => (
  <button
    className={cn("absolute h-8 w-8 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white flex items-center justify-center text-najal-primary-dark disabled:opacity-50 top-1/2 -translate-y-1/2 z-10 transition-opacity opacity-0 group-hover:opacity-100", className)}
    {...props}
  >
    {children}
  </button>
);