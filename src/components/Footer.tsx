/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, Facebook, PhoneCall } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'catalogue' | 'about' | 'consultation') => void;
  onOpenConsultation: () => void;
}

export default function Footer({ onNavigate, onOpenConsultation }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-theme-panel border-t border-theme-border pt-16 pb-12 text-theme-muted font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo Column */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="font-serif text-base text-theme-text tracking-[0.2em] uppercase font-light flex items-center">
              <span className="font-sans font-black tracking-tighter text-gold-400 italic text-base mr-1.5 relative select-none">
                A1
                <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-gold-400/50"></span>
              </span>
              <span>VISION WORTH</span>
            </h3>
            <p className="text-xs text-theme-muted font-serif leading-relaxed italic">
              Crafting contemporary African luxury heirlooms. Hand-carved in Lagos, curated globally. Every line is sculpted with quiet authority and physical luxury.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#instagram" className="text-theme-muted hover:text-gold-400 transition-colors">
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a href="#facebook" className="text-theme-muted hover:text-gold-400 transition-colors">
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <button onClick={onOpenConsultation} className="text-theme-muted hover:text-gold-400 transition-colors cursor-pointer" title="Call Concierge">
                <PhoneCall className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Directory Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-theme-text uppercase tracking-widest font-semibold">
              The Directory
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-gold-400 transition-colors text-left cursor-pointer"
                >
                  The House (Homepage)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-gold-400 transition-colors text-left cursor-pointer"
                >
                  The Full Catalogue (125 Pieces)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenConsultation}
                  className="hover:text-gold-400 transition-colors text-left cursor-pointer text-gold-500"
                >
                  Private Commission Salon
                </button>
              </li>
              <li>
                <a href="#atelier" className="hover:text-gold-400 transition-colors">
                  Atelier & Guild Craftsmanship
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-theme-text uppercase tracking-widest font-semibold">
              Salons & Showrooms
            </h4>
            <ul className="space-y-3.5 text-xs font-serif italic text-theme-muted">
              <li>
                <p className="text-theme-text not-italic font-mono text-[10px] uppercase tracking-wider">Lagos Atelier (HQ)</p>
                <p className="mt-0.5 text-theme-muted">32 Oyinkan Abayomi Drive, Ikoyi, Lagos, Nigeria</p>
              </li>
              <li>
                <p className="text-theme-text not-italic font-mono text-[10px] uppercase tracking-wider">Milan Gallery</p>
                <p className="mt-0.5 text-theme-muted">Via della Spiga, 14, 20121 Milano MI, Italy</p>
              </li>
              <li>
                <p className="text-theme-text not-italic font-mono text-[10px] uppercase tracking-wider">London Commission Room</p>
                <p className="mt-0.5 text-theme-muted">Mayfair Mews, London W1S 2YF, United Kingdom</p>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-theme-text uppercase tracking-widest font-semibold">
              The Prospectus
            </h4>
            <p className="text-xs text-theme-muted leading-relaxed font-serif">
              Subscribe to receive private invitations to new lookbooks, seasonal atelier catalogs, and VIP previews in Lagos and Milan.
            </p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex border-b border-theme-border-strong pb-1.5 focus-within:border-gold-400 transition-colors">
                <input
                  type="email"
                  required
                  placeholder="ENTER SECURE EMAIL..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none text-xs text-theme-text focus:outline-none placeholder-theme-muted/50 font-mono tracking-widest"
                />
                <button
                  type="submit"
                  className="p-1 text-theme-muted hover:text-gold-400 transition-colors cursor-pointer"
                  title="Subscribe"
                >
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
              </form>
            ) : (
              <div className="p-3 bg-gold-500/10 border border-gold-500/20 rounded-sm text-center animate-fade-in">
                <p className="text-gold-500 font-mono text-[10px] uppercase tracking-widest">
                  Address added to prospectus list
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="border-t border-theme-border pt-8 flex flex-col md:flex-row justify-between items-center text-theme-muted/80 text-[10px] font-mono tracking-widest uppercase gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p>&copy; {new Date().getFullYear()} VISION WORTH ATELIER LTD. ALL RIGHTS RESERVED.</p>
            <p className="text-[9px] text-theme-muted/65">Hand-carved in Nigeria. Designed for Global Estates.</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-theme-muted/70">
            <a href="#privacy" className="hover:text-gold-400 transition-colors">PRIVACY POLICY</a>
            <a href="#terms" className="hover:text-gold-400 transition-colors">TERMS & COMMISSIONS</a>
            <a href="#shipping" className="hover:text-gold-400 transition-colors">GLOBAL WHITE-GLOVE FREIGHT</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
