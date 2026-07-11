/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { CATALOGUE } from '../data';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenConsultation: () => void;
  onSearchSubmit: (query: string) => void;
}

export default function SearchOverlay({
  isOpen,
  onClose,
  onSelectProduct,
  onOpenConsultation,
  onSearchSubmit
}: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter products based on search term
  const searchResults = query.trim() === '' ? [] : CATALOGUE.filter((product) => {
    const q = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.subcategory.toLowerCase().includes(q) ||
      product.material.toLowerCase().includes(q) ||
      product.collection.toLowerCase().includes(q)
    );
  }).slice(0, 10); // Limit to top 10 for responsive list

  // Group search results by category
  const resultsByCategory: Record<string, Product[]> = {};
  searchResults.forEach((product) => {
    const cat = product.category.replace('-', ' ').toUpperCase();
    if (!resultsByCategory[cat]) {
      resultsByCategory[cat] = [];
    }
    resultsByCategory[cat].push(product);
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit(query);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-theme-bg/98 flex flex-col animate-fade-in p-6 sm:p-12 md:p-24 overflow-y-auto no-scrollbar transition-colors duration-300">
      {/* Top bar */}
      <div className="max-w-4xl mx-auto w-full flex justify-end mb-8">
        <button
          id="close-search-btn"
          onClick={onClose}
          className="group flex items-center gap-2 text-theme-muted hover:text-theme-text transition-colors uppercase font-mono text-[10px] tracking-widest cursor-pointer"
        >
          <span>Close</span>
          <X className="h-6 w-6 stroke-[1.2] group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Input container */}
      <div className="max-w-4xl mx-auto w-full border-b border-theme-border pb-4 flex items-center">
        <Search className="h-8 w-8 text-theme-muted mr-4 stroke-[1.2]" />
        <input
          id="search-input-field"
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="SEARCH THE CATALOGUE..."
          className="w-full bg-transparent border-none text-theme-text text-xl sm:text-3xl md:text-4xl font-serif font-light tracking-wide focus:outline-none placeholder-theme-muted/40"
        />
      </div>

      <div className="max-w-4xl mx-auto w-full text-theme-muted font-mono text-[10px] tracking-widest uppercase mt-3 flex justify-between">
        <span>Try &quot;Sofa&quot;, &quot;Lagos&quot;, &quot;Walnut&quot;, &quot;Ethos&quot;</span>
        {query && <span>Press Enter to view all</span>}
      </div>

      {/* Search results body */}
      <div className="max-w-4xl mx-auto w-full flex-grow mt-12 mb-16">
        {query.trim() === '' ? (
          <div className="text-theme-muted text-sm italic font-serif py-12 text-center">
            Enter search terms above to explore the House collection...
          </div>
        ) : searchResults.length > 0 ? (
          <div className="space-y-8">
            {Object.entries(resultsByCategory).map(([categoryName, products]) => (
              <div key={categoryName} className="space-y-4">
                <h4 className="font-mono text-xs text-gold-500 tracking-[0.2em] border-b border-theme-border pb-2 uppercase">
                  {categoryName}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="flex items-center p-3 rounded bg-theme-card hover:bg-theme-badge border border-theme-border hover:border-gold-500/30 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="h-16 w-12 flex-shrink-0 bg-theme-panel overflow-hidden mr-4 border border-theme-border/50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-gold-500">
                          {product.subcategory}
                        </span>
                        <h5 className="font-serif text-sm font-light text-theme-text truncate">
                          {product.name}
                        </h5>
                        <p className="text-[10px] font-mono text-theme-muted">
                          {product.material}
                        </p>
                      </div>
                      <div className="text-right text-xs font-mono font-medium text-theme-text pl-4">
                        ${product.price.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <p className="text-theme-text font-serif text-lg">
              No bespoke items match &quot;{query}&quot; in our current lines.
            </p>
            <p className="text-theme-muted font-mono text-xs max-w-md mx-auto leading-relaxed">
              However, our Lagos atelier thrives on bespoke custom commission work. We can draw up blueprints and handcraft any furniture size or design tailored to your space.
            </p>
            <button
              id="search-consult-redirect-btn"
              onClick={() => {
                onOpenConsultation();
                onClose();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-black text-xs uppercase tracking-widest font-mono font-semibold hover:bg-theme-text hover:text-theme-bg transition-all duration-300 rounded-sm mt-4 cursor-pointer"
            >
              <span>We&apos;ll make it for you</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
