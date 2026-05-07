/**
 * FabricPicker.tsx
 * ─────────────────────────────────────────────────────────
 * Step 1 — Choose Fabric. Two layout modes:
 *
 *   BROWSE MODE (default — "All colors" selected, no search)
 *     Fabrics grouped by color pill (Whites, Beige, Browns, …) into
 *     editorial sections with serif headers. Each section sorted by the
 *     standard price-tier + brand-priority logic. Sections cap at
 *     SECTION_PREVIEW tiles with a "Show all X" CTA that activates the
 *     filter for that color.
 *
 *   FILTER MODE (specific color pill OR search query)
 *     Flat grid sorted cheapest-first. Filter status banner explains
 *     what's being shown with a Reset link.
 *
 * Color pills are derived from the `colorPill` field on each Fabric,
 * populated at parse-time from the master CSV mapping in
 * `lib/fabric-color-pills.ts`.
 */

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import styles from './FabricPicker.module.css';
import { Fabric } from '../types';
import { getFabricUrl, isSaleActive, SALE_CONFIG, getGridPrice, applyMarkup } from '../constants';
import { COLOR_PILL_ORDER, COLOR_PILL_DOTS, type ColorPill } from '../lib/fabric-color-pills';

// ─── FABRIC DISPLAY PRIORITY ──────────────────────────────
// Per-price-tier preferred order. Within each tier, fabrics whose name starts
// with one of these strings are shown first, in array order. Everything else
// in that tier (the "rest") comes after, alphabetically.
// Fabric names are formatted as "{Brand} {FabricCode} | {Color}" so a value of
// "Phifer 7800" matches just that specific Phifer code, while "Mermet" matches
// every Mermet fabric in that tier.
const TIER_FABRIC_PRIORITY: Record<string, string[]> = {
  B: ['Phifer 7800', 'Senbesta'],
  C: ['Mermet', 'Texstyle', 'Phifer 4800'],
  D: ['Mermet', 'Texstyle', 'Phifer 7400'],
};

