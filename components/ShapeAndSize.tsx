/**
 * ShapeAndSize.tsx
 * ─────────────────────────────────────────────────────────
 * Combined Step 0 — replaces old Step 0 (Shape) + Step 1 (Measurements)
 */

import React, { useRef, useEffect, useState } from 'react';
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
  { value: '', label: 'None' },
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

  const [showMeasureGuide, setShowMeasureGuide] = useState(false);
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
      {/* Step header removed — Stepper accordion already shows it */}
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
        <div className={styles.measHeader}>
          <div className={styles.measTitle}>Enter your window size</div>
          <button
            type="button"
            className={styles.measGuideLink}
            onClick={() => setShowMeasureGuide(true)}
          >
            How to measure ›
          </button>
        </div>

        <div className={styles.measReassurance}>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={styles.measCheckIcon}
          >
            <polyline points="3,8 7,12 13,4" />
          </svg>
          We verify your measurements before production.
        </div>

        {/* ── Diagram + Inputs Row ── */}
        <div className={styles.measRow}>
          <div className={styles.measDiagram}>
            <img
              src="https://res.cloudinary.com/dcmlcfynd/image/upload/w_400,q_auto,f_auto/v1764525899/Bottom_up_rectangle_jvenzj.webp"
              alt="Window measurement diagram showing width and height"
              className={styles.measDiagramImg}
            />
          </div>

          <div className={styles.measInputs}>
            <div className={styles.measField}>
              <label className={styles.measLabel}>Width</label>
              <div className={`${styles.measInputWrap} ${width ? styles.measInputFilled : ''}`}>
                <input
                  ref={widthInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Inches"
                  value={width}
                  onChange={(e) => handleNumericInput(e, onWidthChange)}
                  onKeyDown={handleWidthKeyDown}
                  className={styles.measInput}
                  autoComplete="off"
                />
                <span className={styles.measUnit}>IN</span>
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

            <div className={styles.measField}>
              <label className={styles.measLabel}>Height</label>
              <div className={`${styles.measInputWrap} ${height ? styles.measInputFilled : ''}`}>
                <input
                  ref={heightInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Inches"
                  value={height}
                  onChange={(e) => handleNumericInput(e, onHeightChange)}
                  onKeyDown={handleHeightKeyDown}
                  className={styles.measInput}
                  autoComplete="off"
                />
                <span className={styles.measUnit}>IN</span>
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
        </div>

        <div className={styles.measExample}>Example: 36" W × 60" H</div>

        <div className={styles.measProLink}>
          Not comfortable measuring?{' '}
          <button type="button" className={styles.proLinkBtn} onClick={onProService}>
            Have a pro do it →
          </button>
        </div>
      </div>

      {/* ── CTA ── */}
      <button
        type="button"
        className={`${styles.cta} ${!isValid ? styles.ctaDisabled : ''}`}
        disabled={!isValid}
        onClick={onConfirm}
      >
        Choose My Shade
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={styles.ctaArrow}>
          <polyline points="6,3 12,8 6,13" />
        </svg>
      </button>
      {!isValid && (
        <div className={styles.ctaHint}>Enter your measurements to continue</div>
      )}

      {/* ── Measure Guide Overlay ── */}
      {showMeasureGuide && (
        <div className={styles.overlay} onClick={() => setShowMeasureGuide(false)}>
          <div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.overlayClose} onClick={() => setShowMeasureGuide(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <img
              src="https://res.cloudinary.com/dcmlcfynd/image/upload/w_800,q_auto,f_auto/v1764525899/Bottom_up_rectangle_jvenzj.webp"
              alt="How to measure your window — width and height diagram"
              className={styles.overlayImg}
            />
            <p className={styles.overlayCaption}>Measure the width and height of your window opening in inches. We precision-cut to 1/8".</p>
          </div>
        </div>
      )}
    </div>
  );
}
