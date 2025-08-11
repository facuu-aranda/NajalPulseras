import { useEffect, useCallback, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type Product = {
  name: string;
  description: string;
  recommendation: string;
  images: string[];
  quoteUrl: string;
};

interface ProductModalProps {
  product: Product; // Ya no puede ser null, el padre se encarga de eso
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % product.images.length);
  }, [product]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  }, [product]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'auto';
    };
  }, [handleClose]);
  
  useEffect(() => {
    setCurrentIndex(0);
  }, [product]);

  return (
    <motion.div
      id="modal-backdrop"
      onClick={(e) => { if ((e.target as HTMLElement).id === 'modal-backdrop') handleClose(); }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-background rounded-lg shadow-2xl w-11/12 max-w-4xl max-h-[90vh] flex flex-col relative"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-10 p-1 bg-najal-primary text-white rounded-full shadow-lg"
        >
          <X size={20} />
        </button>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8 overflow-y-auto">
          <div className="flex flex-col gap-4">
            <h2 className="font-futura font-bold text-3xl text-primary md:hidden">{product.name}</h2>
            <div className="relative aspect-square overflow-hidden rounded-md">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={product.images[currentIndex]}
                  alt={`${product.name} - vista ${currentIndex + 1}`}
                  className="absolute top-0  left-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.14 }}
                />
              </AnimatePresence>
              <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white/50 rounded-full text-foreground"><ChevronLeft size={24}/></button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/50 rounded-full text-foreground"><ChevronRight size={24}/></button>
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="font-futura font-bold text-3xl text-primary hidden md:block">{product.name}</h2>
            <p className="mt-4 text-foreground/80">{product.description}</p>
            <div className="mt-6 bg-card p-4 rounded-md border border-border">
              <h3 className="font-bold text-secondary">Recomendación de uso:</h3>
              <p className="mt-2 text-sm text-foreground/70">{product.recommendation}</p>
            </div>
            <div className="mt-auto pt-6">
              <a href={product.quoteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full rounded-lg font-futura font-medium transition-colors bg-najal-primary text-white hover:bg-najal-primary/90 h-12 px-6 text-base">
                Solicitar Presupuesto
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
