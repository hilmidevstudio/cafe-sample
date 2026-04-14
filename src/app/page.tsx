import React from 'react';
import Image from 'next/image';
import { getLocations } from '@/lib/api';
import { LocationSelector } from '@/components/home/LocationSelector';

export default async function Home() {
  const locations = await getLocations();

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 bg-background relative min-h-screen overflow-hidden">
      {/* Premium Cafe Background Texture/Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted via-background to-background pointer-events-none" />
      
      {/* Soft Botanical Overlay via Physical SVG Asset */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/ornaments/leaf.svg')", backgroundSize: '30px 30px' }} />

      {/* Hero Header Organic Accent behind title */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center mt-6">
        
        <div className="mb-4">
          <Image 
            src="/logo.png" 
            alt="Cafe Sample" 
            width={80} 
            height={80} 
            className="object-contain" 
            priority
          />
        </div>
        
        <h1 className="font-serif text-[42px] font-bold text-primary mb-3 tracking-tight leading-tight">
          Pilih lokasi Cafe Sample
        </h1>
        <p className="text-foreground/70 mb-12 font-medium text-lg px-4 leading-relaxed">
          Kami siap melayani Anda. Silakan pilih lokasi terdekat.
        </p>

        <LocationSelector locations={locations} />
      </div>
    </main>
  );
}
