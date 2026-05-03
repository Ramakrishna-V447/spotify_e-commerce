import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../store';
import { ChevronLeft, ShieldCheck, Lock } from 'lucide-react';

export default function Checkout() {
  const { view, setView, cart } = useAppStore();
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = 0; // Complimentary
  const total = subtotal + shipping;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate Razorpay / Payment Gateway processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 2500);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 max-w-md w-full text-center shadow-sm border border-gray-100"
        >
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h2 className="font-serif text-3xl mb-4">Order Confirmed</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you for your purchase. Your order #SPOTIFY-{Math.floor(Math.random() * 100000)} is confirmed and will be shipped shortly.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-black text-white px-8 py-3 uppercase tracking-widest text-xs w-full hover:bg-gray-800 transition-colors"
          >
            Return to Boutique
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 min-h-screen pt-20 pb-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button 
          onClick={() => setView({ name: 'home' })}
          className="flex items-center text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-8"
        >
          <ChevronLeft size={14} className="mr-1" /> Back to Cart
        </button>

        <h1 className="font-serif text-3xl mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-7 xl:col-span-8">
            <AnimatePresence mode="wait">
              {step === 'shipping' && (
                <motion.div 
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-8 border border-gray-100"
                >
                  <h2 className="text-lg font-medium uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">Shipping Details</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                        <input type="text" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black" defaultValue="Jane" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                        <input type="text" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black" defaultValue="Doe" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                      <input type="email" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black" defaultValue="jane@example.com" />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Address</label>
                      <input type="text" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black" defaultValue="123 Luxury Ave, Apt 4B" />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="lg:col-span-2">
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">City</label>
                        <input type="text" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black" defaultValue="New York" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Zip Code</label>
                        <input type="text" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black" defaultValue="10001" />
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setStep('payment')}
                      className="w-full bg-black text-white p-4 uppercase tracking-widest text-xs mt-8 hover:bg-gray-900 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div 
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-8 border border-gray-100 relative overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-lg font-medium uppercase tracking-wider">Payment Method</h2>
                    <Lock size={16} className="text-gray-400" />
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-4 mb-6 rounded-sm flex items-start gap-4">
                    <input type="radio" checked readOnly className="mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Credit Card (Mock)</p>
                      <p className="text-xs text-gray-500 mt-1">Simulated payment gateway.</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Card Number</label>
                      <input type="text" placeholder="**** **** **** ****" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black font-mono tracking-widest" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black font-mono tracking-widest" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">CVC</label>
                        <input type="text" placeholder="***" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black font-mono tracking-widest" />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-black text-white p-4 uppercase tracking-widest text-xs relative overflow-hidden flex justify-center items-center h-14 hover:bg-gray-900 transition-colors"
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      `Pay $${total}`
                    )}
                  </button>
                  <button 
                    onClick={() => setStep('shipping')}
                    className="w-full mt-4 text-center text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                  >
                    Back to Shipping
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary sidebar */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white p-8 border border-gray-100 sticky top-28">
              <h2 className="text-lg font-medium uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="space-y-6 mb-6 max-h-[40vh] overflow-y-auto hide-scrollbar">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-24 object-cover" />
                    <div className="flex-1 text-sm">
                      <p className="font-serif leading-tight mb-1">{item.product.name}</p>
                      <p className="text-gray-500 text-xs">Qty: {item.quantity} {item.size ? `| Size: ${item.size}` : ''}</p>
                      <p className="font-medium mt-1">${item.product.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4 text-sm">
                <div className="flex gap-2">
                  <input type="text" placeholder="Promo Code" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black uppercase tracking-widest" />
                  <button className="bg-black text-white px-6 uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors">Apply</button>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <span className="text-gray-500 uppercase text-xs tracking-widest">Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase text-xs tracking-widest">Shipping</span>
                  <span>Complimentary</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between font-medium">
                  <span className="uppercase text-xs tracking-widest">Total</span>
                  <span className="font-serif text-xl border-b border-black pb-0.5">${total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
