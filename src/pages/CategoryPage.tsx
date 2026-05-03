import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../store';
import ProductCard from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
  const { view, setView, storeProducts } = useAppStore();
  const categoryTitle = view.category || 'All';
  
  const categoryProducts = storeProducts.filter(p => p.department === categoryTitle || categoryTitle === 'All');

  // Implementing pagination/lazy loading
  const PAGE_SIZE = 20;
  const [displayedProducts, setDisplayedProducts] = useState(categoryProducts.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (page * PAGE_SIZE < categoryProducts.length) {
      setPage(prev => prev + 1);
      setDisplayedProducts(categoryProducts.slice(0, (page + 1) * PAGE_SIZE));
    }
  }, [page, categoryProducts]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [loadMore]);

  // Reset pagination when category changes
  useEffect(() => {
    setPage(1);
    setDisplayedProducts(categoryProducts.slice(0, PAGE_SIZE));
  }, [categoryTitle]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pt-32 pb-24"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="border-b border-gray-200 pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <button onClick={() => setView({ name: 'home' })} className="flex items-center text-sm font-medium text-gray-500 hover:text-black mb-6 transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </button>
            <h1 className="font-serif text-5xl md:text-6xl tracking-tight mb-2 uppercase">{categoryTitle}</h1>
            <p className="text-gray-500 font-medium text-sm">Showing {categoryProducts.length} premium products</p>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center space-x-4">
             <select className="border border-gray-200 text-sm font-medium p-3 outline-none hover:border-black transition-colors min-w-[200px] cursor-pointer appearance-none bg-white">
                <option>Sort by: Recommended</option>
                <option>Price: High to Low</option>
                <option>Price: Low to High</option>
                <option>Newest Arrivals</option>
             </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-8 gap-y-12">
          {displayedProducts.map((product) => (
             <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Loading trigger for infinite scroll */}
        <div ref={loadMoreRef} className="py-20 flex justify-center mt-8">
          {page * PAGE_SIZE < categoryProducts.length && (
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin opacity-50" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
