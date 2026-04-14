import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocationById } from '@/lib/api';
import { ShoppingBag, CalendarCheck, ChevronLeft } from 'lucide-react';

export default async function ActionPage({ params }: { params: { locationId: string } }) {
  const { locationId } = await Promise.resolve(params);
  const location = await getLocationById(locationId);

  if (!location) {
    notFound();
  }

  return (
    <main className="flex-1 flex flex-col p-6 bg-background relative min-h-screen">
      {/* Soft Botanical Overlay via Physical SVG Asset */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: "url('/ornaments/leaf.svg')", backgroundSize: '30px 30px' }} />

      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent rounded-bl-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#fcfaf5] to-transparent pointer-events-none z-0" />

      <div className="w-full max-w-md mx-auto flex-1 flex flex-col pt-8 z-10">
        <Link href="/" className="inline-flex items-center text-foreground/70 hover:text-primary transition-colors mb-10 w-max bg-white/60 px-4 py-2 rounded-full border border-border/80 shadow-sm">
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="font-semibold text-sm tracking-wide">Kembali</span>
        </Link>

        
        <div className="mb-12">
          <p className="text-accent font-medium uppercase tracking-[0.15em] text-xs mb-3">{location.name}</p>
          <h1 className="font-serif text-[40px] leading-tight font-bold text-primary mb-4">Mau apa<br/>hari ini?</h1>
          <p className="text-foreground/70 font-medium text-lg">Pesan langsung dari mejamu atau reservasi tempat untuk nanti.</p>
        </div>

        <div className="space-y-5">
          <Link href={`/${locationId}/order`} className="block group">
            <div className="bg-[#f0f4f1] p-6 rounded-3xl border border-[#d2dfd7] shadow-sm group-hover:shadow-lg transition-all flex flex-col gap-5 active:scale-[0.98]">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-inner">
                <ShoppingBag className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-primary mb-1">Pesanan Menu</h2>
                <p className="text-primary/70 font-medium">Lihat menu & pesan via WhatsApp</p>
              </div>
            </div>
          </Link>

          <Link href={`/${locationId}/reservation`} className="block group">
            <div className="bg-[#fcfaf5] p-6 rounded-3xl border border-[#e6e2d6] shadow-sm group-hover:shadow-lg transition-all flex flex-col gap-5 active:scale-[0.98]">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground shadow-inner">
                <CalendarCheck className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#614930] mb-1">Reservasi Tempat</h2>
                <p className="text-[#614930]/70 font-medium">Booking meja untuk makan di tempat</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
