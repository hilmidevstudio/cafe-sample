import React from 'react';
import { MenuItemCard } from '@/components/menu/MenuItemCard';

interface SubcategorySectionProps {
  title: string;
  items: any[];
}

export function SubcategorySection({ title, items }: SubcategorySectionProps) {
  // Replace underscores with spaces and capitalize words
  const formattedTitle = title
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  if (items.length === 0) return null;

  return (
    <section className="mb-14 px-4">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px bg-[#e8e2d8] flex-grow mt-1" />
        <div className="flex items-center gap-2 px-2">
          <span className="text-[#b89162] text-[10px]">✿</span>
          <h2 className="font-serif text-[26px] font-bold text-primary tracking-tight whitespace-nowrap">{formattedTitle}</h2>
          <span className="text-[#b89162] text-[10px]">✿</span>
        </div>
        <div className="h-px bg-[#e8e2d8] flex-grow mt-1" />
      </div>
      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
