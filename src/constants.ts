/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'Breakfast' | 'Main Dishes' | 'Vegetarian' | 'Drinks' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  accent: string;
  tags: string[];
  calories: number;
  popular?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  // Breakfast
  {
    id: 'fir-fir',
    name: 'Quanta Fir-fir',
    description: 'Dried beef jerky strips sautéed with shredded injera, butter, and berbere.',
    price: 18.50,
    category: 'Breakfast',
    accent: 'bg-linear-to-br from-[#8B3A1A] to-[#C89B3C]',
    tags: ['Traditional', 'Spicy', 'High Protein'],
    calories: 650,
    popular: true
  },
  {
    id: 'chechebsa',
    name: 'Chechebsa',
    description: 'Crumbled kitcha bread fried with niter kibbeh and berbere. With honey.',
    price: 14.00,
    category: 'Breakfast',
    accent: 'bg-linear-to-br from-[#C89B3C] to-[#F5ECD7]',
    tags: ['Vegetarian', 'Sweet'],
    calories: 720
  },
  {
    id: 'genfo',
    name: 'Genfo',
    description: 'Stiff porridge made from barley or wheat flour, served with clarified spiced butter.',
    price: 12.50,
    category: 'Breakfast',
    accent: 'bg-linear-to-br from-[#B34D26] to-[#F5ECD7]',
    tags: ['Vegetarian', 'Cultural Heritage'],
    calories: 850
  },
  {
    id: 'ful',
    name: 'Ful Medames',
    description: 'Fava beans cooked with onions, tomatoes, and chilies. Served with bread.',
    price: 11.00,
    category: 'Breakfast',
    accent: 'bg-linear-to-br from-[#5D2B15] to-[#8B3A1A]',
    tags: ['Vegan', 'Healthy', 'Protein'],
    calories: 380
  },
  // Main Dishes
  {
    id: 'doro-wat',
    name: 'Doro Wat',
    description: 'National dish: chicken stewed in berbere with boiled eggs and spiced butter.',
    price: 24.00,
    category: 'Main Dishes',
    accent: 'bg-linear-to-br from-[#5D2B15] to-[#8B3A1A]',
    tags: ['Authentic', 'Spicy', 'National Favorite'],
    calories: 900,
    popular: true
  },
  {
    id: 'kitfo',
    name: 'Special Kitfo',
    description: 'Freshly minced lean beef seasoned with mitmita and niter kibbeh.',
    price: 22.00,
    category: 'Main Dishes',
    accent: 'bg-linear-to-br from-[#7A2B12] to-[#B34D26]',
    tags: ['Premium', 'Spicy', 'Low Carb'],
    calories: 480
  },
  {
    id: 'lamb-tibs',
    name: 'Lamb Tibs',
    description: 'Tender lamb cubes sautéed with butter, onions, peppers, and garlic.',
    price: 23.00,
    category: 'Main Dishes',
    accent: 'bg-linear-to-br from-[#5D2B15] to-[#7A2B12]',
    tags: ['Premium', 'Tender'],
    calories: 740,
    popular: true
  },
  {
    id: 'bozena-shiro',
    name: 'Bozena Shiro',
    description: 'Classic shiro stew made with beef cubes and simmered for hours.',
    price: 19.50,
    category: 'Main Dishes',
    accent: 'bg-linear-to-br from-[#967C30] to-[#5D2B15]',
    tags: ['Stew', 'Comfort Food'],
    calories: 590
  },
  // Vegetarian
  {
    id: 'veggie-combo',
    name: 'Beyaynetu',
    description: 'Colorful platter of lentils, chickpeas, cabbage, and beets on fresh injera.',
    price: 20.00,
    category: 'Vegetarian',
    accent: 'bg-linear-to-br from-[#2D4A22] to-[#F5ECD7]',
    tags: ['Vegan', 'Variety', 'Healthy'],
    calories: 520,
    popular: true
  },
  {
    id: 'shiro-wat',
    name: 'Shiro Wat',
    description: 'Slow-cooked chickpea flour stew with garlic, ginger, and berbere.',
    price: 16.00,
    category: 'Vegetarian',
    accent: 'bg-linear-to-br from-[#967C30] to-[#E5C97F]',
    tags: ['Vegan', 'Classic'],
    calories: 420
  },
  {
    id: 'misir-wat',
    name: 'Misir Wat',
    description: 'Red lentils stewed with onions, garlic, and rich berbere sauce.',
    price: 15.00,
    category: 'Vegetarian',
    accent: 'bg-linear-to-br from-[#8B3A1A] to-[#B34D26]',
    tags: ['Vegan', 'Spicy'],
    calories: 390
  },
  // Drinks
  {
    id: 'coffee',
    name: 'Ethiopian Coffee',
    description: 'Hand-roasted Arabica beans served in a small cup (Sini).',
    price: 4.50,
    category: 'Drinks',
    accent: 'bg-linear-to-br from-[#3D1E0B] to-[#1A0E06]',
    tags: ['Ceremonial', 'Caffeine'],
    calories: 5,
    popular: true
  }
];

export const CATEGORIES: Category[] = ['Breakfast', 'Main Dishes', 'Vegetarian', 'Drinks', 'Desserts'];
