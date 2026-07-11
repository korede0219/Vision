/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Minus, Plus, Maximize2, Shield, Check } from 'lucide-react';
import { Product } from '../types';
import { CATALOGUE } from '../data';
import ProductCard from './ProductCard';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
  onOpenConsultationWithProducts: (products: Product[]) => void;
  wishlistIds: string[];
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onOpenConsultationWithProducts,
  wishlistIds
}: ProductDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSwatchIndex, setActiveSwatchIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'desc' | 'materials' | 'delivery' | 'care' | null>('desc');

  useEffect(() => {
    if (isOpen) {
      setActiveImageIndex(0);
      setActiveSwatchIndex(0);
      setQuantity(1);
      setExpandedSection('desc');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? product.gallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === product.gallery.length - 1 ? 0 : prev + 1));
  };

  // Find 4 similar products in the same category, excluding the current product
  const similarProducts = CATALOGUE.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const toggleAccordion = (section: 'desc' | 'materials' | 'delivery' | 'care') => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleRequestQuote = () => {
    // Pass the product with quantity factor or just pass it to the commission form
    onOpenConsultationWithProducts([product]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto no-scrollbar">
      {/* Backdrop */}
      <div
        id="detail-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Main Container */}
      <div className="relative w-full max-w-5xl bg-theme-bg border border-theme-border rounded-sm z-10 max-h-[95vh] sm:max-h-[90vh] flex flex-col shadow-2xl animate-scale-up overflow-y-auto no-scrollbar transition-colors duration-300">
        
        {/* Close Button top-right */}
        <button
          id="close-detail-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-theme-panel border border-theme-border rounded-full text-theme-muted hover:text-theme-text hover:scale-105 transition-all duration-300 cursor-pointer"
          title="Close details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-4 sm:p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12 flex-grow">
          
          {/* Left Side: Image Gallery */}
          <div className="w-full md:w-[45%] flex flex-col space-y-4">
            
            {/* Main Stage */}
            <div className="relative aspect-[3/4] bg-theme-panel overflow-hidden border border-theme-border rounded-sm group">
              <img
                src={product.gallery[activeImageIndex]}
                alt={`${product.name} frame view`}
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              
              {/* Lightbox Trigger */}
              <button
                id="lightbox-open-btn"
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-3 right-3 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors duration-300 cursor-pointer"
                title="Expand image"
              >
                <Maximize2 className="h-4 w-4" />
              </button>

              {/* Slider Controls */}
              <button
                id="gallery-prev"
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors duration-300 cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                id="gallery-next"
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors duration-300 cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Slide Counter */}
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 text-white font-mono text-[10px] tracking-widest uppercase rounded-sm">
                0{activeImageIndex + 1} / 0{product.gallery.length}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  id={`gallery-thumb-${idx}`}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-[3/4] overflow-hidden bg-theme-panel border rounded-sm transition-all duration-300 cursor-pointer ${
                    activeImageIndex === idx ? 'border-gold-500 scale-[1.02] shadow' : 'border-theme-border/50 hover:border-theme-border'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Product Customizations */}
          <div className="w-full md:w-[55%] flex flex-col space-y-6">
            
            {/* Breadcrumb & Collection tag */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[9px] font-mono uppercase tracking-widest text-theme-muted">
                <span>All</span>
                <span>/</span>
                <span className="text-theme-muted">{product.category.replace('-', ' ')}</span>
                <span>/</span>
                <span className="text-theme-muted/80">{product.subcategory}</span>
              </div>
              <span className="inline-block font-mono text-[10px] text-gold-500 uppercase tracking-widest font-bold">
                {product.collection} COLLECTION
              </span>
            </div>

            {/* Product Title & Star-Luxury Rating */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl text-theme-text font-light tracking-wide">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-2.5">
                {/* 5 gold rating dots */}
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="h-2 w-2 rounded-full bg-gold-500 block" title="Luxury Rating 5/5" />
                  ))}
                </div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-theme-muted">
                  Guild Handcrafted Certificate
                </span>
              </div>
            </div>

            {/* Price tag */}
            <div className="text-2xl font-mono text-gold-500 font-medium">
              ${product.price.toLocaleString()}
            </div>

            {/* Short introductory text */}
            <p className="text-theme-text text-sm font-light leading-relaxed font-sans">
              {product.description}
            </p>

            {/* Specifications Table */}
            <div className="border-y border-theme-border py-4 font-mono text-[11px] uppercase tracking-wider space-y-2.5 text-theme-muted">
              <div className="flex justify-between">
                <span>Material</span>
                <span className="text-theme-text text-right">{product.material}</span>
              </div>
              <div className="flex justify-between">
                <span>Dimensions</span>
                <span className="text-theme-text text-right">{product.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span>Weight Approx</span>
                <span className="text-theme-text text-right">{product.weight}</span>
              </div>
              <div className="flex justify-between">
                <span>Atelier Lead Time</span>
                <span className="text-theme-text text-right">{product.leadTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Origin</span>
                <span className="text-gold-500 text-right">{product.origin}</span>
              </div>
              <div className="flex justify-between">
                <span>Design Tone</span>
                <span className="text-theme-text text-right">{product.collection}</span>
              </div>
            </div>

            {/* Material Swatch Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-theme-muted uppercase tracking-widest">
                    Stain / Swatch Finish:
                  </span>
                  <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-semibold">
                    {product.colorNames[activeSwatchIndex] || 'Custom'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      id={`swatch-btn-${idx}`}
                      onClick={() => setActiveSwatchIndex(idx)}
                      className={`h-7 w-7 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        activeSwatchIndex === idx ? 'border-gold-500 scale-110 shadow-lg' : 'border-theme-border hover:border-theme-border-strong'
                      }`}
                      style={{ backgroundColor: color }}
                      title={product.colorNames[idx]}
                    >
                      {activeSwatchIndex === idx && (
                        <Check className="h-3.5 w-3.5 text-black stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & CTAs */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-theme-border rounded-sm bg-theme-panel">
                  <button
                    id="qty-decrement"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-theme-muted hover:text-theme-text transition-colors cursor-pointer"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-5 text-sm font-mono text-theme-text text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    id="qty-increment"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-theme-muted hover:text-theme-text transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  id="request-quote-cta"
                  onClick={handleRequestQuote}
                  className="flex-grow py-3.5 bg-gold-500 hover:bg-theme-text hover:text-theme-bg text-black font-mono text-xs uppercase font-semibold tracking-widest transition-all duration-300 rounded-sm cursor-pointer"
                >
                  Request commission quote
                </button>
              </div>

              <button
                id="add-to-portfolio-cta"
                onClick={(e) => onToggleWishlist(product.id, e)}
                className={`w-full py-3.5 border text-xs font-mono uppercase tracking-widest transition-all duration-300 rounded-sm cursor-pointer flex items-center justify-center gap-2 ${
                  isWishlisted
                    ? 'bg-gold-500/10 border-gold-500/40 text-gold-500 hover:bg-gold-500/20'
                    : 'bg-transparent border-theme-border text-theme-muted hover:border-theme-border-strong hover:text-theme-text'
                }`}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-gold-500 text-gold-500' : ''}`} />
                <span>{isWishlisted ? 'In your portfolio (Remove)' : 'Add to private portfolio'}</span>
              </button>
            </div>

            {/* Accordion list */}
            <div className="space-y-2 border-t border-theme-border pt-4">
              
              {/* Full Description */}
              <div className="border-b border-theme-border/50 pb-2">
                <button
                  id="accordion-trigger-desc"
                  onClick={() => toggleAccordion('desc')}
                  className="w-full flex items-center justify-between py-2 text-left text-xs font-mono uppercase tracking-widest text-theme-text hover:text-gold-500 transition-colors cursor-pointer"
                >
                  <span>Atelier Story & Description</span>
                  <span>{expandedSection === 'desc' ? '—' : '+'}</span>
                </button>
                {expandedSection === 'desc' && (
                  <p className="text-theme-muted text-xs leading-relaxed font-sans py-2 font-light animate-fade-in">
                    {product.fullDescription}
                  </p>
                )}
              </div>

              {/* Materials & Craftsmanship */}
              <div className="border-b border-theme-border/50 pb-2">
                <button
                  id="accordion-trigger-materials"
                  onClick={() => toggleAccordion('materials')}
                  className="w-full flex items-center justify-between py-2 text-left text-xs font-mono uppercase tracking-widest text-theme-text hover:text-gold-500 transition-colors cursor-pointer"
                >
                  <span>Materials & Craftsmanship</span>
                  <span>{expandedSection === 'materials' ? '—' : '+'}</span>
                </button>
                {expandedSection === 'materials' && (
                  <p className="text-theme-muted text-xs leading-relaxed font-sans py-2 font-light animate-fade-in">
                    {product.materialsCraftsmanship}
                  </p>
                )}
              </div>

              {/* Delivery & Lead Time */}
              <div className="border-b border-theme-border/50 pb-2">
                <button
                  id="accordion-trigger-delivery"
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full flex items-center justify-between py-2 text-left text-xs font-mono uppercase tracking-widest text-theme-text hover:text-gold-500 transition-colors cursor-pointer"
                >
                  <span>Delivery & Lead Time</span>
                  <span>{expandedSection === 'delivery' ? '—' : '+'}</span>
                </button>
                {expandedSection === 'delivery' && (
                  <p className="text-theme-muted text-xs leading-relaxed font-sans py-2 font-light animate-fade-in">
                    {product.deliveryLeadTime}
                  </p>
                )}
              </div>

              {/* Care Instructions */}
              <div className="pb-2">
                <button
                  id="accordion-trigger-care"
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between py-2 text-left text-xs font-mono uppercase tracking-widest text-theme-text hover:text-gold-500 transition-colors cursor-pointer"
                >
                  <span>Preservation & Care</span>
                  <span>{expandedSection === 'care' ? '—' : '+'}</span>
                </button>
                {expandedSection === 'care' && (
                  <p className="text-theme-muted text-xs leading-relaxed font-sans py-2 font-light animate-fade-in">
                    {product.careInstructions}
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* You May Also Like / Similar Products section */}
        {similarProducts.length > 0 && (
          <div className="border-t border-theme-border bg-theme-panel/30 p-6 sm:p-10">
            <h3 className="font-serif text-lg tracking-wide text-theme-text uppercase text-center md:text-left mb-6">
              YOU MAY ALSO LIKE
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarProducts.map((simProduct) => (
                <div
                  key={simProduct.id}
                  onClick={() => onSelectProduct(simProduct)}
                  className="cursor-pointer bg-theme-card border border-theme-border hover:border-gold-500/20 rounded-sm p-2 group transition-all duration-300"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-theme-panel rounded-sm">
                    <img
                      src={simProduct.image}
                      alt={simProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="pt-2">
                    <span className="text-[8px] font-mono tracking-widest text-gold-500 uppercase block">
                      {simProduct.subcategory}
                    </span>
                    <h4 className="font-serif text-xs text-theme-text mt-0.5 truncate group-hover:text-gold-500 transition-colors">
                      {simProduct.name}
                    </h4>
                    <p className="font-mono text-[10px] text-theme-muted mt-1">
                      From ${simProduct.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Zoom Stage */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-55 bg-black flex flex-col justify-center items-center p-4">
          <button
            id="close-lightbox"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 bg-stone-900 text-white rounded-full hover:scale-105 transition-all cursor-pointer"
            title="Close Zoom"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="relative max-w-4xl max-h-[85vh] flex items-center justify-center">
            <img
              src={product.gallery[activeImageIndex]}
              alt={`${product.name} active panel`}
              className="w-full max-h-[80vh] object-contain rounded-sm shadow-2xl"
              referrerPolicy="no-referrer"
            />
            
            {/* Overlay indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-stone-900/90 text-stone-300 text-[10px] tracking-widest uppercase font-mono rounded-full">
              Panel 0{activeImageIndex + 1} &mdash; {product.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
