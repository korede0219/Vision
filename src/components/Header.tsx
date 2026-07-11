/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Heart, Menu, X, ArrowRight, UserCheck, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface HeaderProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  currentPage: 'home' | 'catalogue' | 'about' | 'consultation';
  onNavigate: (page: 'home' | 'catalogue' | 'about' | 'consultation') => void;
  onOpenConsultation: () => void;
  selectedCollectionFilter?: string;
  onSelectCollection?: (col: string | undefined) => void;
}

export default function Header({
  wishlistCount,
  onOpenWishlist,
  onOpenSearch,
  currentPage,
  onNavigate,
  onOpenConsultation
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-theme-bg/90 backdrop-blur-md border-b border-theme-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Hamburger menu for mobile, Nav links for desktop */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-theme-text hover:text-gold-400 transition-colors p-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-mono text-theme-text/80">
            <button
              id="nav-home"
              onClick={() => onNavigate('home')}
              className={`hover:text-gold-400 transition-colors cursor-pointer ${
                currentPage === 'home' ? 'text-gold-400 border-b border-gold-400/50 pb-1' : ''
              }`}
            >
              The House
            </button>
            <button
              id="nav-catalogue"
              onClick={() => onNavigate('catalogue')}
              className={`hover:text-gold-400 transition-colors cursor-pointer ${
                currentPage === 'catalogue' ? 'text-gold-400 border-b border-gold-400/50 pb-1' : ''
              }`}
            >
              Catalogue <span className="text-[10px] text-theme-muted">(125)</span>
            </button>
            <button
              id="nav-consult"
              onClick={onOpenConsultation}
              className="hover:text-gold-400 transition-colors cursor-pointer text-gold-500 flex items-center gap-1.5"
            >
              Bespoke Salon
            </button>
          </nav>

          {/* Center: Luxury Logo */}
          <div className="text-center cursor-pointer flex flex-col items-center justify-center select-none" onClick={() => onNavigate('home')}>
            <span className="font-serif text-base sm:text-lg md:text-xl font-light tracking-[0.2em] text-theme-text hover:text-gold-500 transition-colors flex items-center justify-center">
              <span className="font-sans font-black tracking-tighter text-gold-400 italic text-lg sm:text-xl md:text-2xl mr-2 relative select-none">
                A1
                <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-gold-400/50"></span>
              </span>
              <span className="uppercase">Vision Worth</span>
            </span>
            <span className="text-[8px] tracking-[0.4em] font-mono text-theme-muted uppercase mt-0.5">
              Lagos — Milan
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              id="header-theme-toggle"
              onClick={toggleTheme}
              className="p-2 text-theme-text/80 hover:text-gold-400 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5 stroke-[1.5]" /> : <Sun className="h-5 w-5 stroke-[1.5]" />}
            </button>

            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-theme-text/80 hover:text-gold-400 transition-colors cursor-pointer"
              aria-label="Search Catalog"
            >
              <Search className="h-5 w-5 stroke-[1.5]" />
            </button>

            <button
              id="header-wishlist-btn"
              onClick={onOpenWishlist}
              className="p-2 text-theme-text/80 hover:text-gold-400 transition-colors relative cursor-pointer group"
              aria-label="Open Wishlist"
            >
              <Heart className={`h-5 w-5 stroke-[1.5] ${wishlistCount > 0 ? 'fill-gold-400 text-gold-400' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-gold-500 text-theme-bg font-mono text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              id="header-consult-cta"
              onClick={onOpenConsultation}
              className="hidden lg:inline-flex items-center justify-center px-4 py-2 border border-gold-500/30 text-[10px] font-mono uppercase tracking-widest text-gold-500 hover:bg-gold-500 hover:text-theme-bg hover:border-gold-500 transition-all duration-300 rounded-sm"
            >
              Private Commission
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-theme-border bg-theme-bg py-6 px-4 space-y-4 animate-fade-in">
          <div className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-widest text-theme-text/80">
            <button
              id="mob-nav-home"
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-theme-border hover:text-gold-400"
            >
              The House (Home)
            </button>
            <button
              id="mob-nav-catalogue"
              onClick={() => {
                onNavigate('catalogue');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-theme-border hover:text-gold-400"
            >
              Bespoke Catalogue (125 Pieces)
            </button>
            <button
              id="mob-nav-consult"
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-theme-border text-gold-500 hover:text-gold-400"
            >
              Book Consultation
            </button>
          </div>
          <div className="pt-4 border-t border-theme-border flex flex-col gap-4">
            <p className="text-[10px] text-theme-muted font-mono">
              LAGOS • LONDON • MILAN • NEW YORK
            </p>
            <button
              id="mob-nav-cta"
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-3 border border-gold-400 text-gold-400 text-xs uppercase tracking-widest font-mono"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
