import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ShoppingCart, Ruler, FileText, Hash, Truck, ArrowRight, ArrowLeft, Palette, Wrench, Layers, Package, PenTool, ChevronRight, X, Mail, Check, Phone } from 'lucide-react';

const getEstimatedDelivery = () => {
  const d = new Date();
  let businessDays = 0;
  while (businessDays < 7) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) businessDays++;
  }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
import Visualizer from '../components/Visualizer';
import Stepper from '../components/Stepper';
import ConsultationModal from '../components/ConsultationModal';
import { ShadeConfig, Fabric, WindowSelection, CartItem, RoomAnalysis, ShapeType } from '../types';
import { DEFAULT_ROOM_IMAGE, getGridPrice, SHAPE_CONFIGS, VALANCE_OPTIONS, SIDE_CHANNEL_OPTIONS, STEPS, getFabricUrl, isSaleActive, getSalePrice, SALE_CONFIG, MOTOR_PRICES, applyMarkup } from '../constants';
import { getDynamicFabrics, saveSwatchRequest, saveQuoteConfig, loadQuoteConfig } from '../utils/storage';
import { notifyAdminSwatchRequest, notifyAdminExitIntent, sendCustomerQuoteEmail } from '../utils/email';
import { useLanguage } from '../LanguageContext';
import { trackEvent } from '../utils/analytics';
import { builderHooks } from '../services/analytics';
import PrecisionEmailModal from '../components/PrecisionEmailModal';

interface BuilderProps {
  addToCart: (item: CartItem) => void;
  addToSwatches: (fabric: Fabric) => void;
  swatches: Fabric[];
}

const parseFraction = (fraction: string): number => {
  if (!fraction || fraction === '0') return 0;
  if (fraction.includes('/')) {
    const [num, den] = fraction.split('/').map(Number);
    return num / den;
  }
  return Number(fraction) || 0;
};

const formatDim = (value: number, fraction: string) => {
  if (!fraction || fraction === '0') return `${value}`;
  return `${value} ${fraction}`;
};

