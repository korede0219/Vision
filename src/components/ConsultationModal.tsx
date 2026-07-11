/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle, Send, Plus, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProducts: Product[];
}

export default function ConsultationModal({
  isOpen,
  onClose,
  selectedProducts
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'residential', // residential, hospitality, yacht-aviation, other
    timeline: '8-12 weeks',
    budgetRange: 'luxury',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a random, authentic-looking luxury reference ID
    const randomHex = Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, '0');
    setQuoteId(`VW-2026-${randomHex}`);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: 'residential',
      timeline: '8-12 weeks',
      budgetRange: 'luxury',
      notes: ''
    });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        id="consultation-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Content box */}
      <div className="relative w-full max-w-2xl bg-theme-bg border border-theme-border rounded-sm overflow-hidden z-10 max-h-[90vh] flex flex-col shadow-2xl animate-scale-up transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-theme-border bg-theme-panel">
          <div>
            <h3 className="font-serif text-lg text-theme-text tracking-widest uppercase">BESPOKE PRIVATE COMMISSION</h3>
            <p className="text-[10px] font-mono text-gold-500 uppercase tracking-widest mt-0.5">
              Lagos — London — Milan
            </p>
          </div>
          <button
            id="close-consult-btn"
            onClick={onClose}
            className="p-1.5 text-theme-muted hover:text-theme-text transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 no-scrollbar">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Product list inclusion if any are attached */}
              {selectedProducts.length > 0 && (
                <div className="p-4 bg-theme-card border border-gold-500/20 rounded-sm">
                  <h4 className="font-mono text-[10px] text-gold-500 uppercase tracking-widest mb-3">
                    Selected Pieces for Inquiry ({selectedProducts.length})
                  </h4>
                  <div className="max-h-24 overflow-y-auto space-y-2 pr-2 no-scrollbar">
                    {selectedProducts.map((p) => (
                      <div key={p.id} className="flex items-center justify-between text-xs">
                        <span className="font-serif text-theme-text">{p.name}</span>
                        <span className="font-mono text-theme-muted text-[10px]">
                          ${p.price.toLocaleString()} ({p.material})
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-theme-border mt-3 pt-2 flex justify-between font-mono text-[11px]">
                    <span className="text-theme-muted">Estimated Project Total:</span>
                    <span className="text-gold-500 font-semibold">
                      ${selectedProducts.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Form Input fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-theme-muted">
                    Full Name / Representative *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Chief Olumide Williams"
                    className="w-full bg-theme-panel border border-theme-border px-4 py-3 text-theme-text text-sm focus:outline-none focus:border-gold-400 focus:bg-theme-card transition-colors rounded-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-theme-muted">
                    Secure Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. client@domain.com"
                    className="w-full bg-theme-panel border border-theme-border px-4 py-3 text-theme-text text-sm focus:outline-none focus:border-gold-400 focus:bg-theme-card transition-colors rounded-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-theme-muted">
                    Telephone / Secure Signal Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +234 803..."
                    className="w-full bg-theme-panel border border-theme-border px-4 py-3 text-theme-text text-sm focus:outline-none focus:border-gold-400 focus:bg-theme-card transition-colors rounded-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-theme-muted">
                    Commission Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-theme-panel border border-theme-border px-4 py-3 text-theme-text text-sm focus:outline-none focus:border-gold-400 focus:bg-theme-card transition-colors rounded-sm cursor-pointer"
                  >
                    <option value="residential" className="bg-theme-bg text-theme-text">Private Luxury Residence</option>
                    <option value="hospitality" className="bg-theme-bg text-theme-text">High-End Hospitality / Hotel</option>
                    <option value="yacht-aviation" className="bg-theme-bg text-theme-text">Yacht & Aviation Marine</option>
                    <option value="other" className="bg-theme-bg text-theme-text">Bespoke Galleries / Commercial</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-theme-muted">
                    Requested Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-theme-panel border border-theme-border px-4 py-3 text-theme-text text-sm focus:outline-none focus:border-gold-400 focus:bg-theme-card transition-colors rounded-sm cursor-pointer"
                  >
                    <option value="expedited" className="bg-theme-bg text-theme-text">Expedited (6-8 weeks)</option>
                    <option value="8-12 weeks" className="bg-theme-bg text-theme-text">Standard Atelier (8-12 weeks)</option>
                    <option value="12-16 weeks" className="bg-theme-bg text-theme-text">Intricate Handwork (12-16 weeks)</option>
                    <option value="flexible" className="bg-theme-bg text-theme-text">No Rush (Highest Precision)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-theme-muted">
                    Estimated Budget Scale
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-theme-panel border border-theme-border px-4 py-3 text-theme-text text-sm focus:outline-none focus:border-gold-400 focus:bg-theme-card transition-colors rounded-sm cursor-pointer"
                  >
                    <option value="bespoke-singular" className="bg-theme-bg text-theme-text">Singular Artpiece ($2,000 - $10,000)</option>
                    <option value="luxury" className="bg-theme-bg text-theme-text">Entire Room Suite ($10,000 - $50,000)</option>
                    <option value="residential-estate" className="bg-theme-bg text-theme-text">Full Estate / Hotel Development ($50,000+)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-theme-muted">
                  Aesthetic Guidelines, Custom Dimensions, or Swatch Instructions
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Specify preferences for timber types, specific aniline leather finishes, or layout challenges..."
                  className="w-full bg-theme-panel border border-theme-border px-4 py-3 text-theme-text text-sm focus:outline-none focus:border-gold-400 focus:bg-theme-card transition-colors rounded-sm resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-gold-500 text-black font-mono text-xs font-semibold uppercase tracking-widest hover:bg-theme-text hover:text-theme-bg transition-all duration-300 flex items-center justify-center gap-2 rounded-sm cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Commission Request</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-12 space-y-6 max-w-md mx-auto animate-fade-in">
              <div className="flex justify-center">
                <div className="h-16 w-16 bg-gold-500/10 border border-gold-500/30 rounded-full flex items-center justify-center text-gold-400">
                  <CheckCircle className="h-8 w-8 stroke-[1.2]" />
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-xl text-theme-text">COMMISSION FILED SUCCESSFULLY</h4>
                <p className="font-mono text-xs text-gold-500 uppercase tracking-widest">
                  REFERENCE NUMBER: {quoteId}
                </p>
              </div>
              <p className="font-serif text-theme-muted text-sm leading-relaxed">
                Thank you for choosing the House of Vision Worth, <span className="text-theme-text font-medium">{formData.name}</span>.
              </p>
              <p className="font-mono text-theme-muted/80 text-[10px] uppercase tracking-widest leading-relaxed">
                A copy of your quote docket has been encrypted and routed to our Senior Design Consuls. We will evaluate current timber selections, workshop schedules, and courier logistics to prepare your formal prospectus.
              </p>
              <p className="font-mono text-theme-muted text-xs italic">
                Our team will reach out to {formData.email} within 24 hours.
              </p>
              <button
                id="close-success-consult-btn"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-theme-text text-theme-bg font-mono text-xs uppercase tracking-widest font-semibold hover:bg-gold-500 hover:text-theme-bg transition-colors duration-300 rounded-sm cursor-pointer"
              >
                <span>Return to Catalogue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
