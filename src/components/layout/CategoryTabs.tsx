import React from 'react';
import { cn } from '@/components/ui/Button';

interface CategoryTabsProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

export function CategoryTabs({ categories, activeCategory, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto no-scrollbar scroll-smooth px-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={cn(
            'pb-3 font-medium transition-colors relative whitespace-nowrap text-lg',
            activeCategory === cat.id ? 'text-primary' : 'text-foreground/50 hover:text-foreground/80'
          )}
        >
          {cat.label}
          {activeCategory === cat.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
}
