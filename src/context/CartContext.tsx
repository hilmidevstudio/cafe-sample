'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ReservationDetails {
  date: string;
  time: string;
  pax: string;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  itemCount: number;
  mode: 'order' | 'reservation';
  reservationDetails: ReservationDetails | null;
  setMode: (mode: 'order' | 'reservation') => void;
  setReservationDetails: (details: ReservationDetails) => void;
  updateQuantity: (id: string, name: string, price: number, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mode, setMode] = useState<'order' | 'reservation'>('order');
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails | null>(null);

  const updateQuantity = (id: string, name: string, price: number, delta: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + delta;
        if (newQuantity <= 0) return prevItems.filter((item) => item.id !== id);
        return prevItems.map((item) => item.id === id ? { ...item, quantity: newQuantity } : item);
      }
      if (delta > 0) return [...prevItems, { id, name, price, quantity: delta }];
      return prevItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    setReservationDetails(null);
    setMode('order');
  };

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, total, itemCount, mode, reservationDetails, setMode, setReservationDetails, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart must be used within a CartProvider');
  return context;
}
