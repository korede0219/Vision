/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Grid, List, ChevronDown, RefreshCw, Layers } from 'lucide-react';
import { Product } from '../types';
import { CATALOGUE } from '../data';
import ProductCard from './ProductCard';

interface CataloguePageProps {
  initialTagFilter?: string;
  initialCollectionFilter?: string;
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
  onClearInitialFilters: () => void;
  searchQuery?: string;
}

const CATEGORY_TABS: { id: string; label: string; subcategories: string[] }[] = [
  { id: 'all', label: 'All Pieces', subcategories: [] },
  { id: 'living-room', label: 'Living Room', subcategories: ['Sofas', 'Lounge Chairs', 'Coffee Tables', 'Side Tables', 'TV Units'] },
  { id: 'bedroom', label: 'Bedroom', subcategories: ['Beds & Headboards', 'Wardrobes', 'Dressers', 'Nightstands', 'Bedroom Benches'] },
  { id: 'dining', label: 'Dining Room', subcategories: ['Dining Tables', 'Dining Chairs', 'Sideboards', 'Bar Carts', 'Wine Racks'] },
  { id: 'office', label: 'Executive Office', subcategories: ['Executive Desks', 'Office Chairs', 'Bookshelves', 'Filing Cabinets'] },
  { id: 'outdoor', label: 'Outdoor Patio', subcategories: ['Outdoor Sofas', 'Outdoor Dining', 'Sun Loungers', 'Outdoor Chairs'] },
  { id: 'lighting', label: 'Lighting', subcategories: ['Floor Lamps', 'Table Lamps', 'Pendant Lights'] },
  { id: 'accessories', label: 'Accessories', subcategories: ['Rugs', 'Mirrors', 'Decorative Objects'] }
];

