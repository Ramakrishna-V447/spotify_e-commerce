import { motion } from 'motion/react';
import { useAppStore } from '../store';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, storeProducts, setView } = useAppStore();
  
  const wishlistProducts = storeProducts.filter(p => wishlist.includes(p.id));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16 min-h-screen"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl md:text-4xl mb-2">My Wishlist</h1>
        <p className="text-gray-500 mb-8">{wishlistProducts.length} items</p>
        
        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Heart size={48} className="mb-4 text-gray-300" strokeWidth={1} />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="mb-6">Save items that you like in your wishlist.</p>
            <button 
              onClick={() => setView({ name: 'home' })}
              className="px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
