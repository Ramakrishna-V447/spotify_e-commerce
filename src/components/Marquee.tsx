import { motion } from 'motion/react';

const messages = [
  "COMPLIMENTARY SHIPPING ON ALL ORDERS",
  "NEW FALL COLLECTION ARRIVED",
  "PRIVATE SALE: UP TO 30% OFF",
  "COMPLIMENTARY SHIPPING ON ALL ORDERS",
  "NEW FALL COLLECTION ARRIVED",
  "PRIVATE SALE: UP TO 30% OFF"
];

export default function Marquee() {
  return (
    <div className="bg-[#111] text-white py-2 overflow-hidden flex whitespace-nowrap">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
        className="flex space-x-12"
      >
        {messages.map((text, i) => (
          <span key={i} className="text-xs uppercase tracking-[0.2em] px-6">
            {text}
          </span>
        ))}
      </motion.div>
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
        className="flex space-x-12"
      >
        {messages.map((text, i) => (
          <span key={i+10} className="text-xs uppercase tracking-[0.2em] px-6">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
