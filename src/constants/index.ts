import type { Product } from '../types'

export const PRODUCTS: Product[] = [
  { id: 1,  name: 'Dairy Milk 250ml',        sku: 'DML-250-NTL',  category: 'Dairy',         price: 180,  costPrice: 140, taxRate: 17, stock: 24, reorderPoint: 5,  unit: 'pcs', colorClass: 'c1', isActive: true },
  { id: 2,  name: 'Head & Shoulders 400ml',  sku: 'HS-400-PNG',   category: 'Personal Care', price: 650,  costPrice: 480, taxRate: 17, stock: 8,  reorderPoint: 3,  unit: 'pcs', colorClass: 'c2', isActive: true },
  { id: 3,  name: 'Peek Freans Sooper',      sku: 'PFS-PKT-EBM',  category: 'Snacks',        price: 95,   costPrice: 70,  taxRate: 17, stock: 48, reorderPoint: 10, unit: 'pcs', colorClass: 'c3', isActive: true },
  { id: 4,  name: 'Nestle Nido 400g',        sku: 'NND-400-NTL',  category: 'Dairy',         price: 1250, costPrice: 950, taxRate: 17, stock: 4,  reorderPoint: 5,  unit: 'pcs', colorClass: 'c1', isActive: true },
  { id: 5,  name: 'Safeguard Soap 120g',     sku: 'SGS-120-PNG',  category: 'Personal Care', price: 85,   costPrice: 60,  taxRate: 17, stock: 0,  reorderPoint: 5,  unit: 'pcs', colorClass: 'c2', isActive: true },
  { id: 6,  name: 'Nescafe 3in1 Sachet',     sku: 'NCF-3IN1-NTL', category: 'Beverages',     price: 45,   costPrice: 30,  taxRate: 17, stock: 60, reorderPoint: 10, unit: 'pcs', colorClass: 'c4', isActive: true },
  { id: 7,  name: 'Sunsilk Shampoo 200ml',   sku: 'SSL-200-UNL',  category: 'Personal Care', price: 280,  costPrice: 200, taxRate: 17, stock: 15, reorderPoint: 5,  unit: 'pcs', colorClass: 'c2', isActive: true },
  { id: 8,  name: 'Lipton Yellow Label',     sku: 'LPT-YL-UNL',   category: 'Beverages',     price: 420,  costPrice: 310, taxRate: 17, stock: 22, reorderPoint: 5,  unit: 'pcs', colorClass: 'c4', isActive: true },
  { id: 9,  name: 'LU Prince Biscuits',      sku: 'LU-PRN-LU',    category: 'Snacks',        price: 55,   costPrice: 40,  taxRate: 17, stock: 36, reorderPoint: 10, unit: 'pcs', colorClass: 'c3', isActive: true },
  { id: 10, name: 'Olpers Milk 1L',          sku: 'OLP-1L-EFL',   category: 'Dairy',         price: 220,  costPrice: 170, taxRate: 17, stock: 18, reorderPoint: 5,  unit: 'pcs', colorClass: 'c1', isActive: true },
  { id: 11, name: 'Surf Excel 500g',         sku: 'SFX-500-UNL',  category: 'Household',     price: 340,  costPrice: 250, taxRate: 17, stock: 12, reorderPoint: 5,  unit: 'pcs', colorClass: 'c3', isActive: true },
  { id: 12, name: 'Tapal Danedar 500g',      sku: 'TPL-DN-TPL',   category: 'Beverages',     price: 380,  costPrice: 280, taxRate: 17, stock: 9,  reorderPoint: 5,  unit: 'pcs', colorClass: 'c4', isActive: true },
]

export const CATEGORIES = ['All Products', 'Beverages', 'Dairy', 'Snacks', 'Household', 'Personal Care', 'Grocery']
