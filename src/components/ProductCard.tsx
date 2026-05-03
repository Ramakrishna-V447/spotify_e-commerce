import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Heart } from 'lucide-react';
import { Product } from '../data/products';
import { useAppStore } from '../store';
import React, { useState } from 'react';

interface Props {
  product: Product;
  key?: React.Key;
}

export default function ProductCard({ product }: Props) {
  const { toggleWishlist, wishlist, setView, addToCart } = useAppStore();
  const isWishlisted = wishlist.includes(product.id);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const brightness = useTransform(mouseYSpring, [-0.5, 0.5], [1.1, 0.9]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group cursor-pointer flex flex-col perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setView({ name: 'product', productId: product.id })}
    >
      <motion.div 
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
          filter: `brightness(${isHovered ? brightness.get() : 1})`,
        }}
        className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 transition-all duration-300 ease-out will-change-transform shadow-sm group-hover:shadow-2xl"
      >
        {product.offer && (
          <div className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] uppercase tracking-wider px-2 py-1 transform translate-z-[30px]">
            {product.offer}
          </div>
        )}
        {!product.offer && product.trending && (
          <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] uppercase tracking-wider px-2 py-1 transform translate-z-[30px] flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
            Trending
          </div>
        )}
        {product.stockLeft && product.stockLeft < 6 && (
           <div className="absolute top-12 left-4 z-10 bg-white border border-gray-200 text-gray-800 text-[9px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-sm transform translate-z-[30px]">
             Only {product.stockLeft} left
           </div>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors transform translate-z-[40px]"
        >
          <Heart size={16} fill={isWishlisted ? "black" : "transparent"} strokeWidth={1.5} />
        </button>
        <div className="w-full h-full relative">
          <img 
            src={product.image} 
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          />
          <motion.img 
            src={product.hoverImage} 
            alt={product.name}
            style={{
              z: isHovered ? 20 : 0,
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
          />
        </div>
        
        {/* Quick Add Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500 bg-gradient-to-t from-black/50 to-transparent flex justify-center transform translate-z-[50px] ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
          <button 
            onClick={(e) => { 
                e.stopPropagation(); 
                addToCart(product);
            }}
            className="bg-white/90 backdrop-blur-md text-black px-6 py-3 uppercase tracking-widest text-[10px] w-full max-w-[200px] hover:bg-white transition-colors shadow-lg font-medium"
          >
            Quick Add
          </button>
        </div>
      </motion.div>
      <div className="flex justify-between items-start pt-2 px-1">
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-medium">{product.designer}</p>
          <h3 className="font-serif text-lg leading-tight text-gray-900 group-hover:text-black transition-colors">{product.name}</h3>
          {product.rating && (
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span>{product.rating}</span>
              {product.reviewCount && <span className="opacity-60">({product.reviewCount})</span>}
            </div>
          )}
        </div>
        <p className="font-medium text-gray-900 mt-1">${product.price}</p>
      </div>
    </motion.div>
  );
}
