import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useAppStore } from '../store';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, addToCart, removeFromCart, setView } = useAppStore();

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[201] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-sm font-medium tracking-widest uppercase">Shopping Bag ({cart.length})</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <p className="tracking-widest uppercase text-sm">Your bag is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-black border-b border-black pb-1 hover:text-gray-600 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.product.id}-${item.size}-${idx}`} className="flex gap-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-24 h-32 object-cover"
                    />
                    <div className="flex-1 flex flex-col pt-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">{item.product.designer}</p>
                          <h3 className="font-serif text-lg mt-1 leading-tight">{item.product.name}</h3>
                          {item.size && <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>}
                        </div>
                        <p className="font-medium">${item.product.price}</p>
                      </div>
                      
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center border border-gray-200 w-fit">
                          <button 
                            className="p-1 px-2 hover:bg-gray-50"
                            onClick={() => {
                              if (item.quantity > 1) {
                                // Add logic to decrement in a real app, currently addToCart increments
                              } else {
                                removeFromCart(item.product.id);
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button 
                            className="p-1 px-2 hover:bg-gray-50"
                            onClick={() => addToCart(item.product, item.size)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="mb-4">
                  <div className="flex justify-between text-xs uppercase tracking-widest text-gray-500 mb-2">
                    <span>{total >= 1000 ? "You have Free Shipping!" : `Add $${1000 - total} for Free Shipping`}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((total / 1000) * 100, 100)}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="bg-black h-full"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="uppercase tracking-wider text-sm font-medium">Subtotal</span>
                  <span className="font-serif text-xl border-b border-black pb-1">${total}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    setView({ name: 'checkout' });
                  }}
                  className="w-full bg-black text-white py-4 uppercase tracking-[0.2em] text-xs hover:bg-[#222] transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
