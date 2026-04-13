/**
 * FabricPicker.tsx
 * ─────────────────────────────────────────────────────────
 * Combined Step 1 — replaces old Step 1 (Shade Type) + Step 2 (Choose Fabric)
 * Accepts existing Fabric type from types.ts, adapts internally.
 */

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import styles from './FabricPicker.module.css';
import { Fabric } from '../types';
import { getFabricUrl, isSaleActive, SALE_CONFIG, getGridPrice, applyMarkup } from '../constants';

type ShadeFilter = 'Blackout' | 'Light Filtering';

interface FabricPickerProps {
  fabrics: Fabric[];
  loading: boolean;
  selectedId?: string;
  shadeType: string;
  width: number;
  height: number;
  widthFraction: string;
  heightFraction: string;
  onShadeTypeChange: (type: string) => void;
  onFabricSelect: (fabric: Fabric) => void;
  onConfirm: () => void;
  onAddSwatch: (fabric: Fabric) => void;
  requestedSwatches: string[];
}

const PAGE_SIZE = 18;

export default function FabricPicker({
  fabrics,
  loading,
  selectedId,
  shadeType,
  width,
  height,
  widthFraction,
  heightFraction,
  onShadeTypeChange,
  onFabricSelect,
  onConfirm,
  onAddSwatch,
  requestedSwatches,
}: FabricPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const searchRef = useRef<HTMLInputElement>(null);

  const parseFrac = (f: string) => { if (!f || f === '0') return 0; if (f.includes('/')) { const [n, d] = f.split('/').map(Number); return n / d; } return 0; };
  const dimW = (width || 0) + parseFrac(widthFraction);
  const dimH = (height || 0) + parseFrac(heightFraction);
  const hasDims = dimW > 0 && dimH > 0;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const activeFilter: ShadeFilter = shadeType === 'Blackout' ? 'Blackout' : 'Light Filtering';

  const handleFilterChange = useCallback((type: ShadeFilter) => {
    onShadeTypeChange(type);
    setSearchQuery('');
    setDebouncedQuery('');
    setVisibleCount(PAGE_SIZE);
  }, [onShadeTypeChange]);

  const filtered = useMemo(() => {
    let list = fabrics.filter(f => f.category === activeFilter);
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase().trim();
      list = list.filter(f => f.name.toLowerCase().includes(q));
    }
    return list;
  }, [fabrics, activeFilter, debouncedQuery]);

  const visibleFabrics = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const selectedFabric = fabrics.find(f => f.id === selectedId) || null;

  const blackoutCount = useMemo(() => fabrics.filter(f => f.category === 'Blackout').length, [fabrics]);
  const lfCount = useMemo(() => fabrics.filter(f => f.category === 'Light Filtering').length, [fabrics]);

  const getPrice = (fabric: Fabric) => {
    if (!hasDims) return null;
    const raw = getGridPrice(fabric.priceGroup, dimW, dimH);
    return isSaleActive() ? Math.round(raw * (1 - SALE_CONFIG.discountPercent / 100)) : raw;
  };

  const getOriginalPrice = (fabric: Fabric) => {
    if (!hasDims || !isSaleActive()) return null;
    return getGridPrice(fabric.priceGroup, dimW, dimH);
  };

  if (loading) {
    return (
      <div className={styles.root}>
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#B0ACA5' }}>Loading fabrics...</div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {/* ── Toggle ── */}
      <div className={styles.toggleBar}>
        <button
          type="button"
          className={`${styles.toggleOption} ${activeFilter === 'Blackout' ? styles.toggleActive : ''}`}
          onClick={() => handleFilterChange('Blackout')}
        >
          <span className={styles.toggleLabel}>
            Blackout
            {activeFilter === 'Blackout' && <span className={styles.popularBadge}>Popular</span>}
          </span>
          <span className={styles.toggleSub}>Blocks 99%+ light · {blackoutCount} fabrics</span>
        </button>
        <button
          type="button"
          className={`${styles.toggleOption} ${activeFilter === 'Light Filtering' ? styles.toggleActive : ''}`}
          onClick={() => handleFilterChange('Light Filtering')}
        >
          <span className={styles.toggleLabel}>Light Filtering</span>
          <span className={styles.toggleSub}>Softens sunlight · {lfCount} fabrics</span>
        </button>
      </div>

      {/* ── Search ── */}
      <div className={styles.searchBar}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.searchIcon}>
          <circle cx="6.5" cy="6.5" r="5" /><line x1="10" y1="10" x2="15" y2="15" />
        </svg>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
          autoComplete="off"
        />
        {searchQuery && (
          <button
            type="button"
            className={styles.searchClear}
            onClick={() => { setSearchQuery(''); setDebouncedQuery(''); searchRef.current?.focus(); }}
            aria-label="Clear search"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="4" x2="12" y2="12" /><line x1="12" y1="4" x2="4" y2="12" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Fabric Grid ── */}
      {visibleFabrics.length > 0 ? (
        <div className={styles.grid}>
          {visibleFabrics.map((fabric) => {
            const isSelected = fabric.id === selectedId;
            const price = getPrice(fabric);
            const origPrice = getOriginalPrice(fabric);
            const thumbUrl = getFabricUrl(fabric.cloudinaryId, 'thumb');
            return (
              <button
                key={fabric.id}
                type="button"
                className={`${styles.tile} ${isSelected ? styles.tileSelected : ''}`}
                onClick={() => onFabricSelect(fabric)}
              >
                <div
                  className={styles.swatch}
                  style={thumbUrl ? { backgroundImage: `url(${thumbUrl})`, backgroundSize: 'cover' } : { backgroundColor: '#ddd' }}
                >
                  {isSelected && (
                    <div className={styles.checkOverlay}>
                      <svg viewBox="0 0 16 16" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                        <polyline points="3,8 7,12 13,4" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className={styles.tileInfo}>
                  <div className={styles.tileName}>{fabric.name}</div>
                  {price !== null && (
                    <div className={styles.tilePrice}>
                      {origPrice && <span className={styles.oldPrice}>${origPrice}</span>}
                      <span>${price}</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div className={styles.emptyText}>No fabrics match</div>
          <div className={styles.emptySub}>Try a different search term</div>
        </div>
      )}

      {/* ── Show More ── */}
      {hasMore && (
        <button
          type="button"
          className={styles.showMore}
          onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
        >
          Show More Fabrics ({filtered.length - visibleCount} remaining)
        </button>
      )}

      {/* ── Selection Banner ── */}
      {selectedFabric && (
        <div className={styles.selectionBanner}>
          <div
            className={styles.selSwatch}
            style={{ backgroundImage: `url(${getFabricUrl(selectedFabric.cloudinaryId, 'thumb')})`, backgroundSize: 'cover' }}
          />
          <div className={styles.selText}>
            <div className={styles.selName}>{selectedFabric.name} — {selectedFabric.category}</div>
            <div className={styles.selDetail}>
              ✓ Selected{getPrice(selectedFabric) !== null ? ` · $${getPrice(selectedFabric)}` : ''}
            </div>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <button
        type="button"
        className={`${styles.cta} ${!selectedId ? styles.ctaDisabled : ''}`}
        disabled={!selectedId}
        onClick={onConfirm}
      >
        Continue to Installation
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={styles.ctaArrow}>
          <polyline points="6,3 12,8 6,13" />
        </svg>
      </button>
      {!selectedId && <div className={styles.ctaHint}>Select a fabric to continue</div>}
    </div>
  );
}
