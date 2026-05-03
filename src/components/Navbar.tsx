import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, X, Heart, User } from 'lucide-react';
import { useAppStore } from '../store';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  const clickCount = useRef(0);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const { cart, wishlist, setIsCartOpen, setView, storeProducts } = useAppStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogoClick = () => {
    clickCount.current += 1;
    
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    
    clickTimeout.current = setTimeout(() => {
	  clickCount.current = 0;
    }, 1500); // Reset click count after 1.5s
    
    if (clickCount.current >= 10) {
      setView({ name: 'admin-login' });
      clickCount.current = 0; // Reset after trigger
    } else {
	  // normal behavior goes here, maybe on a single click. 
	  // Let's ensure single click works by checking if it's the first click or we can just always navigate to home on first click.
      // But 10 clicks would trigger 10 home sets. That's fine.
      setView({ name: 'home' });
    }
  };

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

  const categories = [
    { name: 'MEN', viewParam: 'Men' },
    { name: 'WOMEN', viewParam: 'Women' },
    { name: 'KIDS', viewParam: 'Kids' },
    { name: 'HOME', viewParam: 'Home' },
    { name: 'BEAUTY', viewParam: 'Beauty' },
    { name: 'GENZ', viewParam: 'GenZ' },
    { name: 'STUDIO', viewParam: 'Studio', isNew: true }
  ];

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
          isScrolled ? 'bg-white shadow-sm text-black border-b border-gray-100' : 'bg-transparent text-white mix-blend-difference'
        }`}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left Box & Mobile Menu */}
            <div className="flex items-center flex-shrink-0">
              <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 -ml-2 mr-4 hover:opacity-70 transition-opacity">
                <Menu size={24} strokeWidth={1.5} />
              </button>
              <div 
                className="font-serif text-2xl md:text-3xl tracking-[0.1em] font-bold cursor-pointer transition-transform hover:scale-105 select-none"
                onClick={handleLogoClick}
              >
                Spotify
              </div>
            </div>

            {/* Center Navigation - Desktop */}
            <div className="hidden lg:flex flex-1 items-center justify-center space-x-4 xl:space-x-8 font-medium text-[12px] xl:text-[13px] tracking-wider px-4">
              {categories.map((cat) => (
                <div 
                  key={cat.name} 
                  className="relative group py-8 cursor-pointer flex items-center"
                  onMouseEnter={() => setHoveredCategory(cat.name)}
                  onClick={() => setView({ name: 'category', category: cat.viewParam as any })}
                >
                  <span className={`relative z-10 transition-colors duration-300 ${hoveredCategory === cat.name ? 'text-gray-500' : ''}`}>
                    {cat.name}
                  </span>
                  {cat.isNew && (
                    <sup className="text-[9px] text-[#ff3f6c] font-bold absolute left-full ml-0.5 top-1/2 -translate-y-[14px]">NEW</sup>
                  )}
                  {/* Hover Highlight line */}
                  <div className={`absolute bottom-6 left-0 right-0 h-[2px] bg-[#ff3f6c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center justify-end space-x-3 xl:space-x-5 flex-shrink-0">
              {/* Search Mock Bar (Desktop) */}
              <div 
                className="hidden lg:flex items-center bg-gray-100 text-gray-500 rounded-md py-2 px-3 xl:px-4 cursor-text w-full max-w-[200px] xl:max-w-[260px] hover:bg-gray-200 transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={16} strokeWidth={2} className="mr-2 flex-shrink-0" />
                <span className="text-[13px] xl:text-sm font-normal truncate">Search for products...</span>
              </div>

              {/* Mobile Search Icon */}
              <button onClick={() => setIsSearchOpen(true)} className="lg:hidden p-2 hover:opacity-70 transition-opacity">
                <Search size={22} strokeWidth={1.5} />
              </button>

              <button className="hidden lg:flex flex-col items-center p-2 relative hover:opacity-70 transition-opacity group">
                <User size={22} strokeWidth={1.5} />
                <span className="text-[10px] uppercase font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Profile</span>
              </button>
              
              <button className="hidden lg:flex flex-col items-center p-2 relative hover:opacity-70 transition-opacity group">
                <Heart size={22} strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ff3f6c] text-white rounded-full" />
                )}
                <span className="text-[10px] uppercase font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Wishlist</span>
              </button>
              
              <button 
                className="flex lg:flex-col items-center p-2 relative hover:opacity-70 transition-opacity group"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-1 right-1 lg:right-0 w-[18px] h-[18px] bg-[#ff3f6c] text-white mix-blend-normal text-[10px] font-bold flex items-center justify-center rounded-full"
                    >
                      {cartCount}
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="hidden lg:block text-[10px] uppercase font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Bag</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mega Menu Dropdown Example Box (Mock behavior) */}
        <AnimatePresence>
          {isScrolled && hoveredCategory && ['MEN', 'WOMEN', 'KIDS'].includes(hoveredCategory) && (
            <motion.div 
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              className="absolute top-20 left-0 w-full bg-white shadow-xl origin-top text-black border-t border-gray-100 hidden lg:block"
            >
              <div className="max-w-[1400px] mx-auto px-8 py-10">
                 <div className="grid grid-cols-4 gap-8">
                    <div>
                      <h4 className="font-bold text-[#ff3f6c] text-sm mb-4">Topwear</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="hover:text-black cursor-pointer transition-colors hover:font-medium">T-Shirts</li>
                        <li className="hover:text-black cursor-pointer transition-colors hover:font-medium">Casual Shirts</li>
                        <li className="hover:text-black cursor-pointer transition-colors hover:font-medium">Formal Shirts</li>
                        <li className="hover:text-black cursor-pointer transition-colors hover:font-medium">Jackets</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#ff3f6c] text-sm mb-4">Bottomwear</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="hover:text-black cursor-pointer transition-colors hover:font-medium">Jeans</li>
                        <li className="hover:text-black cursor-pointer transition-colors hover:font-medium">Casual Trousers</li>
                        <li className="hover:text-black cursor-pointer transition-colors hover:font-medium">Formal Trousers</li>
                        <li className="hover:text-black cursor-pointer transition-colors hover:font-medium">Shorts</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#ff3f6c] text-sm mb-4">Footwear</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="hover:text-black cursor-pointer transition-colors hover:font-medium">Sneakers</li>
                        <li className="hover:text-black cursor-pointer transition-colors hover:font-medium">Formal Shoes</li>
                        <li className="hover:text-black cursor-pointer transition-colors hover:font-medium">Sports Shoes</li>
                        <li className="hover:text-black cursor-pointer transition-colors hover:font-medium">Sandals</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
                      <h4 className="font-bold text-gray-900 mb-2">Editor's Pick</h4>
                      <div className="aspect-[3/4] bg-[url('https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=400')] bg-cover bg-center rounded-sm"></div>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Overlay Complete Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex flex-col"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="bg-white text-black w-full shadow-2xl p-6"
               onClick={e => e.stopPropagation()}
            >
               <div className="flex items-center justify-between max-w-[1400px] mx-auto w-full gap-4">
                 <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                    <input 
                      type="text" 
                      placeholder="Search for products, brands and more" 
                      className="w-full bg-gray-100 text-lg md:text-xl font-medium outline-none py-4 pl-14 pr-4 rounded-md focus:bg-white focus:shadow-[0_0_0_1px_rgba(0,0,0,0.1)] transition-all"
                      autoFocus
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
                 <button onClick={() => setIsSearchOpen(false)} className="p-4 hover:bg-gray-100 rounded-full transition-colors">
                   <X size={28} strokeWidth={1.5} />
                 </button>
               </div>
               
               {/* Live suggestions logic */}
               <div className="max-w-[1400px] mx-auto w-full mt-8">
                 {searchQuery.length > 1 ? (
                   <div>
                     <p className="uppercase tracking-widest font-bold text-xs text-gray-500 mb-6">Search Results</p>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto pr-4 pointer-events-auto">
                       {storeProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8).map(product => (
                         <div 
                           key={product.id} 
                           onClick={() => { setIsSearchOpen(false); setView({ name: 'product', productId: product.id }); }}
                           className="flex flex-col gap-3 group cursor-pointer"
                         >
                           <div className="aspect-[3/4] overflow-hidden rounded-sm bg-gray-100">
                             <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                           </div>
                           <div>
                             <p className="text-[11px] uppercase font-bold text-gray-500 truncate">{product.designer}</p>
                             <p className="text-sm text-gray-800 truncate group-hover:text-[#ff3f6c] transition-colors">{product.name}</p>
                             <p className="text-sm font-bold mt-1">${product.price}</p>
                           </div>
                         </div>
                       ))}
                       {storeProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                         <p className="text-gray-400 font-medium">No products found matching "{searchQuery}".</p>
                       )}
                     </div>
                   </div>
                 ) : (
                   <div>
                     <p className="uppercase tracking-widest text-xs font-bold text-gray-500 mb-6">Popular Searches</p>
                     <div className="flex flex-wrap gap-3">
                       {['Printed Shirts', 'Oversized T-Shirts', 'Skinny Jeans', 'Summer Dresses', 'Formal Trousers'].map(term => (
                         <button key={term} onClick={() => setSearchQuery(term)} className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-medium hover:border-[#ff3f6c] hover:text-[#ff3f6c] transition-colors bg-white">
                           {term}
                         </button>
                       ))}
                     </div>
                   </div>
                 )}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white text-black lg:hidden"
          >
            <div className="h-full flex flex-col pt-safe">
              <div className="p-6 flex justify-between items-center border-b border-gray-100 h-20">
                <span className="font-serif text-2xl font-bold tracking-widest">Spotify</span>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X size={28} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col space-y-6 text-xl font-bold">
                {categories.map((item, i) => (
                  <motion.a
                     key={item.name}
                     href="#"
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: i * 0.05 + 0.1 }}
                     className="flex items-center text-gray-800 hover:text-[#ff3f6c] transition-colors"
                     onClick={(e) => { 
                       e.preventDefault(); 
                       setIsMenuOpen(false); 
                       setView({ name: 'category', category: item.viewParam as any }); 
                     }}
                  >
                     {item.name}
                     {item.isNew && (
                       <span className="ml-3 text-[10px] bg-[#ff3f6c] text-white px-2 py-1 rounded-sm uppercase tracking-wider">New</span>
                     )}
                  </motion.a>
                ))}
                
                <div className="h-px bg-gray-200 my-4" />
                
                <a href="#" className="flex items-center text-gray-600 font-medium text-lg"><User className="mr-3" size={20} /> Profile</a>
                <a href="#" className="flex items-center text-gray-600 font-medium text-lg"><Heart className="mr-3" size={20} /> Wishlist</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
