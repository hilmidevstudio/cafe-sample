'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

interface ReservationFormProps {
  locationId: string;
  locationName: string;
  locationPhone: string;
}

export function ReservationForm({ locationId, locationName, locationPhone }: ReservationFormProps) {
  const router = useRouter();
  const { setReservationDetails, setMode } = useCart();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [pax, setPax] = useState('');
  const [error, setError] = useState('');

  // Generate next 7 days for the date picker
  const dates = useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      
      const dayName = d.toLocaleDateString('id-ID', { weekday: 'short' });
      const dayNum = d.toLocaleDateString('id-ID', { day: 'numeric' });
      const month = d.toLocaleDateString('id-ID', { month: 'short' });
      const formatted = d.toISOString().split('T')[0]; // YYYY-MM-DD
      
      list.push({ 
        formatted, 
        display: `${i === 0 ? 'Hari Ini' : dayName + ', ' + dayNum + ' ' + month}` 
      });
    }
    return list;
  }, []);

  // Generate daily time slots (e.g. 15:00 to 22:00)
  const timeSlots = [
    "15:00", "15:30", "16:00", "16:30", 
    "17:00", "17:30", "18:00", "18:30", 
    "19:00", "19:30", "20:00", "20:30", 
    "21:00", "21:30", "22:00"
  ];

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
      setError('Silakan pilih jadwal tanggal dan jam terlebih dahulu.');
      return;
    }
    setError('');
    
    // Convert date back to a friendly format for WhatsApp view later
    const selectedDateObj = dates.find(d => d.formatted === date);
    const friendlyDate = selectedDateObj ? selectedDateObj.display : date;

    setReservationDetails({ date: friendlyDate, time, pax });
    setMode('reservation');
    router.push(`/${locationId}/order`);
  };

  return (
    <form onSubmit={handleReservation} className="bg-[#fcfaf5]/60 p-6 sm:p-8 rounded-[32px] shadow-sm border border-[#e8e2d8] w-full max-w-md mx-auto backdrop-blur-md">
      <div className="text-center mb-8">
        <h2 className="font-serif text-[28px] text-primary font-bold leading-tight tracking-tight mb-2">Jadwal<br/>Reservasi</h2>
        <p className="text-foreground/60 text-sm font-medium">Tentukan waktu yang tepat untuk kunjungan Anda.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50/80 border border-red-100 flex gap-3 text-red-800 backdrop-blur-sm animate-in fade-in zoom-in-95">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}
      
      <div className="space-y-8 mb-10">
        
        {/* Custom Date Selector */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-3 ml-1 tracking-wide">
            Pilih Tanggal
          </label>
          <div className="flex overflow-x-auto pb-4 -mx-1 px-1 gap-3 no-scrollbar snap-x">
            {dates.map((d) => (
              <button
                key={d.formatted}
                type="button"
                onClick={() => { setDate(d.formatted); setError(''); }}
                className={`snap-center shrink-0 w-28 py-3.5 px-2 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center gap-1 active:scale-95 ${
                  date === d.formatted 
                  ? 'bg-primary border-primary text-white shadow-md' 
                  : 'bg-white border-[#e8e2d8] text-foreground hover:bg-[#f9f6f1]'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-widest ${date === d.formatted ? 'text-white/80' : 'text-accent'}`}>
                  {d.display === 'Hari Ini' ? 'Hari Ini' : d.display.split(',')[0]}
                </span>
                <span className={`text-xl font-serif font-bold leading-none ${date === d.formatted ? 'text-white' : 'text-primary'}`}>
                  {d.display === 'Hari Ini' ? new Date().getDate() : d.display.split(',')[1].split(' ')[1]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Time Selector */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-3 ml-1 tracking-wide">
            Pilih Jam
          </label>
          {date ? (
            <div className="grid grid-cols-4 gap-2.5">
              {timeSlots.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setTime(t); setError(''); }}
                  className={`py-2.5 rounded-xl border text-sm font-bold transition-all duration-200 active:scale-95 ${
                    time === t 
                    ? 'bg-primary border-primary text-white shadow-md' 
                    : 'bg-white border-[#e8e2d8] text-foreground/80 hover:bg-[#f9f6f1]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          ) : (
            <div className="w-full py-8 rounded-2xl border border-dashed border-[#e8e2d8] text-center text-foreground/40 font-medium text-sm">
              Pilih tanggal terlebih dahulu
            </div>
          )}
        </div>

        {/* Pax Input */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-3 ml-1 tracking-wide">
            Jumlah Meja / Orang <span className="text-foreground/40 font-normal">(Opsional)</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Users className="w-5 h-5 text-accent group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={pax}
              onChange={(e) => setPax(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="Contoh: 4"
              className="block w-full pl-12 pr-4 py-3.5 border border-[#e8e2d8] rounded-2xl text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white/80 font-bold transition-all placeholder:text-foreground/30 placeholder:font-medium shadow-sm"
            />
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full text-[15px] font-bold shadow-md tracking-wide py-6 rounded-2xl">
        Selanjutnya
      </Button>
    </form>
  );
}