export default function CataloguePage({
  initialTagFilter,
  initialCollectionFilter,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onClearInitialFilters,
  searchQuery
}: CataloguePageProps) {
  
  // States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default'); // default, price-asc, price-desc, tag-new
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState<number>(24);

  // Apply initial filters if passed from homepage
  useEffect(() => {
    if (initialCollectionFilter) {
      setSelectedCollection(initialCollectionFilter);
      setSelectedCategory('all');
      setSelectedSubcategories([]);
      onClearInitialFilters();
    }
  }, [initialCollectionFilter]);

  useEffect(() => {
    if (initialTagFilter) {
      if (initialTagFilter === 'new') {
        setSortBy('tag-new');
      }
      setSelectedCategory('all');
      setSelectedSubcategories([]);
      setSelectedCollection('all');
      onClearInitialFilters();
    }
  }, [initialTagFilter]);

  // Reset subcategories when category changes
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubcategories([]);
    setVisibleCount(24); // reset pagination
  };

  // Toggle subcategory pill
  const handleToggleSubcategory = (sub: string) => {
    setSelectedSubcategories((prev) => {
      if (prev.includes(sub)) {
        return prev.filter((s) => s !== sub);
      } else {
        return [...prev, sub];
      }
    });
    setVisibleCount(24); // reset pagination
  };

  // Get active subcategories list
  const activeCategoryObj = useMemo(() => {
    return CATEGORY_TABS.find((tab) => tab.id === selectedCategory);
  }, [selectedCategory]);

  // Combined Filtering and Sorting logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...CATALOGUE];

    // 1. Text Search query filter
    if (searchQuery && searchQuery.trim() !== '') {
      const s = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.subcategory.toLowerCase().includes(s) ||
          p.material.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s) ||
          p.collection.toLowerCase().includes(s)
      );
    }

    // 2. Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 3. Subcategory Filter (supports multi-select)
    if (selectedSubcategories.length > 0) {
      result = result.filter((p) => selectedSubcategories.includes(p.subcategory));
    }

    // 4. Collection Filter
    if (selectedCollection !== 'all') {
      result = result.filter((p) => p.collection === selectedCollection);
    }

    // 5. Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'tag-new') {
      // Prioritize new arrivals, then preserve natural ordering
      result.sort((a, b) => {
        if (a.tag === 'new' && b.tag !== 'new') return -1;
        if (a.tag !== 'new' && b.tag === 'new') return 1;
        return 0;
      });
    }

    return result;
  }, [selectedCategory, selectedSubcategories, selectedCollection, sortBy, searchQuery]);

  // Paginated list
  const paginatedProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(0, visibleCount);
  }, [filteredAndSortedProducts, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 24, filteredAndSortedProducts.length));
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubcategories([]);
    setSelectedCollection('all');
    setSortBy('default');
    setVisibleCount(24);
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* 1. HERO BANNER */}
      <section className="bg-theme-panel py-16 border-b border-theme-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-gold-500 uppercase">
            Atelier Lookup & Lookbook
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-theme-text font-light tracking-wide">
            THE COMPLETE COLLECTION
          </h1>
          <p className="text-theme-muted text-xs sm:text-sm font-mono tracking-widest uppercase">
            {searchQuery ? `Search Results for &ldquo;${searchQuery}&rdquo;` : '120+ Bespoke Pieces. Handcrafted to Order.'}
          </p>
          
          {/* Stats bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-6 text-[10px] font-mono text-theme-muted uppercase tracking-widest max-w-2xl mx-auto border-t border-theme-border mt-6">
            <span>125 Pieces</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>7 Categories</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>4 Lookbook Themes</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Global Freight Freight</span>
          </div>
        </div>
      </section>

      {/* 2. FILTER BAR (sticky) */}
      <section className="sticky top-20 z-30 bg-theme-bg/95 backdrop-blur-md border-y border-theme-border shadow-md py-1.5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="overflow-x-auto no-scrollbar flex items-center space-x-6 py-2 -mx-4 px-4 md:mx-0 md:px-0">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                id={`cat-tab-${tab.id}`}
                onClick={() => handleCategoryChange(tab.id)}
                className={`text-xs uppercase font-mono tracking-widest transition-all duration-300 shrink-0 pb-1.5 cursor-pointer relative ${
                  selectedCategory === tab.id
                    ? 'text-gold-500 font-semibold'
                    : 'text-theme-muted hover:text-theme-text'
                }`}
              >
                <span>{tab.label}</span>
                {selectedCategory === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-400 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right Side Filters controls */}
          <div className="flex flex-wrap items-center gap-4 py-1 border-t md:border-t-0 border-theme-border pt-3 md:pt-0">
            
            {/* Collection Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-theme-muted uppercase">Lookbook:</span>
              <div className="relative">
                <select
                  id="filter-collection-select"
                  value={selectedCollection}
                  onChange={(e) => {
                    setSelectedCollection(e.target.value);
                    setVisibleCount(24);
                  }}
                  className="bg-theme-card border border-theme-border rounded-sm text-[10px] font-mono text-theme-text uppercase tracking-wider py-1.5 pl-3.5 pr-8 focus:outline-none focus:border-gold-400 transition-colors cursor-pointer appearance-none"
                >
                  <option value="all">All Lookbooks</option>
                  <option value="ethos">Ethos</option>
                  <option value="heritage">Heritage</option>
                  <option value="atelier">Atelier</option>
                  <option value="natura">Natura</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-theme-muted pointer-events-none" />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-theme-muted uppercase">Sort:</span>
              <div className="relative">
                <select
                  id="filter-sort-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setVisibleCount(24);
                  }}
                  className="bg-theme-card border border-theme-border rounded-sm text-[10px] font-mono text-theme-text uppercase tracking-wider py-1.5 pl-3.5 pr-8 focus:outline-none focus:border-gold-400 transition-colors cursor-pointer appearance-none"
                >
                  <option value="default">Release Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="tag-new">Newest First</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-theme-muted pointer-events-none" />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-theme-border rounded-sm overflow-hidden shrink-0">
              <button
                id="view-grid-btn"
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-gold-500 text-black' : 'text-theme-muted hover:text-theme-text bg-theme-card'
                }`}
                title="Grid View"
              >
                <Grid className="h-3.5 w-3.5" />
              </button>
              <button
                id="view-list-btn"
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-gold-500 text-black' : 'text-theme-muted hover:text-theme-text bg-theme-card'
                }`}
                title="List View"
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Filter Count badge */}
            <div className="bg-theme-badge border border-theme-border px-3 py-1.5 text-[10px] font-mono text-theme-text tracking-wider uppercase rounded-sm shrink-0">
              {filteredAndSortedProducts.length} pieces
            </div>

          </div>
        </div>
      </section>

      {/* 3. SUBCATEGORY PILLS */}
      {selectedCategory !== 'all' && activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          <div className="flex flex-col space-y-2 border border-theme-border rounded-sm p-4 bg-theme-panel">
            <span className="text-[9px] font-mono text-theme-muted uppercase tracking-widest">
              Refine by Craft Subcategory (Multi-select enabled):
            </span>
            <div className="flex flex-wrap gap-2.5">
              {activeCategoryObj.subcategories.map((sub) => {
                const isActive = selectedSubcategories.includes(sub);
                return (
                  <button
                    key={sub}
                    id={`sub-pill-${sub.replace(/\s+/g, '-')}`}
                    onClick={() => handleToggleSubcategory(sub)}
                    className={`px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? 'bg-gold-500 border-gold-500 text-black font-semibold'
                        : 'bg-transparent border-theme-border text-theme-muted hover:text-theme-text hover:border-theme-border-strong'
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
              {selectedSubcategories.length > 0 && (
                <button
                  id="clear-subcategories"
                  onClick={() => setSelectedSubcategories([])}
                  className="px-3 py-1.5 text-xs font-mono text-theme-muted hover:text-gold-400 underline underline-offset-2 transition-colors"
                >
                  Clear Subcategories
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. MAIN PRODUCT GRID / LIST AREA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {paginatedProducts.length > 0 ? (
          <div>
            {viewMode === 'grid' ? (
              // Desktop: 4 col, Tablet: 2 col, Mobile: 1 col
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="animate-fade-up">
                    <ProductCard
                      product={product}
                      viewMode="grid"
                      isWishlisted={isWishlisted(product.id)}
                      onToggleWishlist={onToggleWishlist}
                      onSelectProduct={onSelectProduct}
                    />
                  </div>
                ))}
              </div>
            ) : (
              // List view alternate design rows
              <div className="flex flex-col space-y-4">
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="animate-fade-up">
                    <ProductCard
                      product={product}
                      viewMode="list"
                      isWishlisted={isWishlisted(product.id)}
                      onToggleWishlist={onToggleWishlist}
                      onSelectProduct={onSelectProduct}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 5. LOAD MORE / PAGINATION FOOTER */}
            {filteredAndSortedProducts.length > visibleCount && (
              <div className="flex flex-col items-center space-y-4 pt-16">
                <span className="text-xs font-mono text-theme-muted uppercase tracking-widest">
                  Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} Pieces
                </span>
                
                {/* ProgressBar indicator */}
                <div className="w-56 h-[1.5px] bg-theme-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold-400 transition-all duration-300"
                    style={{ width: `${(paginatedProducts.length / filteredAndSortedProducts.length) * 100}%` }}
                  />
                </div>

                <button
                  id="load-more-btn"
                  onClick={handleLoadMore}
                  className="px-8 py-3.5 border border-theme-border-strong text-theme-text hover:border-gold-500 hover:text-gold-400 bg-transparent font-mono text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 rounded-sm cursor-pointer"
                >
                  Load More Bespoke Pieces
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24 space-y-6 max-w-lg mx-auto">
            <div className="inline-flex h-12 w-12 rounded-full border border-theme-border bg-theme-panel items-center justify-center text-theme-muted animate-fade-in">
              <Layers className="h-6 w-6 stroke-[1.2]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-lg text-theme-text font-light tracking-wide uppercase">
                No Bespoke Pieces Meet Selection
              </h3>
              <p className="text-theme-muted font-mono text-xs max-w-md leading-relaxed">
                We couldn&apos;t find any designs matching your active combinations of category filters, collection lookbooks, or active search terms. Let us reset filters or commission a custom drawing.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                id="reset-all-filters-btn"
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-theme-badge border border-theme-border text-theme-text font-mono text-[10px] uppercase tracking-widest hover:bg-theme-text hover:text-theme-bg hover:border-theme-text transition-all duration-300 rounded-sm"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
