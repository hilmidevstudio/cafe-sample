'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

// Utility for building unified WA message based on mode
function generateWaLink(
  phone: string,
  locationName: string,
  customerName: string,
  items: any[],
  total: number,
  mode: 'order' | 'reservation',
  orderType: string,
  address: string,
  reservationDetails: any
) {
  const itemText = items
    .map((item) => `- ${item.name} (x${item.quantity})`)
    .join('\r\n');

  let text = '';

  if (mode === 'reservation') {
    text = "Halo Cafe Sample, saya ingin reservasi\r\n\r\n" +
           "\u{1F464} Atas Nama: " + customerName + "\r\n" +
           "\u{1F4CD} Lokasi: " + locationName + "\r\n\r\n" +
           "\u{1F4C5} Tanggal: " + (reservationDetails?.date || '') + "\r\n" +
           "\u23F0 Jam: " + (reservationDetails?.time || '') + "\r\n";
    if (reservationDetails?.pax) {
      text += "\u{1F465} Orang: " + reservationDetails.pax + "\r\n";
    }
    text += "\r\n\u{1F37D}\u{FE0F} Pesanan:\r\n" + itemText + "\r\n\r\n" +
            "\u{1F4B0} Estimasi: Rp " + total.toLocaleString('id-ID');
  } else {
    text = "Halo Cafe Sample, saya ingin pesan\r\n\r\n" +
           "\u{1F464} Atas Nama: " + customerName + "\r\n" +
           "\u{1F4CD} Lokasi: " + locationName + "\r\n\r\n" +
           "\u{1F37D}\u{FE0F} Pesanan:\r\n" + itemText + "\r\n\r\n" +
           "\u{1F4B0} Total: Rp " + total.toLocaleString('id-ID') + "\r\n\r\n" +
           "Untuk:\r\n- " + orderType + "\r\n";
    if (orderType === 'Delivery' && address) {
      text += "\r\nAlamat pengiriman:\r\n" + address;
    }
  }

  return buildWhatsAppUrl(phone, text);
}

interface CartBarProps {
  locationId: string;
  locationName: string;
  locationPhone: string;
}

