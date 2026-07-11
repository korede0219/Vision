/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchOverlay from './components/SearchOverlay';
import WishlistDrawer from './components/WishlistDrawer';
import ConsultationModal from './components/ConsultationModal';
import ProductDetailModal from './components/ProductDetailModal';
import Homepage from './components/Homepage';
import CataloguePage from './components/CataloguePage';
import { Product } from './types';
import { CATALOGUE } from './data';

export default function App() {
  // Page Routing State
  const [currentPage, setCurrentPage] = useState<'home' | 'catalogue' | 'about' | 'consultation'>('home');

  // Overlay States
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  // Selected Data states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [consultationProducts, setConsultationProducts] = useState<Product[]>([]);

  // Persistent Wishlist State (using localStorage)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ad-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Home lookbook explore pass-through filters
  const [initialCollectionFilter, setInitialCollectionFilter] = useState<string | undefined>(undefined);
  const [initialTagFilter, setInitialTagFilter] = useState<string | undefined>(undefined);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('ad-wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Handle wishlist toggling
  const handleToggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  // Page navigation
  const handleNavigate = (page: 'home' | 'catalogue' | 'about' | 'consultation') => {
    setCurrentPage(page);
    setSearchQuery(''); // Clear active text searches on page routing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open product detail view
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  };

  // Handle consultation opening with attached items
  const handleOpenConsultationWithProducts = (products: Product[]) => {
    setConsultationProducts(products);
    setConsultationOpen(true);
  };

  const handleOpenConsultationGeneral = () => {
    setConsultationProducts([]);
    setConsultationOpen(true);
  };

  // Search Submit routing
  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setInitialCollectionFilter(undefined);
    setInitialTagFilter(undefined);
    setCurrentPage('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lookbook triggers from home
  const handleNavigateToCatalogueWithFilters = (filters?: { tag?: string; collection?: string }) => {
    if (filters) {
      if (filters.collection) {
        setInitialCollectionFilter(filters.collection);
        setInitialTagFilter(undefined);
      } else if (filters.tag) {
        setInitialTagFilter(filters.tag);
        setInitialCollectionFilter(undefined);
      }
    } else {
      setInitialCollectionFilter(undefined);
      setInitialTagFilter(undefined);
    }
    setSearchQuery('');
    setCurrentPage('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text flex flex-col justify-between selection:bg-gold-400 selection:text-black transition-colors duration-300">
      
      {/* Header element */}
      <Header
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenConsultation={handleOpenConsultationGeneral}
      />

      {/* Main viewport */}
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <Homepage
            onNavigateToCatalogue={handleNavigateToCatalogueWithFilters}
            onSelectProduct={handleSelectProduct}
            isWishlisted={(id) => wishlistIds.includes(id)}
            onToggleWishlist={handleToggleWishlist}
            onOpenConsultation={handleOpenConsultationGeneral}
          />
        ) : (
          <CataloguePage
            initialCollectionFilter={initialCollectionFilter}
            initialTagFilter={initialTagFilter}
            isWishlisted={(id) => wishlistIds.includes(id)}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
            onClearInitialFilters={() => {
              setInitialCollectionFilter(undefined);
              setInitialTagFilter(undefined);
            }}
            searchQuery={searchQuery}
          />
        )}
      </main>

      {/* Footer element */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultation={handleOpenConsultationGeneral}
      />

      {/* Real-time search overlay */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onOpenConsultation={handleOpenConsultationGeneral}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Right Drawer Wishlist Portfolio */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onSelectProduct={handleSelectProduct}
        onOpenConsultationWithProducts={handleOpenConsultationWithProducts}
      />

      {/* Dedicated Bespoke Consultation Form */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        selectedProducts={consultationProducts}
      />

      {/* Detail Showcase Lightbox Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={detailOpen}
        onClose={() => {
          setDetailOpen(false);
          setSelectedProduct(null);
        }}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onSelectProduct={handleSelectProduct}
        onOpenConsultationWithProducts={handleOpenConsultationWithProducts}
        wishlistIds={wishlistIds}
      />

    </div>
  );
}
