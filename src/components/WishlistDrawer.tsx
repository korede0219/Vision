/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { CATALOGUE } from '../data';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenConsultationWithProducts: (products: Product[]) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveFromWishlist,
  onSelectProduct,
  onOpenConsultationWithProducts
}: WishlistDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const wishlistProducts = CATALOGUE.filter((p) => wishlistIds.includes(p.id));

  const totalPrice = wishlistProducts.reduce((sum, item) => sum + item.price, 0);

  const handleRequestQuoteForAll = () => {
    onOpenConsultationWithProducts(wishlistProducts);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        id="wishlist-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-md bg-theme-bg border-l border-theme-border h-full flex flex-col z-10 shadow-2xl animate-slide-in p-6 transition-colors duration-300"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-theme-border pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-gold-400" />
            <h3 className="font-serif text-lg tracking-wider text-theme-text">YOUR PORTFOLIO</h3>
            <span className="font-mono text-xs text-theme-muted">({wishlistProducts.length})</span>
          </div>
          <button
            id="close-wishlist-btn"
            onClick={onClose}
            className="p-2 text-theme-muted hover:text-theme-text transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-grow overflow-y-auto py-4 space-y-4 no-scrollbar">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <span className="text-4xl text-theme-muted">✧</span>
              <p className="font-serif text-theme-muted text-sm">
                Your portfolio is currently empty.
              </p>
              <p className="font-mono text-theme-muted/70 text-[10px] uppercase tracking-widest max-w-xs">
                Browse our collections and select pieces to request exclusive design quotes.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-theme-border/50">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex py-4 group animate-fade-in"
                >
                  <div
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="h-20 w-16 bg-theme-panel overflow-hidden mr-4 cursor-pointer flex-shrink-0 rounded-xs border border-theme-border/40"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-gold-500">
                      {product.subcategory}
                    </span>
                    <h4
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="font-serif text-sm text-theme-text hover:text-gold-400 cursor-pointer transition-colors truncate"
                    >
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-theme-muted font-mono tracking-wide truncate">
                      {product.material}
                    </p>
                    <p className="text-[10px] text-theme-muted/80 font-mono mt-1">
                      Lead: {product.leadTime}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between pl-4">
                    <span className="font-mono text-xs text-theme-text">
                      ${product.price.toLocaleString()}
                    </span>
                    <button
                      id={`remove-wish-${product.id}`}
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="p-1.5 text-theme-muted hover:text-red-400 transition-colors cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 className="h-4 w-4 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {wishlistProducts.length > 0 && (
          <div className="border-t border-theme-border pt-4 space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-theme-muted font-mono text-xs uppercase tracking-wider">
                Total Est. Value:
              </span>
              <span className="text-gold-500 font-mono text-lg font-semibold">
                ${totalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-theme-muted font-mono leading-relaxed">
              *Our atelier works on a handcrafted commissions basis. Requesting a quote initiates a conversation with our lead designer to customize details (wood stain, upholstery textile, exact dimensions) and confirm delivery variables.
            </p>
            <div className="flex flex-col gap-2">
              <button
                id="request-portfolio-quote-btn"
                onClick={handleRequestQuoteForAll}
                className="w-full py-4 bg-gold-500 text-black font-mono text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 rounded-sm cursor-pointer"
              >
                <span>Request Quote for All ({wishlistProducts.length})</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                id="wishlist-clear-all"
                onClick={() => {
                  wishlistIds.forEach(id => onRemoveFromWishlist(id));
                }}
                className="w-full py-2.5 bg-transparent border border-theme-border text-theme-muted font-mono text-[10px] uppercase tracking-widest hover:text-theme-text hover:border-theme-border-strong transition-all duration-300 rounded-sm cursor-pointer"
              >
                Clear Entire Portfolio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