export function CartBar({ locationId, locationName, locationPhone }: CartBarProps) {
  const { items, total, itemCount, mode, reservationDetails } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<string>('Dine In');
  const [address, setAddress] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  if (itemCount === 0) {
    if (isOpen) setIsOpen(false);
    return null;
  }

  const handleOrder = () => {
    if (!customerName.trim()) {
      setAlertMessage('Mohon isi kolom Atas Nama terlebih dahulu untuk memudahkan konfirmasi pesanan.');
      return;
    }
    if (mode === 'order' && orderType === 'Delivery' && !address.trim()) {
      setAlertMessage('Mohon isi alamat lengkap Anda untuk memproses pengiriman pesanan.');
      return;
    }
    const link = generateWaLink(
      locationPhone, 
      locationName, 
      customerName,
      items, 
      total, 
      mode, 
      orderType, 
      address, 
      reservationDetails
    );
    
    // Close cart UI immediately to prevent freeze bug on return
    setIsOpen(false);
    
    // Open in a new tab to avoid breaking the Next.js page state (bfcache)
    window.open(link, '_blank');
  };

  const btnText = mode === 'reservation' ? 'Reservasi + Pesan via WhatsApp' : 'Pesan via WhatsApp';
  const ctaBtnText = mode === 'reservation' ? 'Reservasi' : 'Pesan';

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-primary/20 z-40 backdrop-blur-[2px] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#f8f5ef] border-t border-border shadow-[0_-12px_40px_rgba(43,66,56,0.08)] transition-transform duration-300 rounded-t-[32px]`}
      >
        
        {isOpen && (
          <div className="p-6 max-h-[65vh] overflow-y-auto w-full max-w-md mx-auto no-scrollbar pb-32">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif font-bold text-2xl text-primary">Detail Pesanan</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 text-foreground/50 hover:bg-muted rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-5 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-base font-medium">
                  <div className="flex items-start gap-3">
                    <span className="font-bold inline-flex items-center justify-center w-7 h-7 bg-[#e0d6c8]/30 border border-[#e0d6c8] text-primary rounded-lg text-sm shrink-0">
                      {item.quantity}
                    </span>
                    <span className="text-foreground pt-0.5 leading-snug">{item.name}</span>
                  </div>
                  <span className="font-bold pt-0.5 text-primary text-right pl-2 shrink-0">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/80 p-5 rounded-3xl border border-border shadow-sm mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-foreground/70">Total Pesanan</span>
                <span className="font-serif font-bold text-xl text-primary">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Nama Pemesan (Wajib) */}
            <div className="bg-white/80 p-5 rounded-3xl border border-border shadow-sm mb-4">
              <label className="block text-sm font-semibold text-primary mb-2 ml-1">Atas Nama</label>
              <input
                type="text"
                placeholder="Masukkan nama Anda..."
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-border bg-[#f8f5ef] rounded-[18px] p-3.5 text-[15px] font-medium focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              />
            </div>

            {mode === 'order' && (
              <div className="bg-white/80 p-5 rounded-3xl border border-border shadow-sm">
                <h4 className="font-serif font-bold text-lg text-primary mb-4">Metode Pemesanan</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['Dine In', 'Takeaway', 'Delivery'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setOrderType(type)}
                      className={`py-3 px-1 text-sm rounded-xl border font-bold transition-all active:scale-[0.98] ${
                        orderType === type 
                          ? 'border-primary bg-primary text-primary-foreground shadow-sm' 
                          : 'border-border text-foreground/70 hover:bg-muted'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                
                {orderType === 'Delivery' && (
                  <div className="mt-5 animate-in fade-in slide-in-from-top-2">
                    <label className="block text-sm font-semibold text-primary mb-2 ml-1">Alamat Pengiriman</label>
                    <textarea
                      placeholder="Masukkan alamat lengkap..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border border-border bg-[#f8f5ef] rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary min-h-[100px] resize-none"
                    />
                  </div>
                )}
              </div>
            )}

            {mode === 'reservation' && (
               <div className="bg-white/80 p-5 rounded-3xl border border-border shadow-sm">
                 <h4 className="font-serif font-bold text-lg text-primary mb-2">Detail Buking</h4>
                 <div className="text-sm font-medium text-foreground/80 space-y-1">
                   <p>📅 {reservationDetails?.date}</p>
                   <p>⏰ {reservationDetails?.time}</p>
                   {reservationDetails?.pax && <p>👥 {reservationDetails.pax} Orang</p>}
                 </div>
               </div>
            )}
            
            {/* The final CTA button when expanded */}
            <div className="mt-6">
              <Button onClick={handleOrder} size="lg" className="w-full shadow-md text-[15px]">
                {btnText}
              </Button>
            </div>
          </div>
        )}

        {/* Compact Summary Bar (Always visible when items > 0) */}
        {!isOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-5 w-full max-w-md mx-auto bg-[#f8f5ef] rounded-t-[32px] border-t border-border/50 shadow-md">
            <div 
              className="flex items-center justify-between bg-primary text-primary-foreground p-3 pl-4 rounded-[20px] cursor-pointer shadow-lg hover:shadow-xl transition-all active:scale-[0.99] border border-primary/20"
              onClick={() => setIsOpen(true)}
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-2.5 rounded-xl border border-white/5">
                  <ShoppingBag className="w-6 h-6 text-accent" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-medium text-xs opacity-80 uppercase tracking-widest mb-0.5">{itemCount} item</p>
                  <p className="font-sans font-bold text-lg leading-tight tracking-tight">Rp {total.toLocaleString('id-ID')}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pr-1.5">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                  }}
                  className="bg-accent hover:bg-accent/90 text-white h-11 px-6 rounded-xl font-bold shadow-sm"
                >
                  {ctaBtnText}
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Custom Alert Modal matching Cafe Sample Aesthetic */}
      {alertMessage && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4 min-h-[100dvh] animate-in fade-in">
          <div className="bg-[#fcfaf5] border border-[#e8e2d8] rounded-[24px] p-6 w-full max-w-[320px] shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-12 h-12 bg-[#b89162]/10 text-[#b89162] rounded-full flex items-center justify-center mb-4">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-[22px] text-primary mb-2">Perhatian</h3>
            <p className="text-foreground/70 font-medium text-[15px] mb-8 leading-snug px-1">{alertMessage}</p>
            <Button onClick={() => setAlertMessage(null)} className="w-full h-[46px] rounded-[14px] text-[15px] font-bold shadow-md bg-primary hover:bg-primary/90 text-white active:scale-95 transition-all">
              Baik, Mengerti
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
