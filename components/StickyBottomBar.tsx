/**
 * StickyBottomBar.tsx
 * ─────────────────────────────────────────────────────────
 * Unified sticky CTA bar at the bottom of the builder.
 * Owns ALL step advancement — individual steps no longer have their own CTAs.
 *
 * Left: price + delivery info
 * Right: context-aware CTA button
 */

import React from 'react';
import styles from './StickyBottomBar.module.css';
import { isSaleActive, SALE_CONFIG } from '../constants';

const CTA_LABELS: Record<number, string> = {
  0: 'Choose My Shade',
  1: 'Continue to Installation',
  2: 'Choose Control Type',
  3: 'Customize Your Look',
  4: 'Choose Quantity',
  5: 'Add My Shade to Cart',
};

interface StickyBottomBarProps {
  totalPrice: number;
  originalPrice: number;
  deliveryDate: string;
  currentStepIndex: number | null;
  isStepValid: boolean;
  isLastStep: boolean;
  onContinue: () => void;
  saleActive: boolean;
}

export default function StickyBottomBar({
  totalPrice,
  originalPrice,
  deliveryDate,
  currentStepIndex,
  isStepValid,
  isLastStep,
  onContinue,
  saleActive,
}: StickyBottomBarProps) {
  const stepIdx = currentStepIndex ?? 0;
  const label = CTA_LABELS[stepIdx] || 'Continue';
  const ctaLabel = isLastStep && saleActive
    ? `${label} — ${SALE_CONFIG.maxDiscount}% OFF`
    : label;

  return (
    <div className={styles.bar}>
      {/* Left — Price + Delivery */}
      <div className={styles.info}>
        <div className={styles.priceRow}>
          {saleActive && originalPrice > 0 && (
            <span className={styles.oldPrice}>${originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          )}
          <span className={styles.price}>${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          {saleActive && originalPrice > 0 && (
            <span className={styles.saleBadge}>Up to {SALE_CONFIG.maxDiscount}% OFF</span>
          )}
        </div>
        <div className={styles.meta}>
          <span className={styles.shipping}>Free Shipping</span>
          <span className={styles.dot}>·</span>
          <span className={styles.delivery}>Arrives by {deliveryDate}</span>
        </div>
        <div className={styles.secure}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          Secure checkout
        </div>
      </div>

      {/* Right — CTA */}
      <button
        className={`${styles.cta} ${!isStepValid ? styles.ctaDisabled : ''} ${isLastStep ? styles.ctaCart : ''}`}
        disabled={!isStepValid}
        onClick={onContinue}
      >
        <span className={styles.ctaText}>{ctaLabel}</span>
        {!isLastStep && (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={styles.ctaArrow}>
            <polyline points="6,3 12,8 6,13" />
          </svg>
        )}
      </button>
    </div>
  );
}
