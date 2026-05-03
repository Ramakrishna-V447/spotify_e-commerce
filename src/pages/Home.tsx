import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Marquee from '../components/Marquee';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useAppStore } from '../store';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const { setView } = useAppStore();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const carouselRef = useRef<HTMLDivElement>(null);

  // Mouse parallax for Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 400 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const womenProducts = products.filter(p => p.department === 'Women');
  const menProducts = products.filter(p => p.department === 'Men');
  const kidsProducts = products.filter(p => p.department === 'Kids');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white"
    >
      {/* Hero Section */}
      <div 
        className="relative h-screen overflow-hidden bg-[#111] perspective-1000"
        onMouseMove={handleHeroMouseMove}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <img 
            src="https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Fashion" 
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </motion.div>
        
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4 h-full">
          {/* 3D Floating Element */}
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-lg aspect-[4/5] md:aspect-auto md:h-[60vh] hidden md:block mt-20 will-change-transform pointers-events-none"
          >
            <motion.div 
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              style={{ transform: "translateZ(50px)" }}
            />
            <motion.div 
              className="absolute -bottom-10 -right-10 w-2/3 aspect-[3/4] bg-[url('https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center border-4 border-[#111] shadow-2xl"
              style={{ transform: "translateZ(100px)" }}
            />
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center absolute inset-0 flex flex-col items-center justify-center md:justify-end md:pb-32 z-20 pointer-events-none"
          >
            <motion.p variants={item} className="text-xs tracking-[0.4em] uppercase mb-6 text-gold drop-shadow-md">The Infinite collection</motion.p>
            <motion.h1 
              variants={item}
              className="font-serif text-5xl md:text-9xl tracking-tight mb-8 font-light drop-shadow-2xl"
              style={{ transform: "translateZ(150px)" }}
            >
              Motion <br className="md:hidden"/> & Matter
            </motion.h1>
            <motion.div variants={item} className="pointer-events-auto">
              <button 
                onClick={() => {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }}
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white text-xs uppercase tracking-widest overflow-hidden hover:bg-white hover:text-black transition-all duration-500 rounded-full"
              >
                <span className="relative z-10 flex items-center">
                  Explore Collections
                  <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 w-12 h-full bg-white/20 skew-x-30 -translate-x-[150%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Marquee />

      {/* Men's Collection */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-4">
          <div>
            <h2 className="font-serif text-4xl mb-2">Menswear</h2>
            <p className="text-gray-500 uppercase tracking-widest text-xs">Tailored Precision</p>
          </div>
          <button className="hidden md:flex border-b border-black pb-1 text-sm uppercase tracking-widest hover:text-gold hover:border-gold transition-colors">
            View All Men
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-8 gap-y-12">
          {menProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Split Section - Now focused on Women's */}
      <section className="bg-[#f8f8f6] py-32 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: "radial-gradient(#b2935b 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
          animate={{ y: [0, 40] }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative perspective-1000"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-2xl transform rotate-y-[-5deg]">
                <img 
                  src="https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=1000" 
                  alt="Womenswear Editorial" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-12 -right-8 bg-white/80 backdrop-blur-xl p-8 shadow-2xl hidden md:block max-w-xs border border-white/50"
              >
                <p className="font-serif text-2xl italic text-gray-900">"Femininity redefined through motion."</p>
                <div className="mt-4 w-12 h-[1px] bg-black"></div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="md:pl-12"
            >
              <h3 className="uppercase tracking-[0.2em] text-xs text-gold mb-4 font-semibold">The Collection</h3>
              <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8">Women's <br/><span className="italic font-light">Elegance</span></h2>
              <p className="text-gray-600 leading-relaxed max-w-md mb-8 text-lg">
                Explore our latest arrivals featuring fluid fabrics, structural masterpieces, and timeless silhouettes designed for the modern muse.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {womenProducts.slice(0, 4).map((product) => (
                  <div key={product.id} className="cursor-pointer group" onClick={() => setView({ name: 'product', productId: product.id })}>
                    <div className="aspect-[3/4] overflow-hidden mb-2 shadow-sm group-hover:shadow-md transition-all">
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                    </div>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-gray-500">{product.designer}</p>
                    <p className="text-xs font-serif truncate text-gray-900 group-hover:text-black mt-0.5">{product.name}</p>
                    <p className="text-xs font-medium mt-1">${product.price}</p>
                  </div>
                ))}
              </div>

              <button className="uppercase tracking-widest text-xs border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-300 w-full sm:w-auto shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-y-1 hover:translate-x-1">
                Shop Women
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kids Collection - Slider */}
      <section className="py-32 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="text-center mb-16 relative">
          <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute left-1/2 -top-10 -translate-x-1/2 w-40 h-40 bg-yellow-100 rounded-full blur-3xl opacity-50 -z-10"
          />
          <h2 className="font-serif text-4xl mb-2">L'Enfant</h2>
          <p className="text-gray-500 uppercase tracking-widest text-xs">Miniature Luxury</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-8 gap-y-12 max-w-6xl mx-auto">
          {kidsProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#111] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="uppercase tracking-[0.2em] text-xs text-gold mb-12">Client Experiences</h3>
          <div className="relative">
             <p className="font-serif text-2xl md:text-4xl italic leading-relaxed font-light">"The fabrics feel impossibly luxurious. The unboxing experience itself is a masterpiece. This is the new standard for digital fashion."</p>
             <p className="mt-8 text-sm uppercase tracking-widest opacity-60">— S. Harrison, New York</p>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <section className="py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-serif text-2xl mb-8">Recently Viewed</h3>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x pb-4">
            {products.slice(0, 5).reverse().map((product) => (
              <div 
                key={product.id} 
                className="min-w-[160px] snap-start group cursor-pointer"
                onClick={() => setView({ name: 'product', productId: product.id })}
              >
                <div className="aspect-[3/4] overflow-hidden mb-3 bg-gray-100">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                </div>
                <p className="text-[9px] uppercase tracking-widest text-gray-500">{product.designer}</p>
                <p className="font-serif text-sm truncate mt-0.5">{product.name}</p>
                <p className="font-medium text-sm mt-1">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </motion.div>
  );
}
