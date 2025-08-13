import { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ProductModal from './ProductModal';
import { Badge } from './ui/Badge';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

type AstroImage = {
  src: string;
  width: number;
  height: number;
  format: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
  recommendation: string;
  images: AstroImage[]; 
  quoteUrl: string;
};

interface ProductSectionProps {
  products: Product[];
}

export default function ProductSection({ products }: ProductSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const openModal = (product: Product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

   return (
    <>
      <div className="relative group">
        <div className="overflow-hidden py-4 px-4" ref={emblaRef}>
          <div className="flex -ml-4 -my-4">
            {products.map((product) => (
              <div key={product.id} className="pl-4 py-4 min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3">
                <div onClick={() => openModal(product)} className="cursor-pointer group/card transition-transform duration-300 hover:scale-105">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={product.images[0].src} 
                      alt={product.name} 
                      className="w-full h-72 object-cover rounded-lg" 
                    />
                    {product.badge && (
                      <Badge variant="secondary" className="absolute top-4 left-4">{product.badge}</Badge>
                    )}
                  </div>
                  <div className="pt-4">
                    <h4 className="font-futura font-bold text-lg text-foreground transition-colors duration-300">{product.name}</h4>
                    <p className="font-futura text-najal-secondary-light mt-1 text-sm">{product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <CarouselButton className="left-0" onClick={scrollPrev} aria-label="Ver producto anterior">
            <ArrowLeft className="h-4 w-4" />
        </CarouselButton>
        <CarouselButton className="right-0" onClick={scrollNext} aria-label="Ver producto siguiente">
            <ArrowRight className="h-4 w-4" />
        </CarouselButton>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}

const CarouselButton = ({ children, className, ...props }: React.ComponentProps<'button'>) => (
  <button
    {...props}
    className={cn("absolute h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background flex items-center justify-center text-foreground disabled:opacity-50 top-1/2 -translate-y-1/2 z-10 transition-opacity opacity-0 group-hover:opacity-100", className)}
  >
    {children}
  </button>
);