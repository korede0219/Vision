/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Eye, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  isWishlisted: boolean;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductCard({
  product,
  viewMode,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct
}: ProductCardProps) {
  const [mainLoaded, setMainLoaded] = React.useState(false);
  const [listLoaded, setListLoaded] = React.useState(false);
  
  const getTagBadge = () => {
    switch (product.tag) {
      case 'bestseller':
        return (
          <span className="bg-gold-500 text-black text-[9px] font-mono uppercase tracking-widest font-semibold px-2 py-1 rounded-sm shadow-md">
            Bestseller
          </span>
        );
      case 'new':
        return (
          <span className="bg-stone-900 text-stone-200 border border-white/10 text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm shadow-md">
            New Arrival
          </span>
        );
      case 'limited':
        return (
          <span className="bg-[#121212] text-gold-300 border border-gold-400/30 text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm shadow-md">
            Limited
          </span>
        );
      default:
        return null;
    }
  };

  if (viewMode === 'list') {
    // Elegant Row List View
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-b border-gold-500/10 hover:border-gold-500/40 transition-colors duration-300 gap-6 group">
        
        {/* Left image */}
        <div 
          onClick={() => onSelectProduct(product)}
          className="h-28 w-28 flex-shrink-0 bg-theme-panel overflow-hidden cursor-pointer rounded-sm border border-theme-border relative"
        >
          {!listLoaded && (
            <div className="absolute inset-0 bg-theme-bg/60 animate-pulse flex items-center justify-center z-10">
              <div className="w-5 h-5 border border-gold-500/20 border-t-gold-400 rounded-full animate-spin" />
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setListLoaded(true)}
            className={`h-full w-full object-cover group-hover:scale-105 transition-all duration-500 ${
              listLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            referrerPolicy="no-referrer"
          />
          {product.tag && (
            <div className="absolute top-1 left-1 scale-75 origin-top-left z-20">
              {getTagBadge()}
            </div>
          )}
        </div>

        {/* Center content */}
        <div className="flex-grow text-center sm:text-left min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500">
              {product.category.replace('-', ' ')} — {product.subcategory}
            </span>
            <span className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 bg-theme-badge text-theme-muted rounded-sm">
              {product.collection} collection
            </span>
          </div>
          <h4 
            onClick={() => onSelectProduct(product)}
            className="font-serif text-lg md:text-xl font-light text-theme-text hover:text-gold-400 transition-colors cursor-pointer mt-1"
          >
            {product.name}
          </h4>
          <p className="text-theme-muted text-xs font-light mt-1.5 max-w-xl leading-relaxed">
            {product.description}
          </p>
          <p className="text-[10px] text-theme-muted font-mono mt-1 uppercase tracking-wider">
            Material: <span className="text-theme-text">{product.material}</span> &bull; Lead time: <span className="text-theme-text">{product.leadTime}</span>
          </p>
        </div>

        {/* Right price & CTA */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto pl-0 sm:pl-6 border-t sm:border-t-0 border-theme-border pt-4 sm:pt-0">
          <div className="text-left sm:text-right">
            <p className="text-[9px] font-mono text-theme-muted uppercase tracking-widest">Pricing From</p>
            <span className="font-mono text-lg font-medium text-gold-500">
              ${product.price.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              id={`list-wish-${product.id}`}
              onClick={(e) => onToggleWishlist(product.id, e)}
              className={`p-2.5 rounded-full border border-theme-border hover:border-gold-500/30 transition-all duration-300 group/btn cursor-pointer ${
                isWishlisted ? 'bg-gold-500/10 border-gold-500/30' : 'bg-transparent'
              }`}
              title="Add to Portfolio"
            >
              <Heart className={`h-4 w-4 stroke-[1.5] ${isWishlisted ? 'fill-gold-400 text-gold-400' : 'text-theme-muted group-hover/btn:text-theme-text'}`} />
            </button>
            <button
              id={`list-detail-${product.id}`}
              onClick={() => onSelectProduct(product)}
              className="px-4 py-2 bg-theme-text text-theme-bg hover:bg-gold-500 hover:text-theme-bg font-mono text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 flex items-center gap-1.5 rounded-sm cursor-pointer"
            >
              <span>Examine</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Elegant Grid Card View
  return (
    <div className="group flex flex-col justify-between h-full bg-theme-card p-2 rounded-sm border border-theme-border hover:border-gold-500/20 transition-all duration-500 relative">
      
      {/* 3:4 portrait image wrapper */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-theme-panel rounded-sm">
        {!mainLoaded && (
          <div className="absolute inset-0 bg-theme-bg/60 animate-pulse flex items-center justify-center z-10">
            <div className="w-6 h-6 border border-gold-500/20 border-t-gold-400 rounded-full animate-spin" />
          </div>
        )}
        
        {/* Main image */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setMainLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[800ms] ease-out group-hover:scale-[1.05] group-hover:brightness-[0.85] ${
            mainLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Tag badges at top left */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            {getTagBadge()}
          </div>
        )}

        {/* Luxury Overlaid details on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20">
          <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase">
            {product.subcategory}
          </span>
          <h4 className="font-serif text-lg text-white font-light tracking-wide mb-1">
            {product.name}
          </h4>
          <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest mb-3">
            {product.material}
          </span>
          
          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <button
              id={`card-view-details-${product.id}`}
              onClick={() => onSelectProduct(product)}
              className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-white hover:text-gold-400 transition-colors"
            >
              <span>Examine Details</span>
              <ArrowRight className="h-3 w-3" />
            </button>
            <button
              id={`card-wish-${product.id}`}
              onClick={(e) => onToggleWishlist(product.id, e)}
              className="p-1.5 text-stone-300 hover:text-gold-400 transition-colors relative cursor-pointer"
              title="Add to Portfolio"
            >
              <Heart className={`h-4.5 w-4.5 stroke-[1.5] ${isWishlisted ? 'fill-gold-400 text-gold-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Persistent Information below card */}
      <div className="pt-3 pb-1 px-1 flex flex-col justify-between flex-grow mt-auto">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-mono tracking-widest text-theme-muted uppercase">
              {product.subcategory}
            </span>
            <span className="text-[8px] font-mono tracking-widest text-theme-muted uppercase">
              {product.collection}
            </span>
          </div>
          <h5 
            onClick={() => onSelectProduct(product)}
            className="font-serif text-[15px] font-light text-theme-text mt-1 hover:text-gold-500 transition-colors cursor-pointer truncate"
          >
            {product.name}
          </h5>
        </div>
        <div className="flex items-end justify-between border-t border-theme-border pt-2 mt-2">
          <div>
            <p className="text-[8px] font-mono text-theme-muted uppercase tracking-widest">Lagos Atelier</p>
            <p className="font-mono text-xs text-gold-500 font-medium">
              From ${product.price.toLocaleString()}
            </p>
          </div>
          <p className="text-[9px] text-theme-muted font-mono">
            {product.leadTime}
          </p>
        </div>
      </div>
    </div>
  );
}
