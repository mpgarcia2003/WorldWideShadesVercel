/**
 * ShapeAndSize.tsx
 * ─────────────────────────────────────────────────────────
 * Combined Step 0 — replaces old Step 0 (Shape) + Step 1 (Measurements)
 * Clean layout: shape card → side-by-side inputs → help link → mount note
 * CTA handled by StickyBottomBar
 */

import React, { useRef, useEffect } from 'react';
import styles from './ShapeAndSize.module.css';

interface ShapeAndSizeProps {
  onConfirm: () => void;
  onSelectSpecialty: () => void;
  onProService: () => void;
  onHowToMeasure: () => void;
  selectedShape: 'rectangular' | 'specialty';
  width: string;
  height: string;
  widthFraction: string;
  heightFraction: string;
  onWidthChange: (val: string) => void;
  onHeightChange: (val: string) => void;
  onWidthFractionChange: (val: string) => void;
  onHeightFractionChange: (val: string) => void;
  splitOversize?: boolean;
  onSplitOversizeChange?: (val: boolean) => void;
  splitWidthA?: number;
  splitWidthB?: number;
  onSplitWidthAChange?: (val: number) => void;
  onSplitWidthBChange?: (val: number) => void;
}

const FRACTIONS = [
  { value: '', label: '—' },
  { value: '1/8', label: '⅛' },
  { value: '1/4', label: '¼' },
  { value: '3/8', label: '⅜' },
  { value: '1/2', label: '½' },
  { value: '5/8', label: '⅝' },
  { value: '3/4', label: '¾' },
  { value: '7/8', label: '⅞' },
];

