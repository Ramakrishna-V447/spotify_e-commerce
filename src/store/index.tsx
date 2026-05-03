import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';

type ViewState = {
  name: 'home' | 'product' | 'checkout';
  productId?: string;
};

interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

interface AppContextType {
  view: ViewState;
  setView: (view: ViewState) => void;
  cart: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ViewState>({ name: 'home' });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const addToCart = (product: Product, size?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1, size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <AppContext.Provider value={{
      view, setView,
      cart, addToCart, removeFromCart,
      isCartOpen, setIsCartOpen,
      wishlist, toggleWishlist
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}
