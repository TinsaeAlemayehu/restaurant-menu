/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Breakfast' | 'Main Dishes' | 'Vegetarian' | 'Drinks' | 'Desserts';
  accent: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // Breakfast
  {
    id: 'fir-fir',
    name: 'Quanta Fir-fir',
    description: 'Dried beef jerky strips sautéed with shredded injera, butter, and berbere.',
    price: 18.50,
    category: 'Breakfast',
    accent: 'bg-linear-to-br from-[#8B3A1A] to-[#C89B3C]'
  },
  {
    id: 'chechebsa',
    name: 'Chechebsa',
    description: 'Crumbled kitcha bread fried with niter kibbeh and berbere. With honey.',
    price: 14.00,
    category: 'Breakfast',
    accent: 'bg-linear-to-br from-[#C89B3C] to-[#F5ECD7]'
  },
  {
    id: 'genfo',
    name: 'Genfo',
    description: 'Stiff porridge made from barley or wheat flour, served with clarified spiced butter.',
    price: 12.50,
    category: 'Breakfast',
    accent: 'bg-linear-to-br from-[#B34D26] to-[#F5ECD7]'
  },
  {
    id: 'ful',
    name: 'Ful Medames',
    description: 'Fava beans cooked with onions, tomatoes, and chilies. Served with bread.',
    price: 11.00,
    category: 'Breakfast',
    accent: 'bg-linear-to-br from-[#5D2B15] to-[#8B3A1A]'
  },
  // Main Dishes
  {
    id: 'doro-wat',
    name: 'Doro Wat',
    description: 'National dish: chicken stewed in berbere with boiled eggs and spiced butter.',
    price: 24.00,
    category: 'Main Dishes',
    accent: 'bg-linear-to-br from-[#5D2B15] to-[#8B3A1A]'
  },
  {
    id: 'kitfo',
    name: 'Kitfo',
    description: 'Minced raw beef marinated in mitmita (spiced chili) and niter kibbeh.',
    price: 22.00,
    category: 'Main Dishes',
    accent: 'bg-linear-to-br from-[#7A2B12] to-[#B34D26]'
  },
  {
    id: 'tibs-charred',
    name: 'Derek Tibs',
    description: 'Charbroiled beef cubes sautéed with onions, green chilies, and herbs.',
    price: 21.00,
    category: 'Main Dishes',
    accent: 'bg-linear-to-br from-[#3D1E0B] to-[#5D2B15]'
  },
  {
    id: 'awaze-tibs',
    name: 'Awaze Tibs',
    description: 'Beef cubes sautéed with awaze sauce (berbere & wine), onions, and tomatoes.',
    price: 21.50,
    category: 'Main Dishes',
    accent: 'bg-linear-to-br from-[#8B3A1A] to-[#3D1E0B]'
  },
  {
    id: 'lamb-tibs',
    name: 'Lamb Tibs',
    description: 'Tender lamb cubes sautéed with butter, onions, peppers, and garlic.',
    price: 23.00,
    category: 'Main Dishes',
    accent: 'bg-linear-to-br from-[#5D2B15] to-[#7A2B12]'
  },
  {
    id: 'gored-gored',
    name: 'Gored Gored',
    description: 'Cubes of raw beef seasoned with niter kibbeh and awaze.',
    price: 22.50,
    category: 'Main Dishes',
    accent: 'bg-linear-to-br from-[#7A2B12] to-[#5D2B15]'
  },
  {
    id: 'bozena-shiro',
    name: 'Bozena Shiro',
    description: 'Classic shiro stew made with beef cubes and simmered for hours.',
    price: 19.50,
    category: 'Main Dishes',
    accent: 'bg-linear-to-br from-[#967C30] to-[#5D2B15]'
  },
  {
    id: 'key-wat',
    name: 'Key Wat',
    description: 'Beef stew simmered in a red berbere sauce with an array of spices.',
    price: 20.00,
    category: 'Main Dishes',
    accent: 'bg-linear-to-br from-[#8B3A1A] to-[#7A2B12]'
  },
  // Vegetarian
  {
    id: 'veggie-combo',
    name: 'Beyaynetu',
    description: 'Colorful platter of lentils, chickpeas, cabbage, and beets on fresh injera.',
    price: 20.00,
    category: 'Vegetarian',
    accent: 'bg-linear-to-br from-[#2D4A22] to-[#F5ECD7]'
  },
  {
    id: 'shiro',
    name: 'Shiro Wat',
    description: 'Powdered chickpeas cooked with garlic, onions, and spicy berbere.',
    price: 16.00,
    category: 'Vegetarian',
    accent: 'bg-linear-to-br from-[#967C30] to-[#E5C97F]'
  },
  {
    id: 'misir-wat',
    name: 'Misir Wat',
    description: 'Red lentils stewed with onions, garlic, and rich berbere sauce.',
    price: 15.00,
    category: 'Vegetarian',
    accent: 'bg-linear-to-br from-[#8B3A1A] to-[#B34D26]'
  },
  {
    id: 'kik-alicha',
    name: 'Kik Alicha',
    description: 'Yellow split peas cooked in a mild turmeric sauce with ginger.',
    price: 14.50,
    category: 'Vegetarian',
    accent: 'bg-linear-to-br from-[#C89B3C] to-[#E5C97F]'
  },
  {
    id: 'gomen',
    name: 'Gomen',
    description: 'Collard greens sautéed with onions, garlic, and ginger.',
    price: 14.00,
    category: 'Vegetarian',
    accent: 'bg-linear-to-br from-[#2D4A22] to-[#3D4A1E]'
  },
  {
    id: 'buticha',
    name: 'Buticha',
    description: 'Ground chickpeas dip mixed with oil, lemon, onions, and green chilies.',
    price: 13.50,
    category: 'Vegetarian',
    accent: 'bg-linear-to-br from-[#E5C97F] to-[#2D4A22]'
  },
  // Drinks
  {
    id: 'tej',
    name: 'Tej (Honey Wine)',
    description: 'Traditional Ethiopian honey wine infused with gesho leaves.',
    price: 9.00,
    category: 'Drinks',
    accent: 'bg-linear-to-br from-[#E5C97F] to-[#C89B3C]'
  },
  {
    id: 'coffee',
    name: 'Ethiopian Coffee',
    description: 'Hand-roasted Arabica beans served in a small cup (Sini).',
    price: 4.50,
    category: 'Drinks',
    accent: 'bg-linear-to-br from-[#3D1E0B] to-[#1A0E06]'
  },
  {
    id: 'spiced-tea',
    name: 'Spiced Tea',
    description: 'Black tea infused with cardamom, cinnamon, and cloves.',
    price: 3.50,
    category: 'Drinks',
    accent: 'bg-linear-to-br from-[#8B3A1A] to-[#F5ECD7]'
  },
  // Desserts
  {
    id: 'baklava',
    name: 'Honey Baklava',
    description: 'Layers of filo pastry filled with chopped nuts and honey syrup.',
    price: 8.50,
    category: 'Desserts',
    accent: 'bg-linear-to-br from-[#8B3A1A] to-[#F5ECD7]'
  }
];

export const CATEGORIES = ['Breakfast', 'Main Dishes', 'Vegetarian', 'Drinks', 'Desserts'] as const;
