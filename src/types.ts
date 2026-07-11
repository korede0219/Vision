/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'living-room' | 'bedroom' | 'dining' | 'office' | 'outdoor' | 'lighting' | 'accessories';
  subcategory: string;
  collection: 'ethos' | 'heritage' | 'atelier' | 'natura';
  price: number;
  tag: 'new' | 'bestseller' | 'limited' | '';
  material: string;
  leadTime: string;
  image: string;
  hoverImage: string;
  description: string;
  // Detail page specifics
  dimensions: string;
  weight: string;
  origin: string;
  colors: string[]; // hex codes or colors
  colorNames: string[]; // readable names
  gallery: string[]; // 5 images (index 0 is main, 1-4 are thumbnails)
  fullDescription: string;
  materialsCraftsmanship: string;
  deliveryLeadTime: string;
  careInstructions: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface SearchResult {
  product: Product;
  relevance: number;
}
