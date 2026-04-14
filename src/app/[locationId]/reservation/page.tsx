import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocationById } from '@/lib/api';
import { ReservationForm } from '@/components/reservation/ReservationForm';
import { ChevronLeft } from 'lucide-react';

export default async function ReservationPage({ params }: { params: { locationId: string } }) {
  const { locationId } = await Promise.resolve(params);
  const location = await getLocationById(locationId);

  if (!location) {
    notFound();
  }

  return (
    <main className="flex-1 flex flex-col p-6 bg-background relative min-h-screen">
      {/* Soft Botanical Overlay via Physical SVG Asset */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: "url('/ornaments/leaf.svg')", backgroundSize: '30px 30px' }} />

      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent rounded-b-[60px] pointer-events-none z-0" />

      <div className="w-full max-w-md mx-auto flex-1 flex flex-col pt-4 relative z-10">
        <Link href={`/${locationId}`} className="inline-flex items-center text-foreground/70 hover:text-primary transition-colors mb-10 w-max bg-white/60 px-4 py-2 rounded-full border border-border/80 shadow-sm backdrop-blur-sm">
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="font-semibold text-sm tracking-wide">Kembali</span>
        </Link>
        
        <div className="mb-10 text-center">
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">Reservasi Tempat</h1>
          <p className="text-foreground/70">{location.name}</p>
        </div>

        <ReservationForm 
          locationId={location.id} 
          locationName={location.name} 
          locationPhone={location.phone} 
        />
      </div>
    </main>
  );
}
