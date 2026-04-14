'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

interface MenuItemCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    is_available: boolean;
  };
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { items, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => updateQuantity(item.id, item.name, item.price, 1);
  const handleRemove = () => updateQuantity(item.id, item.name, item.price, -1);

  return (
    <div className="flex gap-5 p-5 bg-[#f9f6f1] rounded-[28px] border border-[#e8e2d8] shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:bg-white active:scale-[0.98]">
      <div className="relative w-32 h-32 shrink-0 rounded-[20px] overflow-hidden bg-[#f0ecdf] shadow-inner">
        {item.image_url && !imgError ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 128px, 128px"
            unoptimized={process.env.NODE_ENV !== 'production'}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f0ecdf]">
             <div className="relative w-12 h-12 opacity-30">
               <Image src="/logo.png" alt="Epilogi" fill className="object-contain" />
             </div>
          </div>
        )}
        {!item.is_available && (
          <div className="absolute inset-0 bg-[#f9f6f1]/60 flex items-center justify-center backdrop-blur-[2px]">
            <span className="text-primary text-[10px] tracking-widest uppercase font-bold px-3 py-1 bg-[#e8e2d8]/90 rounded-full shadow-sm">Habis</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow py-1 justify-between">
        <div className="pr-2">
          <h3 className="font-serif text-[22px] font-bold text-primary leading-tight mb-2">
            {item.name}
          </h3>
          <p className="text-foreground/80 font-semibold font-sans tracking-tight">
            Rp {item.price.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="flex justify-end items-center mt-auto pb-1">
          {quantity > 0 ? (
            <div className="flex items-center gap-3 bg-white rounded-full border border-border p-1 shadow-sm">
              <button
                onClick={handleRemove}
                className="w-[34px] h-[34px] flex items-center justify-center rounded-full bg-muted/50 text-foreground hover:bg-muted active:scale-90 transition-transform"
                aria-label="Kurangi"
              >
                <Minus className="w-5 h-5" strokeWidth={2.5} />
              </button>
              <span className="w-6 text-center font-bold text-primary text-lg">{quantity}</span>
              <button
                onClick={handleAdd}
                disabled={!item.is_available}
                className="w-[34px] h-[34px] flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 active:scale-90 transition-transform disabled:opacity-50"
                aria-label="Tambah"
              >
                <Plus className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={handleAdd}
              disabled={!item.is_available}
              className="rounded-full px-6 py-4 border-primary text-primary hover:bg-primary hover:text-white font-semibold tracking-wide bg-white"
            >
              Tambah
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
