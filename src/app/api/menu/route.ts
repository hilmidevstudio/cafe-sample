import { NextResponse } from 'next/server';

function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

const rawMenu = [
  // FOOD - Breakfast
  { id: 'f-bf-1', name: 'Big Brekkie', price: 65000, category: 'food', subcategory: 'breakfast', is_available: true },
  { id: 'f-bf-2', name: 'Mushroom Pesto Sandwich', price: 55000, category: 'food', subcategory: 'breakfast', is_available: true },
  { id: 'f-bf-3', name: 'Morning Bagel', price: 45000, category: 'food', subcategory: 'breakfast', is_available: true },

  // FOOD - Main Course
  { id: 'f-mc-1', name: 'Hamburg Steak', price: 85000, category: 'food', subcategory: 'main_course', is_available: true },
  { id: 'f-mc-2', name: 'Beef Stew', price: 75000, category: 'food', subcategory: 'main_course', is_available: true },

  // FOOD - Rice Bowl
  { id: 'f-rb-1', name: 'Thai Beef Basil', price: 60000, category: 'food', subcategory: 'rice_bowl', is_available: true },
  { id: 'f-rb-2', name: 'Cumi Asin', price: 55000, category: 'food', subcategory: 'rice_bowl', is_available: true },
  { id: 'f-rb-3', name: 'Ayam Geprek', price: 45000, category: 'food', subcategory: 'rice_bowl', is_available: true },

  // FOOD - Snack
  { id: 'f-sn-1', name: 'Truflle Fries', price: 40000, category: 'food', subcategory: 'snack', is_available: true },
  { id: 'f-sn-2', name: 'Snack Platter', price: 65000, category: 'food', subcategory: 'snack', is_available: true },

  // DRINK - Coffee
  { id: 'd-cf-1', name: 'Espresso', price: 25000, category: 'drink', subcategory: 'coffee', is_available: true },
  { id: 'd-cf-2', name: 'Americano', price: 30000, category: 'drink', subcategory: 'coffee', is_available: true },
  { id: 'd-cf-3', name: 'Café Latte', price: 38000, category: 'drink', subcategory: 'coffee', is_available: true },

  // DRINK - Milk Based
  { id: 'd-mb-1', name: 'Kopi Susu Epilogi', price: 35000, category: 'drink', subcategory: 'milk_based', is_available: true },
  { id: 'd-mb-2', name: 'Kopi Susu Pandan', price: 38000, category: 'drink', subcategory: 'milk_based', is_available: true },

  // DRINK - Non Coffee
  { id: 'd-nc-1', name: 'Matcha Latte', price: 40000, category: 'drink', subcategory: 'non_coffee', is_available: true },
  { id: 'd-nc-2', name: 'Taro Latte', price: 38000, category: 'drink', subcategory: 'non_coffee', is_available: true }
];

export const menu = rawMenu.map(item => ({
  ...item,
  image_url: `/images/menu/${slugify(item.name)}.jpg`
}));

export async function GET() {
  return NextResponse.json(menu);
}
