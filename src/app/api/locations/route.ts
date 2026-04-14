import { NextResponse } from 'next/server';

export const locations = [
  {
    id: "lokasi-1",
    name: "Cafe Sample Lokasi 1",
    address: "Jl. Sudirman No 123, Sample City",
    phone: "628132992484"
  },
  {
    id: "lokasi-2",
    name: "Cafe Sample Lokasi 2",
    address: "Kawasan Bisnis Sentral Blok B, Sample City",
    phone: "628132992484"
  }
];

export async function GET() {
  return NextResponse.json(locations);
}
