import { NextResponse } from 'next/server';

export const locations = [
  {
    id: "lokasi-1",
    name: "Cafe Sample Lokasi 1",
    address: "Ngadisimo 1 No 7, Kediri",
    phone: "628132992484"
  },
  {
    id: "lokasi-2",
    name: "Cafe Sample Lokasi 2",
    address: "Panjalu Padel Club, Kediri",
    phone: "628132992484"
  }
];

export async function GET() {
  return NextResponse.json(locations);
}
