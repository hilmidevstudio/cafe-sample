export function buildWhatsAppUrl(phone: string, message: string) {
  // Use standard native encoding, api.whatsapp.com is more robust for emojis than wa.me
  const encoded = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
}
