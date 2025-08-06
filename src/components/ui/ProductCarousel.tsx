// src/components/ui/ProductCarousel.tsx
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Badge } from './Badge'; // Importamos el Badge que ya creamos

// Tipo para los datos de un producto
type Product = {
  image: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
};

// --- Componente Principal y ÚNICO exportado ---
export const ProductCarousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    opts?: EmblaOptionsType; 
    items: Product[];
  }
>(({ opts, items, className, ...props }, ref) => {
  const plugins = [ Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true }) ];

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
    <div ref={ref} className={cn("relative group", className)} {...props}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {items.map((product, index) => (
            <div key={index} className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 pl-4">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
                {product.badge && (
                  <Badge variant="secondary" className="absolute top-4 left-4">{product.badge}</Badge>
                )}
              </div>
              <div className="pt-4">
                <h4 className="font-futura font-bold text-lg text-white">{product.name}</h4>
                <p className="font-futura text-najal-secondary-light mt-1 text-sm">{product.description}</p>
                <p className="font-futura font-bold text-najal-secondary mt-2">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CarouselButton className="left-0" onClick={scrollPrev} disabled={!canScrollPrev}>
        <ArrowLeft className="h-4 w-4" />
      </CarouselButton>
      <CarouselButton className="right-0" onClick={scrollNext} disabled={!canScrollNext}>
        <ArrowRight className="h-4 w-4" />
      </CarouselButton>
    </div>
  );
});
ProductCarousel.displayName = "ProductCarousel";

// Componente interno para los botones
const CarouselButton = ({ children, className, ...props }: React.ComponentProps<'button'>) => (
  <button
    className={cn("absolute h-8 w-8 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white flex items-center justify-center text-najal-primary-dark disabled:opacity-50 top-1/2 -translate-y-1/2 z-10 transition-opacity opacity-0 group-hover:opacity-100", className)}
    {...props}
  >
    {children}
  </button>
);