export default function ShapeAndSize({
  onConfirm,
  onSelectSpecialty,
  onProService,
  onHowToMeasure,
  selectedShape,
  width,
  height,
  widthFraction,
  heightFraction,
  onWidthChange,
  onHeightChange,
  onWidthFractionChange,
  onHeightFractionChange,
  splitOversize = false,
  onSplitOversizeChange,
  splitWidthA,
  splitWidthB,
  onSplitWidthAChange,
  onSplitWidthBChange,
}: ShapeAndSizeProps) {
  const widthInputRef = useRef<HTMLInputElement>(null);
  const heightInputRef = useRef<HTMLInputElement>(null);

  const isValid = width.trim() !== '' && height.trim() !== '';

  useEffect(() => {
    const timer = setTimeout(() => {
      widthInputRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleNumericInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setter(val);
  };

  const handleWidthKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      if (e.key === 'Enter') e.preventDefault();
      heightInputRef.current?.focus();
    }
  };

  const handleHeightKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid) {
      e.preventDefault();
      onConfirm();
    }
  };

  return (
    <div className={styles.root}>
      {/* ── Shape Selection (compact, pre-selected) ── */}
      <div
        className={`${styles.shapeCard} ${
          selectedShape === 'rectangular' ? styles.shapeCardSelected : ''
        }`}
      >
        <div className={styles.shapeRow}>
          <div className={styles.shapeIcon}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="14" height="14" rx="1.5" />
            </svg>
          </div>
          <div className={styles.shapeInfo}>
            <div className={styles.shapeName}>Rectangular</div>
            <div className={styles.shapeSub}>90% of homes · Starting at $104</div>
          </div>
          <div className={styles.shapeCheck}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="3,8 7,12 13,4" />
            </svg>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={styles.uniqueLink}
        onClick={onSelectSpecialty}
      >
        Have a unique shape?{' '}
        <span className={styles.uniqueLinkUnderline}>Triangle, arch, or angled →</span>
      </button>

      {/* ── Divider ── */}
      <div className={styles.divider} />

      {/* ── Measurements Section ── */}
      <div className={styles.measSection}>
        {/* ── Side-by-side Width + Height ── */}
        <div className={styles.measRow}>
          {/* Width */}
          <div className={styles.measField}>
            <label className={styles.measLabel}>Width</label>
            <div className={styles.measInputGroup}>
              <div className={`${styles.measInputWrap} ${width ? styles.measInputFilled : ''}`}>
                <input
                  ref={widthInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="—"
                  value={width}
                  onChange={(e) => handleNumericInput(e, onWidthChange)}
                  onKeyDown={handleWidthKeyDown}
                  className={styles.measInput}
                  autoComplete="off"
                />
              </div>
              <select
                value={widthFraction}
                onChange={(e) => onWidthFractionChange(e.target.value)}
                className={styles.measFraction}
                aria-label="Width fraction"
              >
                {FRACTIONS.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Height */}
          <div className={styles.measField}>
            <label className={styles.measLabel}>Height</label>
            <div className={styles.measInputGroup}>
              <div className={`${styles.measInputWrap} ${height ? styles.measInputFilled : ''}`}>
                <input
                  ref={heightInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="—"
                  value={height}
                  onChange={(e) => handleNumericInput(e, onHeightChange)}
                  onKeyDown={handleHeightKeyDown}
                  className={styles.measInput}
                  autoComplete="off"
                />
              </div>
              <select
                value={heightFraction}
                onChange={(e) => onHeightFractionChange(e.target.value)}
                className={styles.measFraction}
                aria-label="Height fraction"
              >
                {FRACTIONS.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── Dimension display ── */}
        {isValid && (
          <div className={styles.dimensionDisplay}>
            WIDTH: {width}{widthFraction ? ` ${widthFraction}` : ''}&quot; &nbsp; HEIGHT: {height}{heightFraction ? ` ${heightFraction}` : ''}&quot;
          </div>
        )}

        {/* ── Freight + Split choice — inline, right under the size inputs (no scrolling needed) ── */}
        {(() => {
          const widthNum = parseFloat(width || '0');
          const fracNum = widthFraction && widthFraction.includes('/')
            ? (() => { const [n, d] = widthFraction.split('/').map(Number); return n / d; })()
            : 0;
          const totalWidth = widthNum + fracNum;
          if (totalWidth <= 108) return null;

          const totalWidthRounded = Math.round(widthNum);
          const defaultA = Math.ceil(widthNum / 2);
          const defaultB = Math.floor(widthNum / 2);
          const valA = splitWidthA ?? defaultA;
          const valB = splitWidthB ?? defaultB;
          const splitSum = (valA || 0) + (valB || 0);
          const sumMatchesTotal = Math.abs(splitSum - totalWidthRounded) <= 1; // ±1" tolerance for rounding
          const eitherTooWide = valA > 108 || valB > 108;

          return (
            <div style={{ marginTop: '0.75rem', padding: '0.875rem', borderRadius: '0.75rem', border: '2px solid #f59e0b', backgroundColor: '#fffbeb' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ flexShrink: 0, marginTop: '0.125rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#92400e', marginBottom: '2px', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Oversize Shade ({widthNum}&quot; wide) — Choose How to Ship
                  </div>
                  <p style={{ fontSize: '11px', color: '#78350f', lineHeight: '1.4', margin: 0 }}>
                    Shades wider than 108&quot; can&apos;t fit in FedEx. Pick the option that works best for you:
                  </p>
                </div>
              </div>

              {/* Option A: keep as one + freight */}
              <button
                type="button"
                onClick={() => onSplitOversizeChange?.(false)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  borderRadius: '0.5rem',
                  border: !splitOversize ? '2px solid #c8a165' : '2px solid #e5e7eb',
                  background: !splitOversize ? '#fffaf0' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.625rem',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: !splitOversize ? '2px solid #c8a165' : '2px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  {!splitOversize && <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#c8a165' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a1a' }}>Keep as 1 shade</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#c2410c' }}>+$475 freight</span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#666', margin: 0, lineHeight: '1.35' }}>
                    1× shade at full {widthNum}&quot; width · ships freight (3–7 days, requires signature)
                  </p>
                </div>
              </button>

              {/* Option B: split into two */}
              <button
                type="button"
                onClick={() => onSplitOversizeChange?.(true)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: splitOversize ? '2px solid #16a34a' : '2px solid #e5e7eb',
                  background: splitOversize ? '#f0fdf4' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.625rem',
                  transition: 'all 0.15s',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', top: '-8px', right: '12px', fontSize: '9px', fontWeight: 700, color: '#fff', backgroundColor: '#16a34a', padding: '2px 8px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Recommended
                </div>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: splitOversize ? '2px solid #16a34a' : '2px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  {splitOversize && <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#16a34a' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a1a' }}>Split into 2 shades</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>FREE shipping</span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#666', margin: '0 0 4px', lineHeight: '1.35' }}>
                    2× shades meeting in the middle · ships standard FedEx · saves $475
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px', fontSize: '10px', color: '#15803d' }}>
                    <span>✓ Easier to install</span>
                    <span>✓ No signature required</span>
                    <span style={{ color: '#a16207' }}>⚠ Small ~¼&quot; light gap at center</span>
                  </div>
                </div>
              </button>

              {/* Split width inputs — only when split is selected */}
              {splitOversize && (
                <div style={{ marginTop: '0.75rem', padding: '0.75rem', borderRadius: '0.5rem', background: '#fff', border: '1px solid #d1fae5' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Customize each shade width
                  </div>
                  <p style={{ fontSize: '10px', color: '#666', margin: '0 0 0.625rem', lineHeight: '1.4' }}>
                    Defaults to a 50/50 split. Adjust each shade independently for oddly-sized windows. Together they should add up to about {totalWidthRounded}&quot;.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#666', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Shade 1 width
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="number"
                          min="0"
                          max="108"
                          value={valA || ''}
                          onChange={(e) => {
                            const v = e.target.value;
                            onSplitWidthAChange?.(v === '' ? 0 : Number(v));
                          }}
                          style={{ width: '100%', padding: '8px 26px 8px 10px', borderRadius: '6px', border: valA > 108 ? '2px solid #dc2626' : '1px solid #d1d5db', fontSize: '14px', fontWeight: 600, fontFamily: 'inherit' }}
                        />
                        <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', fontWeight: 700, color: '#9ca3af' }}>IN</span>
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#666', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Shade 2 width
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="number"
                          min="0"
                          max="108"
                          value={valB || ''}
                          onChange={(e) => {
                            const v = e.target.value;
                            onSplitWidthBChange?.(v === '' ? 0 : Number(v));
                          }}
                          style={{ width: '100%', padding: '8px 26px 8px 10px', borderRadius: '6px', border: valB > 108 ? '2px solid #dc2626' : '1px solid #d1d5db', fontSize: '14px', fontWeight: 600, fontFamily: 'inherit' }}
                        />
                        <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', fontWeight: 700, color: '#9ca3af' }}>IN</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px' }}>
                    <span style={{ color: '#666' }}>
                      Total: <strong style={{ color: sumMatchesTotal ? '#16a34a' : '#dc2626' }}>{splitSum}&quot;</strong> of {totalWidthRounded}&quot;
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onSplitWidthAChange?.(defaultA);
                        onSplitWidthBChange?.(defaultB);
                      }}
                      style={{ fontSize: '10px', color: '#c8a165', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
                    >
                      Reset to 50/50
                    </button>
                  </div>
                  {eitherTooWide && (
                    <p style={{ fontSize: '10px', color: '#dc2626', margin: '6px 0 0', fontWeight: 600 }}>
                      ⚠ Each shade must be 108&quot; or less. Adjust the widths above.
                    </p>
                  )}
                  {!sumMatchesTotal && !eitherTooWide && (
                    <p style={{ fontSize: '10px', color: '#a16207', margin: '6px 0 0' }}>
                      Note: split widths total {splitSum}&quot; (window is {totalWidthRounded}&quot;). {splitSum > totalWidthRounded ? `Will overlap by ${splitSum - totalWidthRounded}".` : `Gap of ${totalWidthRounded - splitSum}" at center.`}
                    </p>
                  )}
                </div>
              )}

              {splitOversize && (
                <p style={{ fontSize: '10px', color: '#78350f', marginTop: '0.5rem', marginBottom: 0, fontStyle: 'italic' }}>
                  Note: each split shade is fully configured (own motor, valance, etc.). For a shared remote/hub setup at custom pricing, call (844) 674-2716.
                </p>
              )}
            </div>
          );
        })()}

        {/* ── Help Link ── */}
        <div className={styles.helpSection}>
          <p className={styles.helpText}>
            Need help measuring? To view our step-by-step instructions,{' '}
            <a
              href="/WWS-Window-Measuring-Guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.helpLink}
            >
              click here
            </a>.
          </p>
        </div>

        {/* ── Mount Note ── */}
        <div className={styles.mountNote}>
          <p>
            For <strong>inside mount</strong>, material will be approximately 1 3/8&quot;
            narrower than your ordering width to allow for brackets. For{' '}
            <strong>outside mount</strong>, material will be 1 1/4&quot; narrower than
            the measurement you provide to allow for brackets.
          </p>
        </div>

        {/* ── Pro Link ── */}
        <div className={styles.measProLink}>
          Not comfortable measuring?{' '}
          <a href="tel:+18446742716" className={styles.proLinkBtn}>
            Call (844) 674-2716 — we'll guide you →
          </a>
        </div>
      </div>
    </div>
  );
}
