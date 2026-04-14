import { NextResponse } from 'next/server';

export const locations = [
  {
    id: "ngadisimo",
    name: "Epilogi Ngadisimo",
    address: "Ngadisimo 1 No 7, Kediri",
    phone: "6282236353335"
  },
  {
    id: "panjalu",
    name: "Epilogi Panjalu",
    address: "Panjalu Padel Club, Kediri",
    phone: "6282236353335"
  }
];

export async function GET() {
  return NextResponse.json(locations);
}
