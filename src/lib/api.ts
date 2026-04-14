export async function getLocations() {
  const { locations } = await import('@/app/api/locations/route');
  return locations;
}

export async function getMenu() {
  const { menu } = await import('@/app/api/menu/route');
  return menu;
}

export async function getLocationById(id: string) {
  const locations = await getLocations();
  return locations.find((l: any) => l.id === id);
}
