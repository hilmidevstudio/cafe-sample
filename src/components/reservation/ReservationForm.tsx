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

  const [dates, setDates] = useState<Array<{formatted: string, display: string}>>([]);

  // Generate next 7 days for the date picker (on client side to ensure real-time accuracy and prevent SSR mismatch)
  React.useEffect(() => {
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
    setDates(list);
  }, []);

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !pax) {
      setError('Silakan lengkapi tanggal, jam, dan jumlah orang.');
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
    <form onSubmit={handleReservation} className="bg-white/40 p-6 sm:p-8 rounded-[32px] shadow-2xl border-2 border-white/50 w-full max-w-md mx-auto backdrop-blur-3xl transition-all duration-500 hover:shadow-3xl">
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
            <div className="relative animate-in fade-in zoom-in-95 duration-300 bg-white/80 border border-[#e8e2d8] rounded-2xl shadow-inner focus-within:ring-2 focus-within:ring-primary flex items-center justify-center min-h-[64px]">
              
              <select
                value={time ? time.split(':')[0] : "15"}
                onChange={(e) => {
                  const m = time ? time.split(':')[1] : "00";
                  setTime(`${e.target.value}:${m}`);
                  setError('');
                }}
                className="appearance-none bg-transparent text-2xl font-bold text-primary text-right outline-none cursor-pointer py-4 pl-8 pr-2 z-10"
                style={{ WebkitAppearance: 'none' }}
              >
                <option value="" disabled>Jam</option>
                {Array.from({length: 10}, (_, i) => i + 13).map(h => {
                  const hr = h.toString().padStart(2, '0');
                  return <option key={hr} value={hr}>{hr}</option>
                })}
              </select>

              <span className="text-2xl font-bold text-primary pb-1 pointer-events-none">:</span>

              <select
                value={time ? time.split(':')[1] : "00"}
                onChange={(e) => {
                  const h = time ? time.split(':')[0] : "15";
                  setTime(`${h}:${e.target.value}`);
                  setError('');
                }}
                className="appearance-none bg-transparent text-2xl font-bold text-primary text-left outline-none cursor-pointer py-4 pr-10 pl-2 z-10"
                style={{ WebkitAppearance: 'none' }}
              >
                <option value="" disabled>Mnt</option>
                {['00','15','30','45'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              {/* Initialize default time if empty on first click/focus to ensure UX flow */}
              {!time && (
                <div 
                  className="absolute inset-0 z-20 cursor-pointer"
                  onClick={() => { setTime("15:00"); setError(''); }}
                />
              )}

              {/* Custom Icon Layer */}
              <div className="absolute right-4 text-primary pointer-events-none z-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
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
            Jumlah Orang
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
