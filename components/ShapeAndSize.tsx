/**
 * ShapeAndSize.tsx
 * ─────────────────────────────────────────────────────────
 * Combined Step 0 — replaces old Step 0 (Shape) + Step 1 (Measurements)
 * Clean layout: shape card → side-by-side inputs → help link → mount note → CTA
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
            <div className={styles.shapeSub}>90% of homes · Starting at $116</div>
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

        {/* ── CTA ── */}
        <button
          type="button"
          className={`${styles.cta} ${!isValid ? styles.ctaDisabled : ''}`}
          disabled={!isValid}
          onClick={onConfirm}
        >
          Next Step
        </button>

        {/* ── Help Link ── */}
        <div className={styles.helpSection}>
          <p className={styles.helpText}>
            Need help measuring? To view our step-by-step instructions,{' '}
            <a
              href="/blog/how-to-measure-windows-roller-shades"
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
          <button type="button" className={styles.proLinkBtn} onClick={onProService}>
            Have a pro do it →
          </button>
        </div>
      </div>
    </div>
  );
}
