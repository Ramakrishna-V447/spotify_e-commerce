/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useAppStore } from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import CategoryPage from './pages/CategoryPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Cursor from './components/Cursor';

function AppContent() {
  const { view, setView } = useAppStore();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading sequence for a premium feel
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-black selection:text-white">
      <Cursor />
      
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[99999] bg-black flex items-center justify-center text-white"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <h1 className="font-serif text-3xl tracking-[0.4em] uppercase font-light">Spotify</h1>
              <motion.div 
                className="h-[1px] bg-white mt-8 mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {view.name !== 'checkout' && view.name !== 'admin-login' && view.name !== 'admin-dashboard' && <Navbar />}

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {view.name === 'home' && <Home key="home" />}
          {view.name === 'product' && <ProductPage key="product" />}
          {view.name === 'checkout' && <Checkout key="checkout" />}
          {view.name === 'category' && <CategoryPage key="category" />}
          {view.name === 'admin-login' && <AdminLogin key="admin-login" />}
          {view.name === 'admin-dashboard' && <AdminDashboard key="admin-dashboard" />}
        </AnimatePresence>
      </main>

      {view.name !== 'admin-login' && view.name !== 'admin-dashboard' && <CartDrawer />}
      
      {view.name !== 'checkout' && view.name !== 'admin-login' && view.name !== 'admin-dashboard' && (
        <a 
          href="https://wa.me/1234567890" 
          target="_blank" 
          rel="noreferrer"
          className="fixed bottom-20 md:bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all duration-300 flex items-center justify-center group"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M11.996 0C5.372 0 0 5.373 0 12c0 2.227.587 4.312 1.631 6.096L0 24l6.094-1.597A11.963 11.963 0 0011.996 24C18.621 24 24 18.627 24 12c0-6.627-5.379-12-12.004-12zm6.275 17.265c-.27.76-1.558 1.442-2.181 1.516-.622.074-1.391-.183-3.08-1.01-2.03-.996-3.328-3.09-3.428-3.224-.102-.135-.82-.1.82-2.195-.82-3.195 0-1.026.126-2.003L9.7 9.043c.125-.262.251-.266.363-.27.112-.004.24-.004.364-.004.125 0 .327-.047.5.196.173.242.663.81.8 1.096.136.286.037.6-.03.743-.07.144-.106.242-.24.4-.136.155-.285.343-.404.478-.13.146-.264.295-.102.584.159.288.708 1.186 1.523 1.916 1.054.945 1.948 1.238 2.235 1.385.286.147.453.123.623-.07.17-.184.733-.852.926-1.144.195-.291.39-.244.647-.146.258.1.64.303 1.636.793 1.002.49 1.67.734 1.912.915.242.18.242 1.042-.028 1.802z"/></svg>
          <span className="absolute right-16 bg-white text-black text-xs font-medium px-4 py-2 rounded-full shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 pointer-events-none">
            Chat to Order
          </span>
        </a>
      )}

      {/* Mobile Bottom Navigation */}
      {view.name !== 'checkout' && view.name !== 'admin-login' && view.name !== 'admin-dashboard' && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-200 flex justify-around items-center h-16 pb-safe">
          <button onClick={() => setView({ name: 'home' })} className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-black transition-colors">
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[9px] uppercase tracking-wider font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-black transition-colors">
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <span className="text-[9px] uppercase tracking-wider font-medium">Wishlist</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-black transition-colors">
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-[9px] uppercase tracking-wider font-medium">Profile</span>
          </button>
        </div>
      )}

      {view.name !== 'checkout' && view.name !== 'admin-login' && view.name !== 'admin-dashboard' && <div className="hidden md:block"><Footer /></div>}
      {view.name !== 'checkout' && view.name !== 'admin-login' && view.name !== 'admin-dashboard' && <div className="block md:hidden pb-16"><Footer /></div>}
    </div>
  );
}

export default function App() {
  return (
    <AppContent />
  );
}