// ─── SWATCH-ONLY PATH COMPONENT ──────────────────────────
const SwatchPath: React.FC<{
  fabrics: Fabric[];
  loadingFabrics: boolean;
  onAddSwatch: (fabric: Fabric) => void;
  existingSwatches: Fabric[];
  onBack: () => void;
}> = ({ fabrics, loadingFabrics, onAddSwatch, existingSwatches, onBack }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(existingSwatches.map(s => s.id)));
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', address: '', cityStateZip: '' });

  const toggleSwatch = (fabric: Fabric) => {
    const next = new Set(selectedIds);
    if (next.has(fabric.id)) {
      next.delete(fabric.id);
    } else if (next.size < 5) {
      next.add(fabric.id);
      onAddSwatch(fabric);
    }
    setSelectedIds(next);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center" style={{ animation: 'fadeUp 0.5s ease forwards' }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #c8a165, #b8914f)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12L10 18L20 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 className="text-xl font-light text-[#1a1a1a] tracking-tight mb-2" style={{ letterSpacing: '-0.01em' }}>Swatches on the Way</h2>
        <p className="text-[13px] text-[#999] mb-1 max-w-xs font-normal">
          Your {selectedIds.size} free swatch{selectedIds.size > 1 ? 'es' : ''} will arrive in 3–5 business days.
        </p>
        <p className="text-[11px] text-[#bbb] mb-8">A 10% off coupon will be included with your swatches</p>
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-xl text-white font-medium text-[13px] tracking-wide transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #c8a165, #b8914f)', boxShadow: '0 2px 15px rgba(200,161,101,0.2)' }}
        >
          Ready to Build Your Shade
        </button>
      </div>
    );
  }

  if (showForm) {
    const isFormValid = formData.name.trim() && formData.email.includes('@') && formData.address.trim() && formData.cityStateZip.trim();
    
    const handleSubmitSwatches = async () => {
      if (!isFormValid || isSubmitting) return;
      setIsSubmitting(true);
      
      const selectedFabrics = fabrics.filter(f => selectedIds.has(f.id)).map(f => ({
        id: f.id, name: f.name, category: f.category
      }));
      
      const saved = await saveSwatchRequest({
        name: formData.name.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city_state_zip: formData.cityStateZip.trim(),
        fabrics: selectedFabrics
      });
      
      trackEvent('swatch_order_submitted', { 
        swatch_count: selectedIds.size, 
        saved_to_supabase: saved,
        fabrics: selectedFabrics.map(f => f.name)
      });
      
      // Notify admin via email
      notifyAdminSwatchRequest({
        name: formData.name.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city_state_zip: formData.cityStateZip.trim(),
        fabrics: selectedFabrics
      });
      
      setIsSubmitting(false);
      setSubmitted(true);
    };

    const inputStyle = { border: '1px solid #e0dcd5', color: '#333' };
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = '#c8a165'; e.target.style.boxShadow = '0 0 0 3px rgba(200,161,101,0.08)'; };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = '#e0dcd5'; e.target.style.boxShadow = 'none'; };

    return (
      <div className="p-5" style={{ animation: 'fadeUp 0.4s ease forwards' }}>
        <div className="flex gap-2 flex-wrap mb-5 p-3 rounded-xl" style={{ backgroundColor: '#f9f7f3', border: '1px solid #ece8e0' }}>
          {fabrics.filter(f => selectedIds.has(f.id)).map(f => (
            <div key={f.id} className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-[#666]" style={{ border: '1px solid #e8e5de' }}>
              <div className="w-6 h-6 rounded-sm overflow-hidden bg-gray-50">
                <img src={getFabricUrl(f.cloudinaryId, 'thumb')} alt={f.name} className="w-full h-full object-cover" />
              </div>
              {f.name}
            </div>
          ))}
        </div>

        <h3 className="text-lg font-normal text-[#1a1a1a] mb-1 tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Where should we send them?</h3>
        <p className="text-[11px] text-[#aaa] mb-5">100% free — no credit card required</p>

        <div className="mb-3">
          <label className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#aaa] block mb-1">Full Name</label>
          <input type="text" placeholder="Jane Smith" value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-3 rounded-lg text-[13px] font-normal outline-none transition-all duration-200"
            style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
        <div className="mb-3">
          <label className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#aaa] block mb-1">Email</label>
          <input type="email" placeholder="jane@example.com" value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-3 rounded-lg text-[13px] font-normal outline-none transition-all duration-200"
            style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
        <div className="mb-3">
          <label className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#aaa] block mb-1">Street Address</label>
          <input type="text" placeholder="123 Main St" value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            className="w-full p-3 rounded-lg text-[13px] font-normal outline-none transition-all duration-200"
            style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
        <div className="mb-3">
          <label className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#aaa] block mb-1">City, State, ZIP</label>
          <input type="text" placeholder="New York, NY 10001" value={formData.cityStateZip}
            onChange={(e) => setFormData(prev => ({ ...prev, cityStateZip: e.target.value }))}
            className="w-full p-3 rounded-lg text-[13px] font-normal outline-none transition-all duration-200"
            style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
        </div>

        <button
          onClick={handleSubmitSwatches}
          disabled={!isFormValid || isSubmitting}
          className="w-full mt-3 py-3 rounded-xl font-medium text-[13px] tracking-wide transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40"
          style={isFormValid ? { 
            background: 'linear-gradient(90deg, #C8A165 0%, #E7D8B8 55%, #C8A165 100%)', 
            boxShadow: '0 4px 16px rgba(200,161,101,0.2)', color: '#1a1a1a' 
          } : { backgroundColor: '#e0dcd5', color: '#bbb' }}
        >
          {isSubmitting ? 'Saving...' : 'Send My Free Swatches'}
        </button>
        <button onClick={() => setShowForm(false)} className="w-full mt-2 py-2 text-[#bbb] text-[11px] font-normal hover:text-[#888] transition-colors">
          ← Back to fabric selection
        </button>
      </div>
    );
  }

  // Fabric selection
  const categories = ['Light Filtering', 'Blackout'] as const;

  return (
    <div className="p-5 overflow-y-auto" style={{ animation: 'fadeUp 0.4s ease forwards' }}>
      <div className="text-center mb-6">
        <h2 className="text-xl font-normal text-[#1a1a1a] tracking-tight mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Choose Your Free Swatches</h2>
        <p className="text-[11px] text-[#aaa] font-normal">Select up to 5 fabrics — shipped at no cost</p>
      </div>

      {loadingFabrics ? (
        <div className="text-center py-8 text-[#bbb] text-[13px] font-normal">Loading fabrics...</div>
      ) : (
        categories.map(cat => {
          const catFabrics = fabrics.filter(f => f.category === cat);
          if (catFabrics.length === 0) return null;
          return (
            <div key={cat} className="mb-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#aaa] mb-2.5">{cat}</p>
              <div className="grid grid-cols-4 gap-2">
                {catFabrics.map(f => {
                  const isSelected = selectedIds.has(f.id);
                  const isDisabled = !isSelected && selectedIds.size >= 5;
                  const hasError = imgErrors[f.id];
                  return (
                    <div
                      key={f.id}
                      onClick={() => !isDisabled && toggleSwatch(f)}
                      className={`flex flex-col group cursor-pointer transition-all duration-200 ${isDisabled ? 'opacity-25 pointer-events-none' : ''}`}
                    >
                      <div className={`relative w-full aspect-square rounded-lg overflow-hidden bg-gray-50 border-2 transition-all ${
                        isSelected ? 'border-[#c8a165] shadow-md ring-1 ring-[#c8a165]' : 'border-transparent hover:border-gray-200'
                      }`}>
                        {!hasError ? (
                          <img
                            src={getFabricUrl(f.cloudinaryId, 'thumb')}
                            alt={f.name}
                            onError={() => setImgErrors(prev => ({...prev, [f.id]: true}))}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: `rgb(${f.rgb.r},${f.rgb.g},${f.rgb.b})` }} />
                        )}
                        {isSelected && (
                          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#c8a165' }}>
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        )}
                      </div>
                      <span className={`text-[8px] font-medium text-center mt-1 leading-tight truncate ${isSelected ? 'text-[#8b6d3f]' : 'text-[#999]'}`}>
                        {f.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      <div className="text-center text-[11px] text-[#bbb] mb-3 font-normal">
        {selectedIds.size}/5 selected
        {selectedIds.size >= 5 && <span className="text-[#c8a165] font-medium"> — maximum reached</span>}
      </div>

      <button
        onClick={() => selectedIds.size > 0 && setShowForm(true)}
        disabled={selectedIds.size === 0}
        className="w-full py-3 rounded-xl text-white font-medium text-[13px] tracking-wide transition-all duration-200"
        style={selectedIds.size > 0 
          ? { background: 'linear-gradient(90deg, #C8A165 0%, #E7D8B8 55%, #C8A165 100%)', boxShadow: '0 4px 20px rgba(200,161,101,0.18)' } 
          : { backgroundColor: '#e0dcd5', color: '#bbb', cursor: 'not-allowed' }
        }
      >
        {selectedIds.size > 0 ? `Get ${selectedIds.size} Free Swatch${selectedIds.size > 1 ? 'es' : ''}` : 'Select at least one fabric'}
      </button>
      <button onClick={onBack} className="w-full mt-2 py-2 text-[#bbb] text-[11px] font-normal hover:text-[#888] transition-colors">
        ← I'm ready to build my shade
      </button>
    </div>
  );
};


// ─── MAIN BUILDER COMPONENT ──────────────────────────────
const Builder: React.FC<BuilderProps> = ({ addToCart, addToSwatches, swatches }) => {
  const { t } = useLanguage();
  const [path, setPath] = useState<null | 'build' | 'swatch'>(() => {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('wws_editing_item')) return 'build';
    } catch {}
    return null;
  });
  const [imageSrc, setImageSrc] = useState(DEFAULT_ROOM_IMAGE);
  const [selection, setSelection] = useState<WindowSelection | null>(null);
  const [analysis, setAnalysis] = useState<RoomAnalysis | undefined>(undefined);
  const [openStep, setOpenStep] = useState<number | null>(() => {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('wws_editing_item')) return STEPS.length - 1;
    } catch {}
    return 0;
  });
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [isLoadingFabrics, setIsLoadingFabrics] = useState(false);

  // Progressive accordion state
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(() => {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('wws_editing_item')) {
        const all = new Set<number>();
        for (let i = 0; i < STEPS.length - 1; i++) all.add(i);
        return all;
      }
    } catch {}
    return new Set();
  });

  // WWS AI Analytics refs
  const prevShapeRef = useRef<string>('Standard');
  const prevFabricRef = useRef<string | null>(null);
  const prevMountRef = useRef<string>('Inside Mount');
  const sizeEnteredRef = useRef<boolean>(false);
  const prevStepRef = useRef<number | null>(null);
  const fabricStepStartRef = useRef<number>(Date.now());

  // Exit intent state
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [exitEmail, setExitEmail] = useState('');

  // Precision email modal state (triggers after fabric selection)
  const [showPrecisionModal, setShowPrecisionModal] = useState(false);
  const precisionModalShownRef = useRef(false);

  // Scroll hint for step panel
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Visualizer snapshot — captured whenever canvas re-renders with a selection
  const [visualizerSnapshot, setVisualizerSnapshot] = useState<string | undefined>(undefined);

  const [config, setConfig] = useState<ShadeConfig>(() => {
    const isEditing = typeof window !== 'undefined' && localStorage.getItem('wws_editing_item');
    // Try to restore from localStorage for returning users
    try {
      const saved = localStorage.getItem('wws_builder_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          step: 1, shape: parsed.shape || 'Standard', shadeType: isEditing ? (parsed.shadeType || '') : '', material: null, mountType: parsed.mountType || 'Inside Mount',
          width: isEditing ? (parsed.width || 0) : 0, widthFraction: isEditing ? (parsed.widthFraction || '0') : '0',
          height: isEditing ? (parsed.height || 0) : 0, heightFraction: isEditing ? (parsed.heightFraction || '0') : '0',
          customDims: isEditing ? (parsed.customDims || {}) : {},
          controlType: parsed.controlType || 'Metal Chain', motorPower: parsed.motorPower || 'Rechargeable', controlPosition: parsed.controlPosition || 'Right',
          rollType: parsed.rollType || 'Standard', bottomBar: parsed.bottomBar || 'Fabric Wrapped', quantity: isEditing ? (parsed.quantity || 1) : 1, motorizedController: false,
          motorizedHub: false, motorizedCharger: false, sunSensor: false, zipCode: '', installer: null, measureService: true,
          installService: true, isMeasurementOnly: false, valanceType: parsed.valanceType || 'standard', sideChannelType: parsed.sideChannelType || 'none'
        };
      }
    } catch (e) { /* ignore parse errors */ }
    return {
      step: 1, shape: 'Standard', shadeType: '', material: null, mountType: 'Inside Mount',
      width: 0, widthFraction: '0', height: 0, heightFraction: '0', customDims: {},
      controlType: 'Metal Chain', motorPower: 'Rechargeable', controlPosition: 'Right',
      rollType: 'Standard', bottomBar: 'Fabric Wrapped', quantity: 1, motorizedController: false,
      motorizedHub: false, motorizedCharger: false, sunSensor: false, zipCode: '', installer: null, measureService: true,
      installService: true, isMeasurementOnly: false, valanceType: 'standard', sideChannelType: 'none'
    };
  });

  // === WWS AI Analytics hooks ===
  // Clear edit flag on mount so normal visits aren't affected
  // Move the ID to wws_editing_active for addToCart to check
  useEffect(() => {
    try {
      const editingId = localStorage.getItem('wws_editing_item');
      if (editingId) {
        if (editingId === 'recovery') {
          // Recovery mode — just restore config, don't set editing_active
          localStorage.removeItem('wws_editing_item');
        } else {
          localStorage.setItem('wws_editing_active', editingId);
          localStorage.removeItem('wws_editing_item');
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (path === 'build') { builderHooks.onBuilderOpened(); builderHooks.onShapeSelected('Standard'); }
  }, [path]);

  useEffect(() => {
    if (config.shape !== prevShapeRef.current) {
      builderHooks.onShapeSelected(config.shape);
      prevShapeRef.current = config.shape;
      sizeEnteredRef.current = false;
    }
  }, [config.shape]);

  useEffect(() => {
    if (config.material && config.material.id !== prevFabricRef.current) {
      builderHooks.onFabricSelected(config.material.id, config.material.name, config.material.category || 'General', 0, Date.now() - fabricStepStartRef.current);
      prevFabricRef.current = config.material.id;
      fabricStepStartRef.current = Date.now();
    }
  }, [config.material?.id]);

  useEffect(() => {
    const w = Number(config.width) + parseFraction(config.widthFraction);
    const h = Number(config.height) + parseFraction(config.heightFraction);
    if (w > 0 && h > 0 && !sizeEnteredRef.current) {
      builderHooks.onSizeEntered(w, h, config.shape, config.widthFraction, config.heightFraction);
      sizeEnteredRef.current = true;
    }
  }, [config.width, config.height, config.widthFraction, config.heightFraction]);

  useEffect(() => {
    if (config.mountType !== prevMountRef.current) {
      builderHooks.onMountSelected(config.mountType);
      prevMountRef.current = config.mountType;
    }
  }, [config.mountType]);

  useEffect(() => {
    if (prevStepRef.current !== null && openStep !== null && openStep < prevStepRef.current) {
      builderHooks.onStepBackward(prevStepRef.current, openStep, STEPS);
    }
    prevStepRef.current = openStep;
  }, [openStep]);

  useEffect(() => {
    const loadFabrics = async () => {
      setIsLoadingFabrics(true);
      try {
        const dynamicFabrics = await getDynamicFabrics();
        setFabrics(dynamicFabrics);
      } catch (error) {
        console.error("Failed to load fabrics:", error);
      } finally {
        setIsLoadingFabrics(false);
      }
    };
    loadFabrics();
  }, []);

  // Quote recovery from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quoteId = params.get('quote');
    if (!quoteId) return;

    const recoverQuote = async () => {
      const quoteData = await loadQuoteConfig(quoteId);
      if (!quoteData) return;

      const q = quoteData.config;
      // Auto-select build path
      setPath('build');

      // Restore config fields
      setConfig(prev => ({
        ...prev,
        shape: q.shape || 'Standard',
        shadeType: q.shadeType || '',
        width: q.width || 0,
        height: q.height || 0,
        widthFraction: q.widthFraction || '0',
        heightFraction: q.heightFraction || '0',
        customDims: q.customDims || {},
        customFracs: q.customFracs || {},
        mountType: q.mountType || 'Inside Mount',
        controlType: q.controlType || 'Metal Chain',
      }));

      // Mark early steps as completed so they see where they left off
      const restored = new Set<number>();
      if (q.shape) restored.add(0); // shape
      if (q.width > 0 || q.height > 0) restored.add(1); // measurements
      if (q.shadeType) restored.add(2); // shade type
      if (q.fabricId) restored.add(3); // fabric
      setCompletedSteps(restored);

      // Open next uncompleted step
      let nextStep = 0;
      while (nextStep < STEPS.length && restored.has(nextStep)) nextStep++;
      setOpenStep(nextStep < STEPS.length ? nextStep : null);

      // Skip precision modal since they came from it
      precisionModalShownRef.current = true;

      trackEvent('quote_recovered', { quote_id: quoteId, shape: q.shape, discount_code: quoteData.discount_code });

      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
    };

    recoverQuote();
  }, []);

  // Save config to localStorage for returning users
  useEffect(() => {
    try {
      const toSave = {
        shape: config.shape, shadeType: config.shadeType, mountType: config.mountType,
        width: config.width, widthFraction: config.widthFraction, height: config.height, heightFraction: config.heightFraction,
        customDims: config.customDims, controlType: config.controlType, motorPower: config.motorPower,
        controlPosition: config.controlPosition, rollType: config.rollType, bottomBar: config.bottomBar,
        quantity: config.quantity, valanceType: config.valanceType, sideChannelType: config.sideChannelType
      };
      localStorage.setItem('wws_builder_config', JSON.stringify(toSave));
    } catch (e) { /* ignore storage errors */ }
  }, [config]);

  useEffect(() => {
    if (config.shape === 'Standard') setImageSrc(DEFAULT_ROOM_IMAGE);
    else {
        const shapeConfig = SHAPE_CONFIGS[config.shape];
        if (shapeConfig && shapeConfig.mask) setImageSrc(shapeConfig.mask);
    }
  }, [config.shape]);

  const priceBreakdown = useMemo(() => {
    if (config.isMeasurementOnly && config.installer) {
      const p = 24.99;
      const inst = config.installer.fees.measure;
      return { product: p, saleProduct: p, install: inst, total: p + inst, originalTotal: p + inst, saleActive: isSaleActive() };
    }
    
    const isSpecialty = config.shape !== 'Standard';
    const dims = (config.customDims || {}) as Record<string, number>;
    const hasCustomVal = Object.values(dims).some(v => v > 0);
    const hasSpecialtyDims = isSpecialty && (config.width > 0 || config.height > 0 || hasCustomVal);
    const hasStandardDims = !isSpecialty && config.width > 0 && config.height > 0;

    if (!(hasSpecialtyDims || hasStandardDims) || !config.material) {
      // Even without dimensions, show installer fees if pro service selected
      let installCost = 0;
      if (config.installer) {
        const measureFee = config.measureService ? config.installer.fees.measure : 0;
        const installFee = config.installService ? config.installer.fees.installPerUnit * config.quantity : 0;
        if (config.measureService) {
          installCost = Math.max(measureFee + installFee, config.installer.fees.minimum);
        } else {
          installCost = installFee;
        }
      }
      return { product: 0, saleProduct: 0, install: installCost, total: installCost, originalTotal: installCost, saleActive: isSaleActive() };
    }
    
    let w = Number(config.width) + parseFraction(config.widthFraction);
    let h = Number(config.height) + parseFraction(config.heightFraction);
    
    if (isSpecialty) {
        const wKeys = ['width', 'bottomWidth', 'topWidth'];
        const hKeys = ['height', 'leftHeight', 'rightHeight', 'centerHeight', 'leftAngledLength', 'rightAngledLength'];
        
        w = wKeys.reduce((max, key) => Math.max(max, dims[key] || 0), w);
        h = hKeys.reduce((max, key) => Math.max(max, dims[key] || 0), h);
        
        if (w === 0 || h === 0) {
            const vals = Object.values(dims);
            w = Math.max(...vals, w);
            h = Math.max(...vals, h);
        }
    }
    
    const basePrice = getGridPrice(config.material.priceGroup, w, h, config.shape);
    
    let motorAddons = config.controlType === 'Motorized' ? (config.shape === 'Standard' ? MOTOR_PRICES.base.marked : 0) + (config.motorizedController ? MOTOR_PRICES.remote.marked : 0) + (config.motorizedHub ? MOTOR_PRICES.hub.marked : 0) + (config.motorizedCharger ? MOTOR_PRICES.charger.marked : 0) + (config.sunSensor ? MOTOR_PRICES.sunSensor.marked : 0) : 0;
    
    const valanceOption = VALANCE_OPTIONS.find(v => v.id === config.valanceType);
    const valancePrice = applyMarkup((valanceOption?.pricePerInch || 0)) * w;

    const bannerOption = SIDE_CHANNEL_OPTIONS.find(s => s.id === config.sideChannelType);
    const sideChannelPrice = applyMarkup((bannerOption?.pricePerFoot || 0)) * (h / 12) * 2;

    const unitPrice = basePrice + motorAddons + valancePrice + sideChannelPrice;
    const productTotal = unitPrice * config.quantity;

    let installCost = 0;
    if (config.installer) {
      const measureFee = config.measureService ? config.installer.fees.measure : 0;
      const installFee = config.installService ? config.installer.fees.installPerUnit * config.quantity : 0;
      
      if (config.measureService) {
        installCost = Math.max(measureFee + installFee, config.installer.fees.minimum);
      } else {
        installCost = installFee;
      }
    }
    
    const saleActive = isSaleActive();
    const saleProductTotal = saleActive ? getSalePrice(productTotal) : productTotal;

    return { 
      product: productTotal, 
      saleProduct: saleProductTotal,
      install: installCost, 
      total: saleProductTotal + installCost,
      originalTotal: productTotal + installCost,
      saleActive 
    };
  }, [config]);

  // === WWS AI Analytics: Price + Abandonment (after priceBreakdown) ===
  useEffect(() => {
    if (priceBreakdown.product > 0) {
      const w = Number(config.width) + parseFraction(config.widthFraction);
      const h = Number(config.height) + parseFraction(config.heightFraction);
      builderHooks.onPriceShown(priceBreakdown.product, config.shape, w, h);
    }
  }, [priceBreakdown.product]);

  useEffect(() => {
    const handleLeave = () => {
      if (path === 'build' && (config.material || config.width > 0)) {
        const w = Number(config.width) + parseFraction(config.widthFraction);
        const h = Number(config.height) + parseFraction(config.heightFraction);
        builderHooks.onBuilderAbandoned({
          shape: config.shape, shadeType: config.shadeType, fabricName: config.material?.name,
          fabricId: config.material?.id, width: w, height: h, mountType: config.mountType,
          controlType: config.controlType, valanceType: config.valanceType, price: priceBreakdown.product,
          currentStep: openStep !== null ? STEPS[openStep] : 'unknown',
        });
      }
    };
    window.addEventListener('beforeunload', handleLeave);
    return () => window.removeEventListener('beforeunload', handleLeave);
  }, [config, openStep, priceBreakdown, path]);

  // Track view_item when fabric changes
  useEffect(() => {
    if (config.material) {
      trackEvent('view_item', {
        currency: 'USD',
        value: priceBreakdown.total,
        items: [{
          item_id: config.material.id || 'custom-shade',
          item_name: config.material.name || 'Custom Shade',
          item_brand: 'World Wide Shades',
          price: priceBreakdown.total,
          quantity: config.quantity
        }]
      });
    }
  }, [config.material?.id]);

  // Progressive accordion: confirm step and advance
  const handleConfirmStep = (stepIndex: number) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);

    // Last step = add to cart and open cart drawer
    if (stepIndex === STEPS.length - 1) {
      addToCart({
        id: `item_${Date.now()}`,
        config: { ...config },
        unitPrice: priceBreakdown.saleProduct / config.quantity,
        installerFee: priceBreakdown.install,
        totalPrice: priceBreakdown.total,
        timestamp: Date.now(),
        visualizerImage: visualizerSnapshot,
      });
      setOpenStep(null);
      trackEvent('step_confirmed', { step_number: stepIndex + 1, step_name: STEPS[stepIndex] });
      return;
    }

    // Find next uncompleted step
    let next = stepIndex + 1;
    while (next < STEPS.length && newCompleted.has(next)) next++;
    
    if (next < STEPS.length) {
      setOpenStep(next);
    } else {
      // All steps complete
      setOpenStep(null);
    }

    trackEvent('step_confirmed', { step_number: stepIndex + 1, step_name: STEPS[stepIndex] });

    // Precision Email Modal DISABLED — interrupts build flow, exit intent handles abandoners
    // if (stepIndex === 3 && !precisionModalShownRef.current) {
    //   precisionModalShownRef.current = true;
    //   setTimeout(() => setShowPrecisionModal(true), 600);
    // }
  };

  // When reopening a completed step, remove it from completed
  const handleSetOpenStep = (step: number | null) => {
    if (step !== null && completedSteps.has(step)) {
      const newCompleted = new Set(completedSteps);
      newCompleted.delete(step);
      setCompletedSteps(newCompleted);
    }
    setOpenStep(step);
  };

  const allStepsComplete = completedSteps.size === STEPS.length;

  // Smart auto-advance — confirms and advances after simple selections
  const handleAutoAdvance = (stepIndex: number) => {
    if (completedSteps.has(stepIndex)) return; // Already completed, don't re-fire
    handleConfirmStep(stepIndex);
  };

  // Exit intent detection
  useEffect(() => {
    if (path !== 'build' || exitIntentShown) return;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && completedSteps.size >= 2 && !exitIntentShown) {
        setShowExitIntent(true);
        setExitIntentShown(true);
        trackEvent('exit_intent_shown', { steps_completed: completedSteps.size });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [path, exitIntentShown, completedSteps.size]);

  const handleSaveConfig = async () => {
    if (!exitEmail) return;

    const w = Number(config.width) + parseFraction(config.widthFraction);
    const h = Number(config.height) + parseFraction(config.heightFraction);
    const wFrac = config.widthFraction !== '0' ? ` ${config.widthFraction}` : '';
    const hFrac = config.heightFraction !== '0' ? ` ${config.heightFraction}` : '';
    const sizeStr = w > 0 ? `${config.width}${wFrac}" x ${config.height}${hFrac}"` : 'Not entered yet';

    const quoteConfig = {
      shape: config.shape,
      shadeType: config.shadeType,
      width: config.width,
      height: config.height,
      widthFraction: config.widthFraction,
      heightFraction: config.heightFraction,
      customDims: config.customDims,
      customFracs: config.customFracs,
      fabricId: config.material?.id,
      fabricName: config.material?.name,
      mountType: config.mountType,
      controlType: config.controlType,
    };

    // 1. Save to Supabase
    const result = await saveQuoteConfig(exitEmail, quoteConfig, priceBreakdown.product);

    // 2. Send customer email with recovery link + discount
    if (result) {
      const recoveryUrl = `${window.location.origin}${window.location.pathname}?quote=${result.quoteId}`;

      await sendCustomerQuoteEmail({
        email: exitEmail,
        quoteId: result.quoteId,
        discountCode: result.discountCode,
        shape: config.shape,
        fabric: config.material?.name || 'Not selected',
        size: sizeStr,
        price: priceBreakdown.product,
        recoveryUrl,
      });
    }

    // 3. Track analytics
    trackEvent('exit_intent_saved', {
      email: exitEmail,
      steps_completed: completedSteps.size,
      quote_saved: !!result,
    });

    // 3b. Also save to abandoned_carts table for admin dashboard
    try {
      await fetch('/api/abandoned-carts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: exitEmail,
          name: null,
          cart_data: [{ config: quoteConfig, totalPrice: priceBreakdown.product, unitPrice: priceBreakdown.product }],
          page: 'builder',
          source: 'builder_exit_intent',
          total: priceBreakdown.product,
          item_count: 1,
        }),
      });
    } catch {}

    // 4. Notify admin
    notifyAdminExitIntent({
      email: exitEmail,
      stepsCompleted: completedSteps.size,
      config,
      recoveryUrl: result ? `${window.location.origin}${window.location.pathname}?quote=${result.quoteId}` : undefined,
      price: priceBreakdown.product,
    });

    setShowExitIntent(false);
  };

  // Precision Email Modal submit handler
  const handlePrecisionEmailSubmit = async (email: string) => {
    const w = Number(config.width) + parseFraction(config.widthFraction);
    const h = Number(config.height) + parseFraction(config.heightFraction);
    const wFrac = config.widthFraction !== '0' ? ` ${config.widthFraction}` : '';
    const hFrac = config.heightFraction !== '0' ? ` ${config.heightFraction}` : '';
    const sizeStr = w > 0 ? `${config.width}${wFrac}" x ${config.height}${hFrac}"` : 'Not entered yet';

    const quoteConfig = {
      shape: config.shape,
      shadeType: config.shadeType,
      width: config.width,
      height: config.height,
      widthFraction: config.widthFraction,
      heightFraction: config.heightFraction,
      customDims: config.customDims,
      customFracs: config.customFracs,
      fabricId: config.material?.id,
      fabricName: config.material?.name,
      mountType: config.mountType,
      controlType: config.controlType,
    };

    // 1. Save to Supabase
    const result = await saveQuoteConfig(email, quoteConfig, priceBreakdown.product);

    // 2. Send customer email with recovery link + discount
    if (result) {
      const recoveryUrl = `${window.location.origin}${window.location.pathname}?quote=${result.quoteId}`;

      const emailSent = await sendCustomerQuoteEmail({
        email,
        quoteId: result.quoteId,
        discountCode: result.discountCode,
        shape: config.shape,
        fabric: config.material?.name || 'Not selected',
        size: sizeStr,
        price: priceBreakdown.product,
        recoveryUrl,
      });

      // 3. Track analytics
      trackEvent('precision_email_captured', {
        email,
        shape: config.shape,
        fabric: config.material?.name,
        price: priceBreakdown.product,
        steps_completed: completedSteps.size,
        quote_id: result.quoteId,
        email_sent: emailSent,
      });
    }

    // 4. Notify admin
    notifyAdminExitIntent({
      email,
      stepsCompleted: completedSteps.size,
      config,
      recoveryUrl: result ? `${window.location.origin}${window.location.pathname}?quote=${result.quoteId}` : undefined,
      price: priceBreakdown.product,
    });
  };

  const getShapeLabel = (s: string) => {
    const key = `shape.${s.replace(/[^a-zA-Z]/g, '').toLowerCase()}`;
    return t(key) || s;
  };

  const currentShape = SHAPE_CONFIGS[config.shape as ShapeType] || SHAPE_CONFIGS.Standard;

  const sizeSummary = useMemo(() => {
    if (config.shape === 'Standard') {
      return config.width > 0 ? `${formatDim(config.width, config.widthFraction)}" x ${formatDim(config.height, config.heightFraction)}"` : '--';
    } else {
      const dims = (config.customDims || {}) as Record<string, number>;
      const fracs = (config.customFracs || {}) as Record<string, string>;
      
      const wVal = dims.width || dims.bottomWidth || config.width || 0;
      const wFrac = fracs.width || fracs.bottomWidth || config.widthFraction || '0';
      
      const hVal = dims.height || dims.leftHeight || dims.rightHeight || dims.centerHeight || dims.rightAngledLength || dims.leftAngledLength || config.height || 0;
      const hFrac = fracs.height || fracs.leftHeight || fracs.rightHeight || fracs.centerHeight || fracs.rightAngledLength || fracs.leftAngledLength || config.heightFraction || '0';

      return wVal > 0 || hVal > 0 ? `${formatDim(wVal, wFrac)}" x ${formatDim(hVal, hFrac)}"` : '--';
    }
  }, [config]);

  const isAnyStepOpen = openStep !== null;

  // ─── FORK / PATH CHOOSER ──────────────────────────
  if (path === null) {
    return (
      <div
        className="h-full w-full overflow-auto flex items-center justify-center"
        style={{ background: '#FDFBF7' }}
      >
        <div
          className="max-w-xl w-full px-6 py-16"
          style={{ animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          {/* Sale Banner */}
          {isSaleActive() && (
            <div 
              className="mb-8 rounded-2xl overflow-hidden text-center py-4 px-6"
              style={{ 
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2418 50%, #1a1a1a 100%)',
                border: '1px solid rgba(200,161,101,0.25)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
              }}
            >
              <div className="text-[11px] font-medium text-[#c8a165] uppercase tracking-[0.2em] mb-1">{t('sale.reason')}</div>
              <div className="text-[28px] md:text-[34px] font-normal text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.02em' }}>
                {SALE_CONFIG.discountPercent}% Off Everything
              </div>
              <div className="text-[11px] text-[#999] mt-1">{t('sale.ends')}</div>
            </div>
          )}

          {/* Headline */}
          <div className="text-center mb-10">
            <h1
              className="text-[32px] md:text-[44px] font-normal text-[#141414] leading-[1.1] mb-3"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                letterSpacing: '-0.02em',
              }}
            >
              Custom Shades for Windows Others Can't Fit
            </h1>
            <p className="text-[13px] md:text-[14px] text-[#8f8f8f] font-normal">
              Rectangle, Triangle, Arched & More — Factory Direct Pricing
            </p>
            {isSaleActive() && (
              <p className="text-[13px] md:text-[14px] font-semibold text-[#c0593a] mt-2">
                Save up to {SALE_CONFIG.discountPercent}% vs retail — factory direct
              </p>
            )}
          </div>

          {/* Primary CTA — Build */}
          <button
            onClick={() => {
              setPath('build');
              setOpenStep(0);
              trackEvent('path_selected', { path: 'build' });
            }}
            className="w-full mb-4 transition-all duration-300 active:scale-[0.995] group cta-glow"
            style={{
              borderRadius: 14,
              padding: '20px 26px',
              background: 'linear-gradient(90deg, #C8A165 0%, #E7D8B8 55%, #C8A165 100%)',
              boxShadow: '0 10px 25px rgba(212, 175, 55, 0.35)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div
                  className="text-[16px] md:text-[18px] font-medium text-[#141414] mb-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Get My Custom Shade Price
                </div>
                <div className="text-[12px] text-[#2b2b2b]/70 font-normal">
                  Takes 60 seconds · No commitment
                </div>
              </div>

              <ChevronRight
                size={20}
                className="text-[#2b2b2b]/30 group-hover:text-[#2b2b2b]/60 shrink-0 ml-4 cta-arrow"
              />
            </div>
          </button>

          {/* Trust + urgency under CTA */}
          <div className="flex flex-col items-center gap-2 mb-4 mt-1">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="text-[11px] text-[#666] flex items-center gap-1">
                <span className="text-amber-500">★</span> 4.8 from 2,000+ customers
              </span>
              <span className="text-[11px] text-[#666] flex items-center gap-1">
                <Truck size={11} className="text-[#888]" /> Delivered in 5–7 days
              </span>
              <span className="text-[11px] text-[#666] flex items-center gap-1">
                <Check size={11} className="text-green-600" /> Perfect fit guarantee
              </span>
            </div>
            {isSaleActive() && (
              <p className="text-[11px] font-medium text-[#c0593a]">
                ⏳ Sale ends soon — lock in your price now
              </p>
            )}
            <p className="text-[11px] text-[#aaa]">
              Answer a few quick questions → see your exact price
            </p>
          </div>

          {/* Secondary CTA — Swatches (de-emphasized) */}
          <button
            onClick={() => {
              setPath('swatch');
              trackEvent('path_selected', { path: 'swatch' });
            }}
            className="w-full mb-12 transition-all duration-300 active:scale-[0.995] group"
            style={{
              borderRadius: 10,
              padding: '12px 20px',
              background: 'transparent',
              border: 'none',
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-[13px] text-[#999] font-normal">
                Not ready?
              </span>
              <span className="text-[13px] text-[#999] font-medium underline underline-offset-2 group-hover:text-[#c8a165] transition-colors">
                Get Free Swatches
              </span>
              <ChevronRight
                size={14}
                className="text-[#ccc] group-hover:text-[#c8a165] group-hover:translate-x-0.5 transition-all shrink-0"
              />
            </div>
          </button>

          {/* Trust signals */}
          <div className="flex justify-center items-center gap-12">
            {[
              { label: 'Factory Direct', Icon: Package },
              { label: '7-Day Shipping', Icon: Truck },
              { label: 'Any Shape', Icon: PenTool },
            ].map(({ label, Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon size={18} className="text-[#bdbdbd]" strokeWidth={1.25} />
                <span className="text-[9px] font-medium text-[#a7a7a7] uppercase tracking-[0.18em]">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Phone number */}
          <div className="text-center mt-8">
            <a href="tel:+18446742716" className="text-[12px] font-medium text-[#999] hover:text-[#c8a165] transition-colors">
              Questions? Call (844) 674-2716
            </a>
          </div>
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .cta-arrow {
            animation: arrowPulse 1.8s ease-in-out infinite;
          }
          @keyframes arrowPulse {
            0%, 100% { transform: translateX(0); opacity: 0.4; }
            50% { transform: translateX(5px); opacity: 0.8; }
          }
          .cta-glow:hover .cta-arrow {
            animation: none;
            transform: translateX(6px);
            opacity: 1;
            transition: transform 0.2s ease, opacity 0.2s ease;
          }
          .cta-glow {
            transition: box-shadow 0.3s ease, transform 0.3s ease, filter 0.3s ease;
          }
          .cta-glow:hover {
            box-shadow: 0 14px 44px rgba(212, 175, 55, 0.45), 0 0 0 2px rgba(212, 175, 55, 0.12) !important;
            transform: scale(1.02);
            filter: brightness(1.05);
          }
        `}</style>
      </div>
    );
  }

  // ─── SWATCH-ONLY PATH ──────────────────────────────
  if (path === 'swatch') {
    return (
      <div className="bg-white h-full w-full overflow-auto">
        <SwatchPath
          fabrics={fabrics}
          loadingFabrics={isLoadingFabrics}
          onAddSwatch={addToSwatches}
          existingSwatches={swatches}
          onBack={() => { setPath('build'); setOpenStep(0); }}
        />
        <style>{`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  // ─── BUILD PATH (with progressive accordion) ──────────
  return (
    <div className="h-full w-full overflow-hidden" style={{ backgroundColor: '#FDFBF7' }}>
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row h-full bg-white shadow-2xl relative overflow-hidden">
          
          {/* LEFT PANEL: Visualizer — HIDDEN on mobile */}
          <div className="hidden md:flex w-1/2 lg:w-[50%] bg-white flex-col p-6 h-full overflow-hidden border-r border-gray-100 shrink-0">
            <div className="flex-1 min-h-0 relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex flex-col px-12 lg:px-20 py-4">
              <div className="w-full h-full relative flex flex-col">
                  <Visualizer 
                      imageSrc={imageSrc} 
                      onImageChange={setImageSrc} 
                      onSelectionChange={setSelection} 
                      selection={selection} 
                      onConfirmSelection={(res) => { 
                          if (res) {
                              setAnalysis(res);
                              trackEvent('visualizer_analysis_complete', { room_style: res.style, suggested_tone: res.suggestedTone });
                          }
                          setOpenStep(3); 
                          trackEvent('visualizer_confirm', { shape: config.shape, is_custom_image: !imageSrc.startsWith('http') });
                      }} 
                      selectedFabric={config.material} 
                      shape={config.shape} 
                      isCollapsed={isAnyStepOpen}
                      onSnapshotReady={setVisualizerSnapshot}
                  />
              </div>
            </div>

            {/* Configuration Blueprint — Desktop only */}
            <div className="mt-4 bg-white rounded-xl p-4 shrink-0" style={{ border: '1px solid rgba(20,20,20,0.06)' }}>
              <div className="flex items-center justify-between mb-3 pb-3" style={{ borderBottom: '1px solid rgba(20,20,20,0.04)' }}>
                <h3 className="text-[12px] font-medium text-[#aaa] uppercase tracking-[0.18em] flex items-center gap-2">
                  <FileText size={14} style={{ color: '#c8a165' }} /> Configuration Summary
                </h3>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Shape', value: getShapeLabel(config.shape), icon: <img src={currentShape.mask} className="w-3 h-3 object-contain opacity-50" /> },
                  { label: 'Material', value: config.material ? config.material.name : '—', icon: null },
                  { label: 'Size', value: sizeSummary, icon: <Ruler size={10} className="text-[#ccc]" /> },
                  { label: 'Qty', value: config.quantity.toString(), icon: <Hash size={10} className="text-[#ccc]" /> },
                ].map((item, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="text-[11px] font-medium text-[#aaa] uppercase tracking-[0.12em]">{item.label}</div>
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#333] truncate">
                      {item.icon}{item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Progressive Stepper — Full width on mobile */}
          <div className="w-full md:w-1/2 lg:w-[50%] flex flex-col flex-1 md:flex-none md:h-full bg-white relative overflow-hidden">

            {/* Sticky Mobile Price Header */}
            {priceBreakdown.total > 0 && (
              <div 
                className="md:hidden sticky top-0 z-50 px-4 py-2.5 bg-white flex items-center justify-between"
                style={{ borderBottom: '1px solid rgba(20,20,20,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-baseline gap-2">
                  {priceBreakdown.saleActive && priceBreakdown.originalTotal > 0 && (
                    <span className="text-[12px] text-[#bbb] line-through">${priceBreakdown.originalTotal.toFixed(0)}</span>
                  )}
                  <span className="text-[18px] font-medium text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    ${priceBreakdown.total.toFixed(2)}
                  </span>
                  {priceBreakdown.saleActive && priceBreakdown.originalTotal > 0 && (
                    <span className="text-[8px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                      SAVE ${(priceBreakdown.originalTotal - priceBreakdown.total).toFixed(0)}
                    </span>
                  )}
                </div>
                <div className="text-[8px] font-medium text-[#2d8a4e] flex items-center gap-0.5">
                  <Truck size={9} /> Arrives {getEstimatedDelivery()}
                </div>
              </div>
            )}

            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-2 md:p-2.5 pb-36 md:pb-4 scroll-smooth custom-scrollbar relative"
              onScroll={(e) => {
                const el = e.currentTarget;
                if (el.scrollTop > 60) setShowScrollHint(false);
                else setShowScrollHint(true);
              }}
            >
              
              {/* Progress header */}
              <div className="text-center py-3 px-2">
                <div className="text-[12px] font-medium uppercase tracking-[0.18em] mb-1.5" style={{ color: '#c8a165' }}>
                  Step {Math.min(completedSteps.size + 1, 3)} of 3 — Get your price
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#f0ece4' }}>
                  <div 
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ 
                      width: `${(Math.min(completedSteps.size + 1, 3) / 3) * 100}%`,
                      background: 'linear-gradient(90deg, #c8a165, #E7D8B8, #c8a165)',
                      backgroundSize: '200% 100%',
                      animation: completedSteps.size > 0 ? 'shimmer 2s ease-in-out infinite' : 'none'
                    }}
                  />
                </div>
              </div>

              <Stepper 
                openStep={openStep}
                setOpenStep={handleSetOpenStep}
                config={config}
                setConfig={setConfig}
                activeFabricName={config.material?.name}
                onBrowseFabrics={() => setOpenStep(3)}
                fabrics={fabrics}
                loadingFabrics={isLoadingFabrics}
                onSelectFabric={(f) => setConfig({ ...config, material: f })}
                onAddSwatch={addToSwatches}
                requestedSwatches={swatches.map(s => s.id)}
                analysis={analysis}
                completedSteps={completedSteps}
                onConfirmStep={handleConfirmStep}
                onAutoAdvance={handleAutoAdvance}
              />

              {/* All steps complete */}
              {allStepsComplete && (
                <div className="text-center py-6 px-2" style={{ animation: 'fadeUp 0.5s ease forwards' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'linear-gradient(135deg, #c8a165, #d4b07a)' }}>
                    <Check size={20} className="text-white" strokeWidth={2} />
                  </div>
                  <div className="text-[13px] font-medium text-[#1a1a1a] mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Ready to Order!
                  </div>
                  <p className="text-[11px] text-[#aaa]">Tap any step above to make changes, or add to cart below</p>
                </div>
              )}

              {/* Scroll hint - removed */}
            </div>

            {/* SIMPLIFIED FOOTER — Price left, CTA right */}
            <div 
              className="p-4 pb-7 md:pb-4 bg-white fixed md:sticky bottom-0 left-0 right-0 md:left-auto md:right-auto w-full md:w-auto z-[60]"
              style={{ borderTop: '1px solid rgba(20,20,20,0.06)', boxShadow: '0 -8px 30px rgba(0,0,0,0.03)' }}
            >
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between gap-4">
                  
                  {/* Price */}
                  <div className="shrink-0">
                    <div className="text-[11px] font-medium text-[#aaa] uppercase tracking-[0.12em]">Total</div>
                    <div className="flex items-baseline gap-2">
                      {priceBreakdown.saleActive && priceBreakdown.originalTotal > 0 && (
                        <div className="text-[14px] font-medium text-[#bbb] line-through" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                          ${priceBreakdown.originalTotal.toFixed(2)}
                        </div>
                      )}
                      <div className="text-[22px] md:text-[26px] font-medium text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.02em' }}>
                        ${priceBreakdown.total.toFixed(2)}
                      </div>
                      {priceBreakdown.saleActive && priceBreakdown.originalTotal > 0 ? (
                        <div className="text-[11px] font-bold text-green-600 uppercase tracking-wider px-1.5 py-0.5 rounded bg-green-50">
                          {SALE_CONFIG.discountPercent}% OFF
                        </div>
                      ) : (
                        <div className="text-[11px] font-medium text-[#2d8a4e] uppercase tracking-wider flex items-center gap-1">
                          <Truck size={12} /> Free Shipping — Arrives {getEstimatedDelivery()}
                        </div>
                      )}
                    </div>
                    {priceBreakdown.saleActive && priceBreakdown.originalTotal > 0 && (
                      <div className="text-[12px] font-bold text-green-600 mt-0.5">
                        You save ${(priceBreakdown.originalTotal - priceBreakdown.total).toFixed(2)}
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="text-[11px] font-medium text-[#2d8a4e] uppercase tracking-wider flex items-center gap-1">
                        <Truck size={12} /> Free Shipping — Arrives by {getEstimatedDelivery()}
                      </div>
                    </div>
                    {priceBreakdown.total > 50 && (
                      <div className="text-[12px] text-[#999] mt-0.5 flex items-center gap-1">
                        or <span className="font-medium text-[#6b6bef]">${(priceBreakdown.total / 12).toFixed(2)}/mo</span> with <span className="font-semibold italic text-[#6b6bef]">affirm</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Single CTA — context-aware */}
                  {allStepsComplete && (
                    <button 
                      onClick={() => addToCart({
                        id: `item_${Date.now()}`,
                        config: { ...config },
                        unitPrice: priceBreakdown.saleProduct / config.quantity,
                        installerFee: priceBreakdown.install,
                        totalPrice: priceBreakdown.total,
                        timestamp: Date.now(),
                        visualizerImage: visualizerSnapshot,
                      })}
                      disabled={priceBreakdown.total === 0}
                      className="py-3 px-6 rounded-xl font-medium text-[13px] tracking-wide transition-all duration-300 hover:shadow-xl active:scale-[0.98] flex items-center gap-2 disabled:opacity-30"
                      style={{ 
                        background: 'linear-gradient(90deg, #C8A165 0%, #E7D8B8 55%, #C8A165 100%)',
                        boxShadow: '0 6px 24px rgba(200,161,101,0.2)',
                        color: '#1a1a1a',
                        fontFamily: "'Playfair Display', Georgia, serif"
                      }}
                    >
                      <ShoppingCart size={15} /> Add My Shade to Cart{priceBreakdown.saleActive ? ` — ${SALE_CONFIG.discountPercent}% OFF` : ''}
                    </button>
                  )}
                </div>

                {/* Satisfaction Guarantee */}
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8a165" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  <span className="text-[12px] font-medium text-[#999]">100% Satisfaction Guarantee — Love it or we'll make it right</span>
                </div>

                {/* Phone + Help */}
                <div className="flex items-center justify-center gap-3 mt-2">
                  <a 
                    href="tel:+18446742716" 
                    className="text-[12px] font-medium text-[#888] hover:text-[#c8a165] transition-colors flex items-center gap-1"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    (844) 674-2716
                  </a>
                  <span className="text-[#ddd]">|</span>
                  <button 
                    onClick={() => setIsConsultationOpen(true)} 
                    className="text-[12px] font-normal text-[#bbb] hover:text-[#c8a165] transition-colors"
                  >
                    Need help?
                  </button>
                </div>

                {/* Payment Trust Badges */}
                <div className="flex items-center justify-center gap-3 mt-2.5 pb-1">
                  <div className="flex items-center gap-1.5">
                    {['Visa', 'MC', 'Amex', 'PayPal'].map(brand => (
                      <div key={brand} className="px-2 py-0.5 rounded border border-gray-200 bg-gray-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {brand}
                      </div>
                    ))}
                    <div className="px-2 py-0.5 rounded border border-purple-200 bg-purple-50 text-[10px] font-bold text-purple-500 italic">
                      affirm
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#aaa]">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    SSL Secure
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>

      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />

      {/* EXIT INTENT MODAL */}
      {showExitIntent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ animation: 'fadeUp 0.3s ease forwards' }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowExitIntent(false)} />
          <div className="relative bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl" style={{ animation: 'modalSpring 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
            <button onClick={() => setShowExitIntent(false)} className="absolute top-4 right-4 text-[#ccc] hover:text-[#999] transition-colors">
              <X size={18} />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#f5f3ec' }}>
                <Mail size={20} style={{ color: '#c8a165' }} strokeWidth={1.5} />
              </div>
              <h3 className="text-[20px] font-normal text-[#1a1a1a] mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Save Your Progress?
              </h3>
              <p className="text-[12px] text-[#999] font-normal leading-relaxed">
                We'll email you a link to pick up right where you left off — {completedSteps.size} step{completedSteps.size !== 1 ? 's' : ''} already done.
              </p>
            </div>
            
            <div className="mb-4">
              <input
                type="email"
                value={exitEmail}
                onChange={(e) => setExitEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full p-3.5 rounded-xl text-[13px] font-normal outline-none transition-all duration-200"
                style={{ border: '1px solid #e0dcd5', color: '#333' }}
                onFocus={(e) => { e.target.style.borderColor = '#c8a165'; e.target.style.boxShadow = '0 0 0 3px rgba(200,161,101,0.08)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e0dcd5'; e.target.style.boxShadow = 'none'; }}
                autoFocus
              />
            </div>
            
            <button
              onClick={handleSaveConfig}
              disabled={!exitEmail.includes('@')}
              className="w-full py-3.5 rounded-xl font-medium text-[13px] tracking-wide transition-all duration-300 disabled:opacity-30"
              style={{ 
                background: 'linear-gradient(90deg, #C8A165 0%, #E7D8B8 55%, #C8A165 100%)',
                boxShadow: '0 4px 16px rgba(200,161,101,0.2)',
                color: '#1a1a1a',
                fontFamily: "'Playfair Display', Georgia, serif"
              }}
            >
              Save My Configuration
            </button>
            
            <button
              onClick={() => setShowExitIntent(false)}
              className="w-full mt-2 py-2 text-[11px] font-normal text-[#bbb] hover:text-[#888] transition-colors"
            >
              No thanks, I'll start over
            </button>
          </div>
        </div>
      )}

      {/* PRECISION EMAIL MODAL */}
      <PrecisionEmailModal
        open={showPrecisionModal}
        onClose={() => setShowPrecisionModal(false)}
        onSubmit={handlePrecisionEmailSubmit}
        shapeLabel={getShapeLabel(config.shape)}
        showShopPayNote={priceBreakdown.product > 200}
      />

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes modalSpring {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          70% { transform: translateY(-4px) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Builder;
