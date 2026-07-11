/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Hammer, ArrowLeftRight } from 'lucide-react';
import { Product } from '../types';
import { CATALOGUE } from '../data';
import ProductCard from './ProductCard';

interface HomepageProps {
  onNavigateToCatalogue: (filters?: { tag?: string; collection?: string }) => void;
  onSelectProduct: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
  onOpenConsultation: () => void;
}

export default function Homepage({
  onNavigateToCatalogue,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist,
  onOpenConsultation
}: HomepageProps) {
  
  // 8 newest products for "Just Arrived"
  const newArrivals = CATALOGUE.filter((p) => p.tag === 'new').slice(0, 8);
  
  // 6 products for "Bestsellers Grid"
  const bestsellers = CATALOGUE.filter((p) => p.tag === 'bestseller').slice(0, 6);

  // Background images for the 4 collections
  const collectionsData = [
    {
      id: 'ethos',
      name: 'Ethos Collection',
      description: 'Warm cream, travertine and walnut tones. Calm, architectural, and minimalist.',
      bgImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      count: CATALOGUE.filter(p => p.collection === 'ethos').length
    },
    {
      id: 'heritage',
      name: 'Heritage Collection',
      description: 'Dark royal marble and polished brass tones. Rich, traditional, and timeless.',
      bgImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
      count: CATALOGUE.filter(p => p.collection === 'heritage').length
    },
    {
      id: 'atelier',
      name: 'Atelier Collection',
      description: 'Blackened industrial steel and saddle leather. Sharp, modern, and editorial.',
      bgImage: 'https://images.unsplash.com/photo-1544457193-39531789b943?auto=format&fit=crop&w=1200&q=80',
      count: CATALOGUE.filter(p => p.collection === 'atelier').length
    },
    {
      id: 'natura',
      name: 'Natura Collection',
      description: 'Natural reclaimed iroko wood and organic linen. Earthy, raw, and warm.',
      bgImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      count: CATALOGUE.filter(p => p.collection === 'natura').length
    }
  ];

  return (
    <div className="space-y-24 pb-20 animate-fade-in transition-colors duration-300">
      
      {/* 1. Cinematic Hero Stage */}
      <section className="relative min-h-[85vh] flex flex-col justify-center bg-black overflow-hidden border-b border-theme-border">
        
        {/* Background Image with heavy luxury grading */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1800&q=90"
            alt="Vision Worth living room presentation"
            className="w-full h-full object-cover opacity-35 mix-blend-luminosity scale-105 animate-subtle-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-black/30 to-black/60" />
        </div>

        {/* Hero Copy (EB Garamond) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 py-20">
          <div className="space-y-4">
            <span className="text-[10px] sm:text-xs tracking-[0.4em] font-mono text-gold-500 uppercase block">
              Handcrafted in Lagos &bull; Shipped Globally
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extralight text-white leading-[1.1] tracking-tight max-w-4xl mx-auto">
              Sculptured Form. <br />
              <span className="italic text-gold-400">Quiet Authority.</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-stone-300 tracking-widest uppercase max-w-xl mx-auto mt-4">
              120+ Bespoke Heirlooms. Crafted to Order.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="hero-explore-catalogue"
              onClick={() => onNavigateToCatalogue()}
              className="w-full sm:w-auto px-8 py-4 bg-gold-500 hover:bg-white hover:text-black text-black font-mono text-xs font-semibold uppercase tracking-widest transition-all duration-300 rounded-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore Catalogue</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              id="hero-commission-salon"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:border-gold-400 hover:text-gold-300 text-stone-200 font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-sm cursor-pointer"
            >
              Book Commission Salon
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16 max-w-4xl mx-auto border-t border-theme-border">
            <div className="text-center">
              <p className="font-mono text-lg sm:text-xl text-gold-500 font-semibold">125</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-theme-muted mt-1">Bespoke Pieces</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-lg sm:text-xl text-theme-text font-semibold">7</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-theme-muted mt-1">Craft Divisions</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-lg sm:text-xl text-theme-text font-semibold">4</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-theme-muted mt-1">Lookbook Themes</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-lg sm:text-xl text-gold-500 font-semibold">100%</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-theme-muted mt-1">Made in Nigeria</p>
            </div>
          </div>
        </div>
      </section>


      {/* 2. NEW ARRIVALS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-theme-border pb-4 gap-2">
          <div>
            <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest">Just Arrived</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-theme-text tracking-wide mt-1">
              THE RECENT RELEASES
            </h2>
          </div>
          <button
            id="home-view-new-arrivals"
            onClick={() => onNavigateToCatalogue({ tag: 'new' })}
            className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-theme-muted hover:text-gold-500 transition-colors cursor-pointer"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Horizontal scroll container with custom styling */}
        <div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-thin scrollbar-thumb-theme-border scrollbar-track-transparent snap-x snap-mandatory">
          {newArrivals.map((product) => (
            <div key={product.id} className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start">
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
      </section>


      {/* 3. SIGNATURE PIECE FEATURE */}
      <section className="bg-theme-panel border-y border-theme-border py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Image side */}
          <div className="relative aspect-[4/3] sm:aspect-video md:aspect-[3/4] overflow-hidden rounded-sm bg-theme-panel border border-theme-border">
            <img
              src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80"
              alt="Artisan woodcraft bench detail"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 left-4 p-4 bg-theme-bg/95 backdrop-blur-md max-w-xs font-mono text-[10px] uppercase tracking-widest text-theme-text border border-theme-border/50 shadow-md">
              <p className="text-gold-500 font-semibold">Lagos Atelier signature</p>
              <p className="text-theme-text font-serif italic not-uppercase text-xs mt-1">Saddle Leather & Timber Jointing</p>
              <p className="text-[9px] text-theme-muted mt-2">Certified handiwork by Guild Master Oladele</p>
            </div>
          </div>

          {/* Copy side */}
          <div className="space-y-6">
            <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest block">
              The Masterwork Standard
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-theme-text font-light tracking-wide leading-tight">
              Honoring African Woodcraft, <br />
              <span className="italic text-gold-500">Refined for Modern Living.</span>
            </h3>
            <p className="text-theme-muted text-xs sm:text-sm font-light leading-relaxed font-sans">
              Our workshop honors generations of West African woodworking traditions. By employing natural jointing techniques that bypass metallic fasteners, our pieces respond organically to ambient humidity, remaining tension-free and indestructible for decades. 
            </p>
            <p className="text-theme-muted/80 text-xs leading-relaxed font-sans">
              We selectively source old-growth hardwood logs, naturally felled during tropical clearance programs in southwestern Nigeria, transforming reclaimed iroko, afara, and mahogany timber into structured geometric masterworks of global high-fashion furniture.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Hammer className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono text-[10px] uppercase text-theme-text tracking-widest">Hand-Chiseled Joints</h4>
                  <p className="text-theme-muted text-[10px] mt-0.5">True timber joinery without standard visible screws.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono text-[10px] uppercase text-theme-text tracking-widest">Lifetime Guarantee</h4>
                  <p className="text-theme-muted text-[10px] mt-0.5">Each piece is stamped with a unique registered guild seal.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 4. BESTSELLERS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-md mx-auto">
          <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest">Most Wanted</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-theme-text tracking-wider">
            THE ATELIER BESTSELLERS
          </h2>
          <p className="text-theme-muted font-serif text-xs italic">
            Six designs highly sought after by prominent collectors and luxury residences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestsellers.map((product) => (
            <div key={product.id} className="h-full">
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
      </section>


      {/* 5. COLLECTIONS SHOWCASE (Full width lookbooks) */}
      <section className="space-y-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest">Lookbook Collections</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-theme-text tracking-wider">
            THE CORE ATMOSPHERES
          </h2>
          <p className="text-theme-muted font-serif text-xs italic max-w-md mx-auto">
            Our furniture lines are organized around cohesive atmospheres, letting you filter cross-category designs by visual harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {collectionsData.map((col) => (
            <div
              key={col.id}
              onClick={() => onNavigateToCatalogue({ collection: col.id })}
              className="relative aspect-video group overflow-hidden bg-theme-panel border border-theme-border rounded-sm cursor-pointer shadow-lg"
            >
              {/* Background with zoom animation */}
              <img
                src={col.bgImage}
                alt={`${col.name} backdrop`}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Black overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-gold-400 uppercase tracking-[0.25em]">
                    {col.count} Bespoke Pieces
                  </span>
                  <span className="font-mono text-[9px] text-stone-400 uppercase">
                    Ref: 0{col.id === 'ethos' ? 1 : col.id === 'heritage' ? 2 : col.id === 'atelier' ? 3 : 4}
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-light tracking-wide">
                  {col.name}
                </h3>
                <p className="text-stone-200 text-xs font-light max-w-sm line-clamp-2">
                  {col.description}
                </p>
                <div className="pt-2 flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-gold-400 group-hover:text-white transition-colors">
                  <span>Explore Lookbook</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
