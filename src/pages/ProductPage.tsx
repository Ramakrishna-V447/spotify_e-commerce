import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ArrowRight, Heart, Share2 } from 'lucide-react';
import { useAppStore } from '../store';
import { products } from '../data/products';

export default function ProductPage() {
  const { view, setView, addToCart, wishlist, toggleWishlist } = useAppStore();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImage, setActiveImage] = useState(0);

  const product = products.find(p => p.id === view.productId) || products[0];
  const isWishlisted = wishlist.includes(product.id);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => setView({ name: 'home' })}
          className="flex items-center text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-8"
        >
          <ChevronLeft size={14} className="mr-1" /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Images */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 order-2 md:order-1 hide-scrollbar">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-28 aspect-[3/4] overflow-hidden flex-shrink-0 transition-opacity ${activeImage === idx ? 'ring-1 ring-black opacity-100' : 'opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="relative flex-1 aspect-[4/5] overflow-hidden bg-gray-100 group cursor-zoom-in order-1 md:order-2">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  src={product.images[activeImage]} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Carousel Navigation */}
              {product.images.length > 1 && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveImage(prev => prev === 0 ? product.images.length - 1 : prev - 1); }}
                    className="w-10 h-10 bg-white/80 backdrop-blur-md flex items-center justify-center rounded-full hover:bg-white text-black transition-colors shadow-lg"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveImage(prev => prev === product.images.length - 1 ? 0 : prev + 1); }}
                    className="w-10 h-10 bg-white/80 backdrop-blur-md flex items-center justify-center rounded-full hover:bg-white text-black transition-colors shadow-lg"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col pt-8">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">{product.designer}</p>
              <h1 className="font-serif text-4xl md:text-5xl mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-2xl">${product.price}</p>
                {product.rating && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 border-l border-gray-200 pl-4">
                    <div className="flex text-yellow-500">
                      {[...Array(Math.floor(product.rating))].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                    <span>{product.rating}</span>
                    <span className="underline cursor-pointer hover:text-black">({product.reviewCount} Reviews)</span>
                  </div>
                )}
              </div>
              {product.stockLeft && product.stockLeft < 6 && (
                <div className="inline-flex items-center gap-2 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-sm">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                  Only {product.stockLeft} left in stock - Order Soon
                </div>
              )}
            </div>

            <div className="mb-8 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium uppercase tracking-wider">Size</span>
                <button className="text-xs underline text-gray-500 hover:text-black">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border text-sm transition-colors ${
                      selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-200 hover:border-black text-gray-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-red-500 text-xs mt-2 hidden" id="size-error">Please select a size.</p>
              )}
            </div>

            <div className="flex gap-4 mb-12">
              <button 
                onClick={() => {
                  if (!selectedSize) {
                    document.getElementById('size-error')?.classList.remove('hidden');
                    return;
                  }
                  document.getElementById('size-error')?.classList.add('hidden');
                  addToCart(product, selectedSize);
                }}
                className="flex-1 bg-black text-white py-4 uppercase tracking-[0.2em] text-xs hover:bg-[#222] transition-colors"
              >
                Add to Bag
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="p-4 border border-gray-200 hover:border-black transition-colors flex items-center justify-center"
              >
                <Heart size={20} fill={isWishlisted ? "black" : "transparent"} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-12 text-[10px] uppercase tracking-widest text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Secure Checkout
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                Free Delivery & Returns
              </div>
            </div>

            <div className="prose prose-sm text-gray-600 border-t border-gray-200 pt-8 mt-auto">
              <h3 className="uppercase tracking-widest text-xs font-medium text-black mb-4">Description</h3>
              <p className="leading-relaxed">{product.description}</p>
              
              <ul className="mt-6 space-y-2 text-sm">
                <li>• 100% Premium Materials</li>
                <li>• Dry clean only</li>
                <li>• Made in Italy</li>
                <li>• Model is 178cm/5'10" and wearing size S</li>
              </ul>
            </div>

            <div className="flex gap-6 mt-8 pt-8 border-t border-gray-200">
              <button className="flex items-center text-xs uppercase tracking-widest text-gray-500 hover:text-black">
                <Share2 size={14} className="mr-2" /> Share
              </button>
            </div>
            
            {/* Fake Reviews Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <h3 className="uppercase tracking-widest text-xs font-medium text-black text-left">Client Reviews (4)</h3>
                <div className="flex text-black">
                   {/* 5 star rendering */}
                   {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                   ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-6 text-left flex gap-6">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                       <span className="font-serif italic text-sm">Eleanor V.</span>
                       <span className="text-[10px] text-gray-400">2 Weeks Ago</span>
                    </div>
                    <div className="flex text-yellow-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">The quality of the materials is simply outstanding. The fit is perfect for my frame, and it transitions beautifully from day to evening.</p>
                  </div>
                  <div className="w-24 h-24 flex-shrink-0 rounded-sm overflow-hidden bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1515347619152-16aeeeb342bc?auto=format&fit=crop&q=80&w=200" alt="Review Photo" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="pb-4 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-serif italic text-sm">Sophie M.</span>
                    <span className="text-[10px] text-gray-400">1 Month Ago</span>
                  </div>
                  <div className="flex text-yellow-500 mb-2">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                    <svg className="w-2.5 h-2.5 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  </div>
                  <p className="text-sm text-gray-600">I am completely in awe of the structured silhouette. It feels incredibly premium and worth every cent.</p>
                </div>
              </div>
              <button className="text-xs uppercase tracking-widest text-gray-500 hover:text-black mt-4 underline text-left w-full">Read all reviews</button>
            </div>
          </div>
        </div>

        {/* You may also like - Recommendations */}
        <div className="mt-32 border-t border-gray-200 pt-24 pb-16">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl mb-2">You May Also Like</h2>
              <p className="text-gray-500 uppercase tracking-widest text-xs">AI-Curated Recommendations</p>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-8 pb-10 hide-scrollbar snap-x snap-mandatory">
            {products.filter(p => p.id !== product.id).slice(0, 4).map((recProduct) => (
              <div key={recProduct.id} className="min-w-[280px] md:min-w-[340px] snap-center">
                {/* Simplified recommendation card to avoid circular dependency / complex imports if needed, but we can reuse ProductCard. Oh wait, ProductCard relies on setView and product context, wait let's just render the same ProductCard. */}
                <div 
                  className="group cursor-pointer flex flex-col"
                  onClick={() => {
                    setView({ name: 'product', productId: recProduct.id });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                    <img 
                      src={recProduct.image} 
                      alt={recProduct.name}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
                    />
                    <img 
                      src={recProduct.hoverImage} 
                      alt={recProduct.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-start pt-2">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{recProduct.designer}</p>
                      <h3 className="font-serif text-lg leading-tight">{recProduct.name}</h3>
                    </div>
                    <p className="font-medium">${recProduct.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
