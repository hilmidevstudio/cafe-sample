import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export function LocationSelector({ locations }: { locations: Location[] }) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      {locations.map((loc) => (
        <Link key={loc.id} href={`/${loc.id}`} className="block w-full">
          <div className="w-full flex flex-col items-start h-auto p-5 text-left bg-muted rounded-2xl shadow-sm border border-border hover:shadow-md hover:border-primary/30 transition-all active:scale-[0.98]">
            <div className="flex items-center gap-3 mb-1.5 w-full">
              <div className="bg-white p-2.5 rounded-full shadow-sm border border-border/50 shrink-0">
                <MapPin className="w-5 h-5 text-accent" strokeWidth={2.5} />
              </div>
              <span className="font-serif text-[22px] font-semibold text-primary leading-tight">
                {loc.name}
              </span>
            </div>
            <span className="text-sm text-muted-foreground ml-[52px] font-medium tracking-wide">
              {loc.address}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