const getFabricPriorityIndex = (fabric: Fabric): number => {
  const tierList = TIER_FABRIC_PRIORITY[fabric.priceGroup];
  if (!tierList) return 999; // No priority defined for this tier
  for (let i = 0; i < tierList.length; i++) {
    if (fabric.name.startsWith(tierList[i])) return i;
  }
  return 999; // Not in priority list — falls into the "rest" bucket
};

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
const SECTION_PREVIEW = 12; // Max tiles per color section in browse mode before showing "Show all"

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
  const [activeColorPill, setActiveColorPill] = useState<ColorPill | null>(null); // null = "All colors"
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
    setActiveColorPill(null); // Reset to "All colors" when shade type changes
  }, [onShadeTypeChange]);

  // Reset pagination when any filter changes (but not on every dimension change)
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeColorPill, debouncedQuery, activeFilter]);

  // ─── DATA PIPELINE ──────────────────────────────────────
  // candidates = all fabrics in current shade type (Blackout / Light Filtering)
  const candidates = useMemo(
    () => fabrics.filter(f => f.category === activeFilter),
    [fabrics, activeFilter]
  );

  // Standard sort: 1) price tier (cheapest first), 2) within tier, brand priority, 3) alphabetical
  const sortFabrics = useCallback((list: Fabric[]) => {
    return list.slice().sort((a, b) => {
      const tierCompare = hasDims
        ? getGridPrice(a.priceGroup, dimW, dimH) - getGridPrice(b.priceGroup, dimW, dimH)
        : (a.priceGroup || 'Z').localeCompare(b.priceGroup || 'Z');
      if (tierCompare !== 0) return tierCompare;

      const aPriority = getFabricPriorityIndex(a);
      const bPriority = getFabricPriorityIndex(b);
      if (aPriority !== bPriority) return aPriority - bPriority;

      return a.name.localeCompare(b.name);
    });
  }, [hasDims, dimW, dimH]);

  // Counts per color pill (within current shade type) — drives which pills render and which are hidden
  const pillCounts = useMemo(() => {
    const counts: Partial<Record<ColorPill, number>> = {};
    for (const f of candidates) {
      if (f.colorPill) counts[f.colorPill] = (counts[f.colorPill] || 0) + 1;
    }
    return counts;
  }, [candidates]);

  // Only show pills that have at least 1 fabric in the current shade type
  const availablePills = useMemo(
    () => COLOR_PILL_ORDER.filter(p => (pillCounts[p] || 0) > 0),
    [pillCounts]
  );

  // Layout decision: flat (filter/search active) vs grouped (browse mode)
  const isFlatMode = activeColorPill !== null || debouncedQuery.trim().length > 0;

  // Flat list (used when isFlatMode = true)
  const flatList = useMemo(() => {
    if (!isFlatMode) return [];
    let list = candidates;
    if (activeColorPill) list = list.filter(f => f.colorPill === activeColorPill);
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase().trim();
      list = list.filter(f => f.name.toLowerCase().includes(q));
    }
    return sortFabrics(list);
  }, [isFlatMode, candidates, activeColorPill, debouncedQuery, sortFabrics]);

  // Grouped sections (used when isFlatMode = false)
  const groupedSections = useMemo(() => {
    if (isFlatMode) return [];
    const map = new Map<ColorPill, Fabric[]>();
    for (const f of candidates) {
      if (!f.colorPill) continue;
      if (!map.has(f.colorPill)) map.set(f.colorPill, []);
      map.get(f.colorPill)!.push(f);
    }
    return COLOR_PILL_ORDER
      .filter(p => map.has(p))
      .map(p => ({ pill: p, fabrics: sortFabrics(map.get(p)!) }));
  }, [isFlatMode, candidates, sortFabrics]);

  const flatVisible = flatList.slice(0, visibleCount);
  const flatHasMore = visibleCount < flatList.length;
  const selectedFabric = fabrics.find(f => f.id === selectedId) || null;

  const blackoutCount = useMemo(() => fabrics.filter(f => f.category === 'Blackout').length, [fabrics]);
  const lfCount = useMemo(() => fabrics.filter(f => f.category === 'Light Filtering').length, [fabrics]);

  const getPrice = (fabric: Fabric) => {
    if (!hasDims) return null;
    const raw = getGridPrice(fabric.priceGroup, dimW, dimH);
    return isSaleActive() ? Math.round(raw * (1 - SALE_CONFIG.shadeDiscount / 100)) : raw;
  };

  const getOriginalPrice = (fabric: Fabric) => {
    if (!hasDims || !isSaleActive()) return null;
    return getGridPrice(fabric.priceGroup, dimW, dimH);
  };

  const handleResetFilters = () => {
    setActiveColorPill(null);
    setSearchQuery('');
    setDebouncedQuery('');
  };

  // Tile renderer — shared by flat and grouped modes
  const renderTile = (fabric: Fabric) => {
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

      {/* ── Color filter pills ── */}
      {availablePills.length > 0 && (
        <div className={styles.colorFilterRow}>
          <span className={styles.colorFilterLabel}>Color</span>
          <button
            type="button"
            className={`${styles.colorPill} ${activeColorPill === null ? styles.colorPillActive : ''}`}
            onClick={() => setActiveColorPill(null)}
          >
            All colors
          </button>
          {availablePills.map(pill => (
            <button
              key={pill}
              type="button"
              className={`${styles.colorPill} ${activeColorPill === pill ? styles.colorPillActive : ''}`}
              onClick={() => setActiveColorPill(pill)}
            >
              <span className={styles.colorPillDot} style={{ background: COLOR_PILL_DOTS[pill] }} />
              {pill}
            </button>
          ))}
        </div>
      )}

      {/* ── Content: flat (filter/search) vs grouped (browse) ── */}
      {isFlatMode ? (
        <>
          {/* Status banner — only shown when a color pill is active (not for plain search) */}
          {activeColorPill && (
            <div className={styles.filterStatus}>
              <span className={styles.filterStatusText}>
                Showing <strong>{activeColorPill}</strong> · {flatList.length} fabric{flatList.length !== 1 ? 's' : ''} · sorted by price
              </span>
              <button type="button" onClick={handleResetFilters} className={styles.filterStatusReset}>
                Reset
              </button>
            </div>
          )}

          {flatVisible.length > 0 ? (
            <div className={styles.grid}>
              {flatVisible.map(renderTile)}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div className={styles.emptyText}>No fabrics match</div>
              <div className={styles.emptySub}>Try a different filter or search term</div>
            </div>
          )}

          {flatHasMore && (
            <button
              type="button"
              className={styles.showMore}
              onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
            >
              Show More Fabrics ({flatList.length - visibleCount} remaining)
            </button>
          )}
        </>
      ) : (
        // ─── BROWSE MODE: grouped sections ──────────────────
        groupedSections.length > 0 ? (
          groupedSections.map(({ pill, fabrics: sectionFabrics }) => {
            const showAll = sectionFabrics.length <= SECTION_PREVIEW;
            const display = showAll ? sectionFabrics : sectionFabrics.slice(0, SECTION_PREVIEW);
            return (
              <section key={pill} className={styles.section}>
                <header className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>{pill}</h3>
                  <span className={styles.sectionCount}>
                    {sectionFabrics.length} fabric{sectionFabrics.length !== 1 ? 's' : ''}
                  </span>
                </header>
                <div className={styles.grid}>
                  {display.map(renderTile)}
                </div>
                {!showAll && (
                  <button
                    type="button"
                    className={styles.sectionMore}
                    onClick={() => setActiveColorPill(pill)}
                  >
                    Show all {sectionFabrics.length} {pill.toLowerCase()} →
                  </button>
                )}
              </section>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyText}>No fabrics available</div>
            <div className={styles.emptySub}>Try the other shade type</div>
          </div>
        )
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

    </div>
  );
}
