import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { useAppStore } from '../store';
import { products } from '../data/products';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { cart, wishlist, setIsCartOpen, setView } = useAppStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? 'glass shadow-sm text-black' : 'bg-transparent text-white mix-blend-difference'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left */}
            <div className="flex items-center space-x-6">
              <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2 hover:opacity-70 transition-opacity">
                <Menu size={24} strokeWidth={1.5} />
              </button>
              <button onClick={() => setIsSearchOpen(true)} className="hidden md:block p-2 hover:opacity-70 transition-opacity">
                <Search size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Center Logo */}
            <div 
              className="font-serif text-2xl tracking-[0.2em] uppercase font-medium cursor-pointer"
              onClick={() => setView({ name: 'home' })}
            >
              Spotify
            </div>

            {/* Right */}
            <div className="flex items-center space-x-6">
              <button className="hidden md:block p-2 relative hover:opacity-70 transition-opacity">
                <Heart size={20} strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-current rounded-full" />
                )}
              </button>
              <button 
                className="p-2 -mr-2 relative hover:opacity-70 transition-opacity"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0 right-0 w-4 h-4 bg-current text-white mix-blend-difference text-[10px] flex items-center justify-center rounded-full"
                    >
                      {cartCount}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-white text-black bg-opacity-95 backdrop-blur-xl flex flex-col"
          >
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
               <div className="flex justify-end">
                 <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:opacity-70">
                   <X size={28} strokeWidth={1.5} />
                 </button>
               </div>
               <div className="mt-12 max-w-2xl mx-auto">
                 <div className="relative">
                   <Search size={24} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
                   <input 
                     type="text" 
                     placeholder="Search designers, categories, or items..." 
                     className="w-full text-2xl md:text-3xl font-serif bg-transparent border-b-2 border-gray-200 pb-4 pl-12 focus:outline-none focus:border-black transition-colors"
                     autoFocus
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                 </div>
                 
                 {/* Live suggestions logic */}
                 <div className="mt-12">
                   {searchQuery.length > 1 ? (
                     <div>
                       <p className="uppercase tracking-widest text-xs text-gray-500 mb-6">Search Results</p>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-4 pointer-events-auto">
                         {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4).map(product => (
                           <div 
                             key={product.id} 
                             onClick={() => { setIsSearchOpen(false); setView({ name: 'product', productId: product.id }); }}
                             className="flex gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100"
                           >
                             <img src={product.image} className="w-16 h-20 object-cover" alt="" />
                             <div>
                               <p className="text-[10px] uppercase tracking-widest text-gray-500">{product.designer}</p>
                               <p className="font-serif text-lg">{product.name}</p>
                               <p className="text-sm mt-1">${product.price}</p>
                             </div>
                           </div>
                         ))}
                         {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                           <p className="text-gray-400">No products found matching "{searchQuery}".</p>
                         )}
                       </div>
                     </div>
                   ) : (
                     <div>
                       <p className="uppercase tracking-widest text-xs text-gray-500 mb-6">Popular Searches</p>
                       <div className="flex flex-wrap gap-4">
                         {['Silk Dresses', 'Cashmere', 'Tote Bags', 'Autumn Collection'].map(term => (
                           <button key={term} onClick={() => setSearchQuery(term)} className="px-4 py-2 border border-gray-200 rounded-full text-sm hover:border-black transition-colors">
                             {term}
                           </button>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white text-black"
          >
            <div className="p-6">
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6">
                <X size={28} strokeWidth={1.5} />
              </button>
              <div className="mt-20 flex flex-col space-y-8 font-serif text-4xl">
                {['Women', 'Men', 'Kids', 'Collections', 'Editorial', 'About'].map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    className="hover:text-gold transition-colors"
                    onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
