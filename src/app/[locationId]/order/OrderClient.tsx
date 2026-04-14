'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { CategoryTabs } from '@/components/layout/CategoryTabs';
import { SubcategorySection } from '@/components/layout/SubcategorySection';
import { CartBar } from '@/components/cart/CartBar';

interface OrderClientProps {
  location: any;
  menu: any[];
}

export function OrderClient({ location, menu }: OrderClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('food');

  const categories = [
    { id: 'food', label: 'Makanan' },
    { id: 'drink', label: 'Minuman' },
  ];

  // Filter menu by category
  const filteredMenu = useMemo(() => {
    return menu.filter((item) => item.category === activeCategory);
  }, [menu, activeCategory]);

  // Group by subcategory
  const groupedMenu = useMemo(() => {
    const groups: Record<string, any[]> = {};
    filteredMenu.forEach(item => {
      if (!groups[item.subcategory]) {
        groups[item.subcategory] = [];
      }
      groups[item.subcategory].push(item);
    });
    return groups;
  }, [filteredMenu]);

  return (
    <div className="flex flex-col min-h-screen bg-background relative pb-28">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md pt-5 pb-3 px-4 shadow-sm border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/${location.id}`} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors text-foreground/70 active:scale-95">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-accent font-bold mb-0.5">Membaca Menu</span>
            <h1 className="font-serif text-xl font-bold text-primary leading-none">{location.name}</h1>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#e8e2d8] p-1 flex items-center justify-center">
          <Image src="/logo.png" alt="Cafe Sample" width={32} height={32} className="object-contain" style={{ width: 'auto', height: 'auto' }} />
        </div>
      </div>

      <div className="pt-6 pb-20 max-w-md mx-auto w-full relative">
        {/* Soft Botanical Overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none -z-10" style={{ backgroundImage: "url('/ornaments/leaf.svg')", backgroundSize: '30px 30px' }} />
        {/* Decorative element */}
        <div className="absolute top-32 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <CategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelect={setActiveCategory} 
        />

        <div className="flex flex-col">
          {Object.entries(groupedMenu).map(([subcategory, items]) => (
            <SubcategorySection 
              key={subcategory} 
              title={subcategory} 
              items={items} 
            />
          ))}
          {Object.keys(groupedMenu).length === 0 && (
            <div className="text-center py-10 text-foreground/50">
              Belum ada menu di kategori ini.
            </div>
          )}
        </div>
      </div>

      <CartBar 
        locationId={location.id} 
        locationName={location.name} 
        locationPhone={location.phone} 
      />
    </div>
  );
}
