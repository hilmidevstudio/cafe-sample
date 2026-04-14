import React from 'react';
import { notFound } from 'next/navigation';
import { getLocationById, getMenu } from '@/lib/api';
import { OrderClient } from './OrderClient';

export default async function OrderPage({ params }: { params: { locationId: string } }) {
  const { locationId } = await Promise.resolve(params);
  const location = await getLocationById(locationId);
  const menu = await getMenu();

  if (!location) {
    notFound();
  }

  return <OrderClient location={location} menu={menu} />;
}
