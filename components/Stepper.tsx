import React, { useEffect, useState, useMemo } from 'react';
import { Search, MapPin, Check, Ruler, UserCheck, Star, CheckCircle, Zap, Layout, Sidebar, Battery, Smartphone, Sun, Wrench, Info, ArrowRight, X, Layers, Image as ImageIcon, PanelLeftClose, ChevronRight } from 'lucide-react';
import { ShadeConfig, ShapeType, Fabric, RoomAnalysis } from '../types';
import { STEPS, FRACTIONS, getInstallerForZip, SHAPE_CONFIGS, VALANCE_OPTIONS, SIDE_CHANNEL_OPTIONS, ALL_FABRICS, isSaleActive, SALE_CONFIG, MOTOR_PRICES, applyMarkup, getStartingPrice } from '../constants';
import FabricSuggestions from './FabricSuggestions';
import { useLanguage } from '../LanguageContext';
import { trackEvent } from '../utils/analytics';
import { trackShapeSelected, trackMeasurementsEntered, trackFabricSelected, trackMountSelected, trackControlSelected, trackBuilderComplete, trackSelectItem, trackPhoneClick } from '../lib/gtm/events';

interface StepperProps {
  openStep: number | null;
  setOpenStep: (step: number | null) => void;
  config: ShadeConfig;
  setConfig: (config: ShadeConfig) => void;
  activeFabricName?: string;
  onBrowseFabrics: () => void;
  fabrics: Fabric[];
  loadingFabrics: boolean;
  onSelectFabric: (fabric: Fabric) => void;
  onAddSwatch: (fabric: Fabric) => void;
  requestedSwatches: string[];
  analysis?: RoomAnalysis;
  completedSteps: Set<number>;
  onConfirmStep: (index: number) => void;
  onAutoAdvance: (index: number) => void;
}

const formatDim = (value: number, fraction: string) => {
  if (!fraction || fraction === '0') return `${value}`;
  return `${value} ${fraction}`;
};

const AllFabricsIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v20" />
    <path d="M2 12h20" />
    <rect x="9" y="9" width="6" height="6" rx="1" strokeWidth="1.5" />
  </svg>
);

const MeasurementInputs: React.FC<{
  shapeData: any;
  config: ShadeConfig;
  handleMeasurementChange: (key: string, value: number) => void;
  handleFractionChange: (key: string, fraction: string) => void;
  t: (key: string) => string;
}> = ({ shapeData, config, handleMeasurementChange, handleFractionChange, t }) => {
  const [showGuide, setShowGuide] = useState(false);
  return (
  <div className="animate-in slide-in-from-bottom-1 duration-300">
    <div className="flex items-center gap-2 mb-2 bg-green-50 p-2 rounded-lg border border-green-100">
      <div className="shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
      <p className="text-[9px] font-medium text-green-800 leading-tight">
        {t('pro.diyWarning')}
      </p>
    </div>
    
    {/* Diagram + guide toggle */}
    <div className="bg-slate-50 p-2 rounded-lg flex flex-col items-center gap-2 border border-slate-200 mb-2">
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="self-end text-[10px] font-semibold text-[#c8a165] hover:text-[#a8844d] underline underline-offset-2 cursor-pointer transition-colors flex items-center gap-1"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          {showGuide ? 'Hide guide' : 'How to measure (30 sec guide)'}
        </button>
        <img src={shapeData.diagram} className="max-h-36 object-contain" alt="Shape Diagram" />
    </div>
    {showGuide && (
      <div className="w-full bg-white rounded-xl p-3 border border-[#e8e5de] text-left space-y-3 mb-2" style={{ animation: 'fadeUp 0.3s ease forwards' }}>
        <div>
          <h4 className="text-[12px] font-semibold text-[#1a1a1a] mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Inside Mount <span className="text-[9px] font-bold text-[#c8a165] uppercase">(most common)</span></h4>
          <p className="text-[10px] text-[#555]"><b>Width:</b> Narrowest of 3 measurements. <b>Height:</b> Tallest of 3. Measure to 1/8".</p>
        </div>
        <div className="bg-[#f5f0e6] rounded-lg p-2 border border-[#e8dcc8]">
          <p className="text-[10px] font-semibold text-[#8b6d3f]">PRO TIP: Enter exact window size — factory handles deductions.</p>
        </div>
      </div>
    )}
    
    {/* Measurement inputs — side by side for standard shapes */}
    <div className={shapeData.inputs.length === 2 ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
        {shapeData.inputs.map((input: any) => {
            const currentVal = (input.key === 'width' || input.key === 'height') 
                ? config[input.key as 'width' | 'height'] 
                : (config.customDims?.[input.key] || 0);
            const currentFrac = (input.key === 'width' || input.key === 'height')
                ? config[input.key === 'width' ? 'widthFraction' : 'heightFraction']
                : (config.customFracs?.[input.key] || '0');
            return (
                <div key={input.key} className="bg-white border border-gray-100 rounded-lg p-2 shadow-sm">
                    <label className="text-[8px] font-black uppercase text-slate-400 block mb-1 tracking-widest">{input.label}</label>
                    <div className="flex gap-1.5">
                        <div className="flex-1 relative">
                            <input type="number" value={currentVal || ''} onChange={e => handleMeasurementChange(input.key, Number(e.target.value))} className="w-full border border-gray-200 p-1.5 rounded-md focus:ring-1 focus:ring-[#c8a165] outline-none text-base font-bold" placeholder="Inches"/>
                            {currentVal > 0 ? (
                              <span className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>
                            ) : null}
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] font-bold text-gray-400 pointer-events-none">IN</span>
                        </div>
                        <div className="w-16">
                            <select value={currentFrac} onChange={e => handleFractionChange(input.key, e.target.value)} className="w-full border border-gray-200 p-1.5 rounded-md focus:ring-1 focus:ring-[#c8a165] outline-none text-sm bg-gray-50 font-medium">
                                {FRACTIONS.map(f => <option key={f} value={f}>{f === '0' ? t('common.none') : f}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
    <p className="text-center text-[11px] text-[#888] font-medium mt-1">Example: 36" W × 60" H</p>
  </div>
  );
};

const Stepper: React.FC<StepperProps> = ({ 
  openStep, 
  setOpenStep, 
  config, 
  setConfig,
  activeFabricName,
  fabrics,
  loadingFabrics,
  onSelectFabric,
  onAddSwatch,
  requestedSwatches,
  analysis,
  completedSteps,
  onConfirmStep,
  onAutoAdvance
}) => {
  const { t } = useLanguage();
  const [showProPath, setShowProPath] = useState(false);
  const [isDIYSelected, setIsDIYSelected] = useState(false);
  const [showSpecialtyShapes, setShowSpecialtyShapes] = useState(false);
  const [shapeFlash, setShapeFlash] = useState(false);

  const fabricCounts = useMemo(() => {
    return {
      lightFiltering: fabrics.filter(f => f.category === 'Light Filtering').length,
      blackout: fabrics.filter(f => f.category === 'Blackout').length,
      all: fabrics.length
    };
  }, [fabrics]);

  // Parsed dimensions for "Starting at" price lookups
  const parseFrac = (f: string) => { if (!f || f === '0') return 0; if (f.includes('/')) { const [n, d] = f.split('/').map(Number); return n / d; } return 0; };
  const dimW = (config.width || 0) + parseFrac(config.widthFraction);
  const dimH = (config.height || 0) + parseFrac(config.heightFraction);
  const hasDims = dimW > 0 && dimH > 0;

  // Reusable "Starting at" price display
  const StartingAt: React.FC<{ shape: any; category?: 'Light Filtering' | 'Blackout' }> = ({ shape, category }) => {
    const p = getStartingPrice(shape, category, hasDims ? dimW : undefined, hasDims ? dimH : undefined);
    if (!p.marked || p.marked <= 0) return null;
    return (
      <div className="text-[11px] text-slate-400 mt-0.5">
        {p.saleActive ? (
          <>Starting at <span className="line-through text-slate-300">${p.marked.toFixed(0)}</span> <span className="font-bold text-green-600">${p.sale.toFixed(0)}</span></>
        ) : (
          <>Starting at <span className="font-bold">${p.marked.toFixed(0)}</span></>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (config.shape !== 'Standard' && config.controlType === 'Metal Chain') {
      setConfig({ ...config, controlType: 'Motorized' });
    }
  }, [config.shape]);

  const handleToggle = (index: number) => {
    setOpenStep(openStep === index ? null : index);
    if (openStep !== index) {
      const stepNames = ['shape', 'visualizer', 'dimensions', 'fabric', 'control', 'motor_options', 'service', 'summary'];
      trackEvent('step_view', { step_number: index + 1, step_name: stepNames[index] });
    }
  };

  const updateConfig = <K extends keyof ShadeConfig>(key: K, value: ShadeConfig[K]) => {
    setConfig({ ...config, [key]: value });
  };

  const updateServices = (measure: boolean, install: boolean, diy: boolean) => {
    setConfig({
      ...config,
      measureService: measure,
      installService: install
    });
    setIsDIYSelected(diy);
    if (diy) setShowProPath(false);
    
    trackEvent('service_select', { 
      service_type: measure && install ? 'full_service' :
                    measure ? 'pro_measure' :
                    install ? 'pro_install' : 'diy',
      has_installer: !!config.installer
    });
  };

  const handleMeasurementChange = (key: string, value: number) => {
    if (key === 'width' || key === 'height') {
      updateConfig(key as 'width' | 'height', value);
    } else {
      const newDims = { ...(config.customDims || {}), [key]: value };
      setConfig({ ...config, customDims: newDims });
    }
    
    trackEvent('dimensions_entered', { 
      width: config.width, 
      height: config.height, 
      shape: config.shape,
      is_specialty: config.shape !== 'Standard'
    });
  };

  const handleFractionChange = (key: string, fraction: string) => {
    if (key === 'width' || key === 'height') {
      updateConfig(key === 'width' ? 'widthFraction' : 'heightFraction', fraction);
    } else {
      const newFracs = { ...(config.customFracs || {}), [key]: fraction };
      setConfig({ ...config, customFracs: newFracs });
    }

    trackEvent('dimensions_entered', { 
      width: config.width, 
      height: config.height, 
      shape: config.shape,
      is_specialty: config.shape !== 'Standard'
    });
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const cleaned = val.replace(/\D/g, '').substring(0, 5);
    const updatedConfig = { ...config, zipCode: cleaned };
    if (cleaned.length === 5) {
      updatedConfig.installer = getInstallerForZip(cleaned);
      setIsDIYSelected(false);
    } else {
      updatedConfig.installer = null;
    }
    setConfig(updatedConfig);
  };

  const handleSwitchToDIYPath = () => {
    setConfig({
      ...config,
      installer: null,
      measureService: false,
      installService: false,
      zipCode: ''
    });
    setShowProPath(false);
    setIsDIYSelected(true);
  };

  const handleShowProPath = () => {
    setIsDIYSelected(false);
    setShowProPath(true);
  };

  const handleResetToPathSelection = () => {
    setConfig({
      ...config,
      installer: null,
      measureService: false,
      installService: false,
      zipCode: ''
    });
    setShowProPath(false);
    setIsDIYSelected(false);
  };

  const getShapeLabel = (s: string) => {
    const key = `shape.${s.replace(/[^a-zA-Z]/g, '').toLowerCase()}`;
    return t(key) || s;
  };

  const getStepSummary = (index: number) => {
    switch (index) {
      case 0: return getShapeLabel(config.shape);
      case 1: 
        if (config.measureService && config.installService) return t('step.summary.full');
        if (config.measureService) return t('step.summary.measureOnly');
        if (config.installService) return t('step.summary.installOnly');
        const w = (config.widthFraction && config.widthFraction !== '0') ? `${config.width} ${config.widthFraction}` : `${config.width}`;
        const h = (config.heightFraction && config.heightFraction !== '0') ? `${config.height} ${config.heightFraction}` : `${config.height}`;
        return config.width > 0 ? `${w}" x ${h}"` : t('step.summary.diy');
      case 2: return config.shadeType ? t(`shadeType.${config.shadeType === 'Light Filtering' ? 'lightFiltering' : config.shadeType === 'Blackout' ? 'blackout' : 'all'}`) : t('step.summary.allFabrics');
      case 3: return activeFabricName || t('fabric.selectMaterial');
      case 4: return t(config.mountType === 'Inside Mount' ? 'mount.inside' : 'mount.outside');
      case 5: return config.controlType === 'Metal Chain' ? `${t('control.chain')} \u2014 ${config.controlPosition || 'Right'} Side` : t('control.motorized');
      case 6: {
          const valanceLabel = t(`valance.${config.valanceType}`) || t('step.summary.noValance');
          const sideChannelLabel = config.sideChannelType === 'standard' ? ' + Channels' : '';
          return valanceLabel + sideChannelLabel;
      }
      case 7: return config.quantity.toString();
      default: return "Select";
    }
  };

  const shapeData = SHAPE_CONFIGS[config.shape as ShapeType] || SHAPE_CONFIGS.Standard;

  const isLastStep = openStep === STEPS.length - 1;

  // GTM: Fire step-specific tracking events
  const handleStepConfirmWithTracking = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: trackShapeSelected(config.shape || 'Standard'); break;
      case 1: trackMeasurementsEntered(config.width, config.height, config.widthFraction, config.heightFraction); break;
      case 2: // shade type selected (Blackout/Light Filtering) — tracked at selection
        break;
      case 3: // fabric selected — tracked via onSelectFabric
        break;
      case 4: trackMountSelected(config.mountType || 'Inside Mount'); break;
      case 5: trackControlSelected(config.controlType || 'Manual', config.motorPower); break;
      default: break;
    }
    if (isLastStep) {
      trackBuilderComplete(config, 0); // price calculated elsewhere
    }
    onConfirmStep(stepIndex);
  };

  return (
    <div className="flex flex-col gap-2 pb-24 relative">
      {STEPS.map((stepLabelKey, index) => {
        const isOpen = openStep === index;
        const isCompleted = completedSteps.has(index);
        const isVisible = isOpen || isCompleted;
        const summaryText = getStepSummary(index);
        const translatedLabel = t(stepLabelKey);

        // PROGRESSIVE: Hide steps that aren't completed or active
        if (!isVisible) return null;

        // COMPLETED COLLAPSED ROW
        if (isCompleted && !isOpen) {
          return (
            <div 
              key={index} 
              onClick={() => handleToggle(index)}
              className="bg-white rounded-xl cursor-pointer transition-all duration-300 group"
              style={{ 
                animation: 'fadeUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                border: '1px solid rgba(20,20,20,0.06)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            >
              <div className="flex items-center p-3.5 min-h-[56px]">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mr-3.5" style={{ background: 'linear-gradient(135deg, #c8a165, #d4b07a)' }}>
                  <Check size={13} className="text-white" strokeWidth={2.5} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#aaa]">
                    Step {index + 1}
                  </div>
                  <div className="text-[16px] font-medium text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {translatedLabel}
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-[13px] font-medium truncate max-w-[160px]" style={{ color: '#c8a165' }}>
                    {summaryText}
                  </span>
                  <span className="text-[11px] font-medium text-[#ccc] opacity-0 group-hover:opacity-100 transition-all duration-200">
                    edit
                  </span>
                </div>
              </div>
            </div>
          );
        }

        // ACTIVE EXPANDED STEP
        return (
          <div 
            key={index} 
            id={`step-container-${index}`} 
            className="bg-white rounded-xl overflow-hidden"
            style={{ 
              border: '2px solid #c8a165',
              boxShadow: '0 8px 32px rgba(200, 161, 101, 0.1)',
              animation: 'stepReveal 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            <div className="flex items-center justify-between p-3.5 min-h-[56px]">
              <div className="flex items-center gap-3">
                <span 
                  className="text-[12px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-[0.12em] text-white"
                  style={{ background: 'linear-gradient(135deg, #c8a165, #b8914f)' }}
                >
                  Step {index + 1}
                </span>
                <span className="text-[17px] font-medium text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{translatedLabel}</span>
              </div>
            </div>

            {/* Step content - ALL existing content preserved exactly */}
            <div className="px-2 pb-4 pt-1 border-t border-gray-50 animate-in fade-in slide-in-from-top-1">
              {index === 0 && (
                  <div className="pt-2 space-y-4">
                      {/* ── CRO: QUALIFICATION HEADER ── */}
                      <div className="text-center">
                        <h3 className="text-[18px] font-normal text-[#1a1a1a] mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.01em' }}>
                          Let's match your window shape
                        </h3>
                        <p className="text-[12px] text-[#94a3b8]">
                          Select the option that looks closest to your window
                        </p>
                      </div>

                      {/* ── CRO: DOMINANT STANDARD CARD ── */}
                      <div
                        className={`rounded-2xl cursor-pointer transition-all duration-300 ${shapeFlash ? 'ring-4 ring-green-400/50 scale-[1.01]' : ''}`}
                        style={{
                          border: shapeFlash ? '2px solid #22c55e' : '2px solid #c8a165',
                          background: shapeFlash ? 'linear-gradient(180deg, #f0fdf4 0%, #fdfbf7 100%)' : 'linear-gradient(180deg, #fdfbf7 0%, #faf8f4 100%)',
                          padding: '16px 20px 20px',
                          boxShadow: '0 8px 32px rgba(200,161,101,0.12), 0 2px 8px rgba(200,161,101,0.06)',
                          position: 'relative',
                        }}
                        onClick={() => updateConfig('shape', 'Standard' as ShapeType)}
                      >
                        {/* Recommended Badge */}
                        <div
                          className="absolute left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.12em] text-white whitespace-nowrap"
                          style={{
                            top: -11,
                            background: 'linear-gradient(135deg, #c8a165, #b8914f)',
                            boxShadow: '0 2px 8px rgba(200,161,101,0.3)',
                          }}
                        >
                          ✦ Recommended for 90% of Homes
                        </div>

                        {/* Shape + Title */}
                        <div className="flex items-center gap-3 mb-3 mt-1">
                          <div className="w-[56px] h-[56px] rounded-xl bg-white flex items-center justify-center shrink-0" style={{ border: '1px solid #ece8e0' }}>
                            <img
                              src={SHAPE_CONFIGS['Standard' as ShapeType].mask}
                              className="w-10 h-10 object-contain"
                              alt="Standard"
                            />
                          </div>
                          <div>
                            <h4 className="text-[20px] font-normal text-[#1a1a1a] mb-0" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.01em' }}>
                              My window is rectangular
                            </h4>
                            <p className="text-[12px] text-[#8b8b8b]">Recommended for most homes</p>
                          </div>
                        </div>

                        {/* Trust Bullets — 2-column grid */}
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3">
                          {[
                            { text: 'Most affordable option', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8a165" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                            { text: 'Ships in 7 business days', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8a165" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
                            { text: 'Blackout & Light Filtering', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8a165" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> },
                            { text: 'Motorization available', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8a165" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
                            { text: 'Sizes up to 24 feet wide', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8a165" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3H3v7h18V3z"/><path d="M21 14H3v7h18v-7z"/></svg> },
                            { text: '100% satisfaction guarantee', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8a165" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                          ].map((bullet, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="shrink-0">{bullet.icon}</span>
                              <span className="text-[12px] text-[#555] font-medium leading-tight">{bullet.text}</span>
                            </div>
                          ))}
                        </div>

                        {/* Price Anchor */}
                        <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white mb-3" style={{ border: '1px solid #ece8e0' }}>
                          <div>
                            <div className="text-[10px] text-[#aaa] font-semibold uppercase tracking-[0.1em]">Starting at</div>
                            <StartingAt shape="Standard" />
                          </div>
                          <div className="px-2.5 py-1 rounded-md text-[10px] font-bold text-green-600 uppercase tracking-[0.06em]" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                            Best Value
                          </div>
                        </div>

                        {/* CTA Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateConfig('shape', 'Standard' as ShapeType);
                            trackEvent('shape_select', { shape_name: 'Standard' });
                            setShapeFlash(true);
                            setTimeout(() => setShapeFlash(false), 500);
                            setTimeout(() => onAutoAdvance(0), 600);
                          }}
                          className="w-full py-3.5 rounded-xl font-medium text-[15px] tracking-wide transition-all duration-300 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                          style={{
                            background: 'linear-gradient(90deg, #C8A165 0%, #E7D8B8 55%, #C8A165 100%)',
                            boxShadow: '0 6px 24px rgba(200,161,101,0.2)',
                            color: '#1a1a1a',
                            fontFamily: "'Playfair Display', Georgia, serif",
                          }}
                        >
                          Yes, This Is My Window <ArrowRight size={15} />
                        </button>
                      </div>

                      {/* ── CRO: SPECIALTY TRIGGER (Card — visible) ── */}
                      <div
                        className="rounded-2xl cursor-pointer transition-all duration-300 mt-2"
                        style={{
                          border: showSpecialtyShapes ? '2px solid #c8a165' : '2px solid #e8e5de',
                          background: showSpecialtyShapes ? '#fdfbf7' : '#fff',
                          padding: '16px 20px',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                        }}
                        onClick={() => {
                          if (!showSpecialtyShapes) trackEvent('specialty_shapes_expanded', {});
                          setShowSpecialtyShapes(!showSpecialtyShapes);
                        }}
                      >
                        {/* Shape + Title */}
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-[56px] h-[56px] rounded-xl bg-[#f9f7f3] flex items-center justify-center shrink-0" style={{ border: '1px solid #ece8e0' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c8a165" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 22 22 2 22" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-[18px] font-normal text-[#1a1a1a] mb-0" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.01em' }}>
                              My window is a unique shape
                            </h4>
                            <p className="text-[12px] text-[#8b8b8b]">Triangle, angled, arched & more</p>
                          </div>
                        </div>

                        {/* CTA */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!showSpecialtyShapes) trackEvent('specialty_shapes_expanded', {});
                            setShowSpecialtyShapes(!showSpecialtyShapes);
                          }}
                          className="w-full py-3 rounded-xl font-medium text-[14px] tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
                          style={{
                            background: showSpecialtyShapes ? 'linear-gradient(90deg, #C8A165 0%, #E7D8B8 55%, #C8A165 100%)' : '#f5f3ec',
                            color: showSpecialtyShapes ? '#1a1a1a' : '#666',
                            border: showSpecialtyShapes ? 'none' : '1px solid #e8e5de',
                          }}
                        >
                          {showSpecialtyShapes ? 'Select Your Shape Below' : 'Show My Options'} <ArrowRight size={14} />
                        </button>

                        {/* ── CRO: SPECIALTY SECTION (Accordion) ── */}
                        <div
                          className="transition-all duration-500 ease-out"
                          style={{
                            maxHeight: showSpecialtyShapes ? '800px' : '0px',
                            overflow: 'hidden',
                            opacity: showSpecialtyShapes ? 1 : 0,
                          }}
                        >
                          <div className="pt-4">
                            {/* Specialty Shapes Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {Object.keys(SHAPE_CONFIGS).filter(k => k !== 'Standard').map((shapeKey) => (
                                <button
                                  key={shapeKey}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateConfig('shape', shapeKey as ShapeType);
                                    trackEvent('shape_select', { shape_name: shapeKey });
                                    setTimeout(() => onAutoAdvance(0), 400);
                                  }}
                                  className={`group flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 min-h-[110px] ${
                                    config.shape === shapeKey
                                    ? 'border-[#c8a165] bg-[#faf8f4]'
                                    : 'border-gray-100 hover:border-gray-200 bg-white'
                                  }`}
                                >
                                  <div className="relative w-14 h-14 mb-1.5 p-1.5 rounded-lg bg-[#f5f3ec] transition-colors">
                                    <img
                                      src={SHAPE_CONFIGS[shapeKey as ShapeType].mask}
                                      className={`w-full h-full object-contain transition-opacity ${config.shape === shapeKey ? 'opacity-100' : 'opacity-80'}`}
                                    />
                                  </div>
                                  <span className="text-[10px] font-black text-center leading-tight uppercase tracking-wider text-slate-700 group-hover:text-slate-900">
                                    {getShapeLabel(shapeKey)}
                                  </span>
                                  <StartingAt shape={shapeKey} />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ── MICRO TRUST ── */}
                      <div className="flex flex-col items-center gap-1.5 mt-4 mb-1">
                        <span className="text-[11px] text-[#777] flex items-center gap-1.5">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                          Custom-built for your exact window
                        </span>
                        <span className="text-[11px] text-[#777] flex items-center gap-1.5">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                          We review your measurements before production
                        </span>
                      </div>
                  </div>
              )}

              {index === 1 && (
                <div className="space-y-3 pt-2">
                  {config.installer ? (
                    <div className="space-y-3">
                       <div className="bg-slate-900 text-white rounded-xl p-4 shadow-sm border border-white/10 relative overflow-hidden print:border-slate-200 print:bg-white print:text-slate-900">
                          <div className="flex items-center gap-3 relative z-10">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0" style={{ backgroundColor: '#c8a165' }}>
                                 {config.installer?.name.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                      <h4 className="font-black text-white text-sm truncate print:text-slate-900">{config.installer?.name}</h4>
                                      <CheckCircle size={10} className="text-green-500" />
                                  </div>
                                  <div className="flex items-center gap-2 mt-0.5">
                                      <span className="flex items-center gap-0.5 text-yellow-400 font-black text-[9px]">
                                         <Star size={10} fill="currentColor" /> {config.installer?.rating}
                                      </span>
                                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{config.installer?.location}</span>
                                  </div>
                              </div>
                              <button onClick={() => setConfig({...config, installer: null})} className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors print:hidden"><MapPin size={14} /></button>
                          </div>
                       </div>

                       <div className="space-y-2">
                          <button onClick={() => updateServices(false, false, true)} className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between ${(!config.measureService && !config.installService) ? 'border-[#c8a165] bg-[#faf8f4]' : 'border-gray-100 hover:border-gray-200'}`}>
                             <div>
                                <div className="text-xs font-black uppercase tracking-wider">DIY - No Pro Service</div>
                                <div className="text-[12px] text-slate-400">I'll measure and install myself</div>
                             </div>
                             <span className="text-xs font-black text-green-600">FREE</span>
                          </button>

                          <button onClick={() => updateServices(true, false, false)} className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between ${(config.measureService && !config.installService) ? 'border-[#c8a165] bg-[#faf8f4]' : 'border-gray-100 hover:border-gray-200'}`}>
                             <div>
                                <div className="text-xs font-black uppercase tracking-wider">Pro Measure Only</div>
                                <div className="text-[12px] text-slate-400">100% Fit Guarantee • I'll install</div>
                             </div>
                             <span className="text-xs font-black text-slate-900">${config.installer?.fees.measure}</span>
                          </button>

                          <button onClick={() => updateServices(false, true, false)} className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between ${(!config.measureService && config.installService) ? 'border-[#c8a165] bg-[#faf8f4]' : 'border-gray-100 hover:border-gray-200'}`}>
                             <div>
                                <div className="text-xs font-black uppercase tracking-wider">Pro Install Only</div>
                                <div className="text-[12px] text-slate-400">I'll measure • Pro installs</div>
                             </div>
                             <span className="text-xs font-black text-slate-900">${config.installer?.fees.installPerUnit}/unit</span>
                          </button>

                          <button onClick={() => updateServices(true, true, false)} className={`w-full text-left p-3 rounded-xl border-2 transition-all relative ${ (config.measureService && config.installService) ? 'border-[#c8a165] bg-[#faf8f4]' : 'border-gray-100 hover:border-gray-200'}`}>
                             <div className="absolute -top-2 left-3 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase" style={{ backgroundColor: '#c8a165' }}>Recommended</div>
                             <div className="flex items-center justify-between">
                                <div>
                                   <div className="text-xs font-black uppercase tracking-wider">Full Pro Service</div>
                                   <div className="text-[12px] text-slate-400">100% Fit Guarantee • Hands-free</div>
                                </div>
                                <div className="text-right">
                                   <div className="text-xs font-black text-slate-900">${config.installer?.fees.measure} + ${config.installer?.fees.installPerUnit}/unit</div>
                                </div>
                             </div>
                          </button>
                       </div>
                       {!config.measureService && <MeasurementInputs shapeData={shapeData} config={config} handleMeasurementChange={handleMeasurementChange} handleFractionChange={handleFractionChange} t={t} />}
                    </div>
                  ) : showProPath ? (
                    <div className="border rounded-xl p-4 relative animate-in zoom-in-95 duration-200" style={{ backgroundColor: '#faf8f4', borderColor: '#e8dcc8' }}>
                       <button onClick={handleResetToPathSelection} className="absolute top-2 right-2 text-[#c8a165] hover:text-[#a8844d] transition-colors"><X size={16} /></button>
                       <h3 className="text-[16px] font-normal text-[#1a1a1a] mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                         Let's find a pro in your area
                       </h3>
                       <p className="text-[10px] font-medium text-[#999] uppercase tracking-widest mb-3">{t('pro.serviceAreaCheck')}</p>
                       <div className="relative">
                           <input type="text" maxLength={5} value={config.zipCode} onChange={handleZipChange} autoFocus placeholder={t('pro.zipPlaceholder')} className="w-full border-2 p-3 rounded-lg outline-none font-bold text-base shadow-sm" style={{ borderColor: '#e8dcc8' }} />
                           <div className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#c8a165' }}><Search size={18} /></div>
                       </div>
                    </div>
                  ) : isDIYSelected ? (
                    <div className="space-y-3">
                       <div className="text-center mb-1">
                         <h3 className="text-[16px] font-normal text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                           Just enter your window size
                         </h3>
                         <p className="text-[12px] text-[#94a3b8] mt-0.5">Almost there — just your size</p>
                       </div>
                       <div className="flex justify-between items-center">
                          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('step.summary.diy')}</h3>
                          <button onClick={handleShowProPath} className="text-[9px] font-black uppercase hover:underline" style={{ color: '#c8a165' }}>Pro Service?</button>
                       </div>
                       <MeasurementInputs shapeData={shapeData} config={config} handleMeasurementChange={handleMeasurementChange} handleFractionChange={handleFractionChange} t={t} />
                    </div>
                  ) : (
                    <div className="space-y-2">
                       {/* Step 2 Header */}
                       <div className="text-center mb-2">
                         <h3 className="text-[18px] font-normal text-[#1a1a1a] mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.01em' }}>
                           How would you like to get your measurements?
                         </h3>
                         <p className="text-[12px] text-[#94a3b8]">
                           Choose the option that works best for you
                         </p>
                       </div>

                       {/* DIY Option */}
                       <button onClick={handleSwitchToDIYPath} className="w-full text-left p-4 border-2 border-[#c8a165] rounded-xl hover:border-[#c8a165] transition-all bg-[#fdfbf7] shadow-sm relative">
                          <div className="absolute -top-2.5 left-3 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c8a165, #b8914f)' }}>
                            Most customers choose this
                          </div>
                          <div className="flex justify-between items-center mb-1 mt-1">
                             <div className="flex items-center gap-2">
                                <Wrench size={16} className="text-[#c8a165]" />
                                <span className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{t('pro.handleMyself')}</span>
                             </div>
                             <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-full border border-green-200">{t('common.free')}</span>
                          </div>
                          <p className="text-[12px] text-[#777] leading-tight font-medium">{t('pro.diyDesc')}</p>
                       </button>

                       {/* Pro Option */}
                       <button onClick={handleShowProPath} className="w-full text-left p-4 border-2 rounded-xl hover:border-[#d4b07a] transition-all bg-white shadow-sm relative" style={{ borderColor: '#e8e5de' }}>
                          <div className="absolute -top-2.5 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-[#8b6d3f] bg-[#f5f0e6] border border-[#e8dcc8]">
                            Recommended for best fit
                          </div>
                          <div className="flex items-center gap-2 mb-1 mt-1">
                             <UserCheck size={16} style={{ color: '#c8a165' }} />
                             <span className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{t('pro.getHelp')}</span>
                          </div>
                          <p className="text-[12px] text-[#777] leading-tight font-medium">We measure & install — {t('pro.fitGuarantee')}</p>
                       </button>
                    </div>
                  )}
                </div>
              )}

              {index === 2 && (
                <div className="space-y-3 pt-2">
                    {/* Step 3 Header */}
                    <div className="text-center mb-1">
                      <h3 className="text-[18px] font-normal text-[#1a1a1a] mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.01em' }}>
                        Choose your light preference
                      </h3>
                      <p className="text-[12px] text-[#94a3b8]">
                        Select the option that works best for your room
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {/* BLACKOUT — first, Most Popular */}
                        <button 
                          onClick={() => { updateConfig('shadeType', 'Blackout'); setTimeout(() => handleStepConfirmWithTracking(2), 400); }} 
                          className={`p-4 border-2 rounded-xl transition-all flex flex-col items-center justify-center gap-2 text-center group relative ${
                              config.shadeType === 'Blackout' 
                              ? 'border-[#c8a165] bg-[#faf8f4] shadow-md' 
                              : 'border-gray-100 hover:border-gray-300 bg-white'
                          }`}
                        >
                            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #c8a165, #b8914f)' }}>
                              Most Popular
                            </div>
                            <div className={`p-2 rounded-full transition-colors ${config.shadeType === 'Blackout' ? 'text-white' : 'bg-gray-50 text-slate-300 group-hover:text-slate-500'}`} style={config.shadeType === 'Blackout' ? { backgroundColor: '#c8a165' } : {}}>
                              <Layers size={20} />
                            </div>
                            <span className={`text-[11px] font-black uppercase tracking-widest leading-tight ${config.shadeType === 'Blackout' ? 'text-[#8b6d3f]' : 'text-slate-500'}`}>
                              {t('shadeType.blackout')}
                            </span>
                            <p className="text-[11px] font-normal text-slate-600 leading-snug mt-1 normal-case tracking-normal">
                              {t('shadeType.blackoutDesc')}
                            </p>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
                              {fabricCounts.blackout} {t('blueprint.material')}s
                            </div>
                            <StartingAt shape={config.shape || 'Standard'} category="Blackout" />
                        </button>

                        {/* LIGHT FILTERING — second */}
                        <button 
                          onClick={() => { updateConfig('shadeType', 'Light Filtering'); setTimeout(() => handleStepConfirmWithTracking(2), 400); }} 
                          className={`p-4 border-2 rounded-xl transition-all flex flex-col items-center justify-center gap-2 text-center group relative ${
                              config.shadeType === 'Light Filtering' 
                              ? 'border-[#c8a165] bg-[#faf8f4] shadow-md' 
                              : 'border-gray-100 hover:border-gray-300 bg-white'
                          }`}
                        >
                            <div className={`p-2 rounded-full transition-colors ${config.shadeType === 'Light Filtering' ? 'text-white' : 'bg-gray-50 text-slate-300 group-hover:text-slate-500'}`} style={config.shadeType === 'Light Filtering' ? { backgroundColor: '#c8a165' } : {}}>
                              <Sun size={20} />
                            </div>
                            <span className={`text-[11px] font-black uppercase tracking-widest leading-tight ${config.shadeType === 'Light Filtering' ? 'text-[#8b6d3f]' : 'text-slate-500'}`}>
                              {t('shadeType.lightFiltering')}
                            </span>
                            <p className="text-[11px] font-normal text-slate-600 leading-snug mt-1 normal-case tracking-normal">
                              {t('shadeType.lightFilteringDesc')}
                            </p>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
                              {fabricCounts.lightFiltering} {t('blueprint.material')}s
                            </div>
                            <StartingAt shape={config.shape || 'Standard'} category="Light Filtering" />
                        </button>

                        {/* ALL FABRICS — third */}
                        <button 
                          onClick={() => { updateConfig('shadeType', 'All'); setTimeout(() => handleStepConfirmWithTracking(2), 400); }} 
                          className={`p-4 border-2 rounded-xl transition-all flex flex-col items-center justify-center gap-2 text-center group relative ${
                              config.shadeType === 'All' 
                              ? 'border-[#c8a165] bg-[#faf8f4] shadow-md' 
                              : 'border-gray-100 hover:border-gray-300 bg-white'
                          }`}
                        >
                            <div className={`p-2 rounded-full transition-colors ${config.shadeType === 'All' ? 'text-white' : 'bg-gray-50 text-slate-300 group-hover:text-slate-500'}`} style={config.shadeType === 'All' ? { backgroundColor: '#c8a165' } : {}}>
                              <AllFabricsIcon className="w-5 h-5" />
                            </div>
                            <span className={`text-[11px] font-black uppercase tracking-widest leading-tight ${config.shadeType === 'All' ? 'text-[#8b6d3f]' : 'text-slate-500'}`}>
                              {t('shadeType.all')}
                            </span>
                            <p className="text-[11px] font-normal text-slate-600 leading-snug mt-1 normal-case tracking-normal">
                              {t('shadeType.allDesc')}
                            </p>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
                              {fabricCounts.all} {t('blueprint.material')}s
                            </div>
                        </button>
                    </div>
                </div>
              )}

              {index === 3 && <div className="pt-2"><FabricSuggestions loading={loadingFabrics} fabrics={fabrics} onSelect={(f) => { onSelectFabric(f); trackFabricSelected(f.name, f.category, f.priceGroup); setTimeout(() => onAutoAdvance(3), 400); }} selectedId={config.material?.id} width={config.width} height={config.height} widthFraction={config.widthFraction} heightFraction={config.heightFraction} onAddSwatch={onAddSwatch} requestedSwatches={requestedSwatches} analysis={analysis} config={config} /></div>}

              {index === 4 && (
                <div className="space-y-3 pt-2">
                    {/* Step 5 Header */}
                    <div className="text-center mb-1">
                      <h3 className="text-[18px] font-normal text-[#1a1a1a] mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.01em' }}>
                        Where do you want your shade installed?
                      </h3>
                      <p className="text-[12px] text-[#94a3b8]">
                        Not sure? Most homes use inside mount
                      </p>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-gray-100">
                      <img src="https://res.cloudinary.com/dcmlcfynd/image/upload/v1771868691/ChatGPT_Image_Feb_23_2026_12_40_36_PM_ajfwry.png" alt="Inside Mount vs Outside Mount" className="w-full h-auto" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {/* Inside Mount */}
                        <button
                          onClick={() => { updateConfig('mountType', 'Inside Mount'); setTimeout(() => handleStepConfirmWithTracking(4), 400); }}
                          className={`p-4 border-2 rounded-xl transition-all text-center relative ${
                            config.mountType === 'Inside Mount' ? 'border-[#c8a165] bg-[#faf8f4] shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #c8a165, #b8914f)' }}>
                            Most Common
                          </div>
                          <div className="text-[13px] font-semibold text-[#1a1a1a] mt-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                            Inside Mount
                          </div>
                          <p className="text-[11px] text-[#777] mt-1 leading-snug">
                            Clean, built-in look<br/>Fits inside your window frame
                          </p>
                        </button>

                        {/* Outside Mount */}
                        <button
                          onClick={() => { updateConfig('mountType', 'Outside Mount'); setTimeout(() => handleStepConfirmWithTracking(4), 400); }}
                          className={`p-4 border-2 rounded-xl transition-all text-center relative ${
                            config.mountType === 'Outside Mount' ? 'border-[#c8a165] bg-[#faf8f4] shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap text-[#8b6d3f] bg-[#f5f0e6] border border-[#e8dcc8]">
                            Best for Full Coverage
                          </div>
                          <div className="text-[13px] font-semibold text-[#1a1a1a] mt-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                            Outside Mount
                          </div>
                          <p className="text-[11px] text-[#777] mt-1 leading-snug">
                            Full coverage & larger look<br/>Mounts above your window
                          </p>
                        </button>
                    </div>
                </div>
              )}

              {index === 5 && (
                <div className="space-y-4 pt-2">
                    {/* Step 6 Header */}
                    <div className="text-center mb-1">
                      <h3 className="text-[18px] font-normal text-[#1a1a1a] mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.01em' }}>
                        How do you want to control your shade?
                      </h3>
                      <p className="text-[12px] text-[#94a3b8]">
                        You can change this later
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {/* Manual */}
                        <button onClick={() => { updateConfig('controlType', 'Metal Chain'); trackEvent('control_type_select', { control_type: 'Metal Chain' }); }} disabled={config.shape !== 'Standard'} className={`p-4 border-2 rounded-xl text-left transition-all relative ${
                          config.shape !== 'Standard' ? 'opacity-30 cursor-not-allowed' : (config.controlType === 'Metal Chain' ? 'border-[#c8a165] bg-[#faf8f4]' : 'border-gray-100 hover:border-gray-200 bg-white')
                        }`}>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>🟡 Manual</span>
                              </div>
                              <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded-full border border-green-200">Included</span>
                            </div>
                            <p className="text-[12px] text-[#777] leading-snug mt-1.5">
                              Simple & reliable — Best for easy-to-reach windows
                            </p>
                        </button>

                        {/* CHAIN SIDE — only shows after selecting Manual */}
                        {config.controlType === 'Metal Chain' && (
                          <div className="ml-2 pl-4 border-l-2 border-[#c8a165]/30 space-y-2 animate-in fade-in slide-in-from-bottom-1 duration-300">
                            <p className="text-[11px] font-semibold text-[#555] uppercase tracking-wider">Chain Side</p>
                            <div className="grid grid-cols-2 gap-2">
                              {['Right', 'Left'].map(side => (
                                <button
                                  key={side}
                                  onClick={() => updateConfig('controlPosition', side)}
                                  className={`p-3 border-2 rounded-xl text-center transition-all ${
                                    (config.controlPosition || 'Right') === side
                                      ? 'border-[#c8a165] bg-[#faf8f4] shadow-sm'
                                      : 'border-gray-100 hover:border-gray-200 bg-white'
                                  }`}
                                >
                                  <span className="text-[13px] font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{side}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        <button onClick={() => { updateConfig('controlType', 'Motorized'); trackEvent('control_type_select', { control_type: 'Motorized' }); }} className={`p-4 border-2 rounded-xl text-left transition-all relative ${
                          config.controlType === 'Motorized' ? 'border-[#c8a165] bg-[#faf8f4] shadow-md' : 'border-[#e8e5de] hover:border-[#d4b07a] bg-white shadow-sm'
                        }`}>
                            <div className="absolute -top-2.5 left-3 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c8a165, #b8914f)' }}>
                              Most Popular
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>⚡ Motorized</span>
                              </div>
                              <span className="text-[11px] font-bold text-[#8b6d3f]"><span className="line-through text-[#ccc] font-medium">${MOTOR_PRICES.base.marked}</span> +${MOTOR_PRICES.base.original}</span>
                            </div>
                            <p className="text-[12px] text-[#777] leading-snug mt-1.5">
                              Remote or app-controlled — Perfect for large or hard-to-reach windows
                            </p>
                        </button>
                    </div>

                    {/* MOTOR TYPE — only shows after selecting motorized */}
                    {config.controlType === 'Motorized' && (
                        <div className="space-y-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-1 duration-300">
                            <div className="text-center mb-1">
                              <h4 className="text-[15px] font-normal text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                                Choose power type
                              </h4>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <button onClick={() => updateConfig('motorPower', 'Rechargeable')} className={`p-4 border-2 rounded-xl text-left transition-all flex flex-col gap-2 relative ${
                                  config.motorPower === 'Rechargeable' ? 'border-[#c8a165] bg-[#faf8f4] ring-1 ring-[#c8a165]' : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm'
                                }`}>
                                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #c8a165, #b8914f)' }}>
                                      Most Popular
                                    </div>
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center p-1 border overflow-hidden mt-1" style={{ backgroundColor: '#faf8f4', borderColor: '#e8dcc8' }}>
                                      <img src="https://res.cloudinary.com/dcmlcfynd/image/upload/v1765304892/Pulse-2_nepvfj.png" alt="Battery" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="text-[12px] font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{t('control.rechargeable')}</div>
                                    <p className="text-[11px] text-[#777]">No wiring needed</p>
                                </button>
                                <button onClick={() => updateConfig('motorPower', 'Hardwired')} className={`p-4 border-2 rounded-xl text-left transition-all flex flex-col gap-2 relative ${
                                  config.motorPower === 'Hardwired' ? 'border-[#c8a165] bg-[#faf8f4] ring-1 ring-[#c8a165]' : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm'
                                }`}>
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center p-1 border mt-1" style={{ backgroundColor: '#faf8f4', borderColor: '#e8dcc8' }}>
                                      <Zap size={20} style={{ color: '#c8a165' }} />
                                    </div>
                                    <div className="text-[12px] font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{t('control.hardwired')}</div>
                                    <p className="text-[11px] text-[#777]">Built into your electrical system</p>
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="text-[12px] font-black text-slate-400 uppercase tracking-[0.15em] mb-0.5 ml-1">Upgrades</div>
                                
                                <button onClick={() => updateConfig('motorizedController', !config.motorizedController)} className={`w-full p-3 border-2 rounded-xl flex items-center justify-between transition-all ${config.motorizedController ? 'border-[#c8a165] bg-[#faf8f4] ring-1 ring-[#c8a165]' : 'border-gray-100 hover:border-gray-300 bg-white shadow-sm'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border border-gray-100 overflow-hidden shrink-0 shadow-sm">
                                          <img src="https://res.cloudinary.com/dcmlcfynd/image/upload/v1765304892/Push-5-1_huhfuk.png" alt="Remote" className="w-20 h-20 object-contain" />
                                        </div>
                                        <div className="text-left flex-1 min-w-0">
                                            <div className="text-xs font-black uppercase tracking-widest text-slate-900 truncate">{t('control.remote')}</div>
                                            <div className="text-[12px] text-slate-500 font-medium leading-tight mt-1 line-clamp-3 whitespace-pre-line">{t('control.remoteDesc')}</div>
                                        </div>
                                    </div>
                                    <div className="text-[11px] font-black px-1.5 py-0.5 rounded shrink-0" style={{ color: '#c8a165', backgroundColor: '#faf8f4' }}><span className="line-through text-[#ccc] font-medium">${MOTOR_PRICES.remote.marked}</span> +${MOTOR_PRICES.remote.original}</div>
                                </button>
                                
                                <button onClick={() => updateConfig('motorizedHub', !config.motorizedHub)} className={`w-full p-3 border-2 rounded-xl flex items-center justify-between transition-all ${config.motorizedHub ? 'border-[#c8a165] bg-[#faf8f4] ring-1 ring-[#c8a165]' : 'border-gray-100 hover:border-gray-300 bg-white shadow-sm'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border border-gray-100 overflow-hidden shrink-0 shadow-sm">
                                          <img src="https://res.cloudinary.com/dcmlcfynd/image/upload/v1765304892/Pulse-2_nepvfj.png" alt="Hub" className="w-20 h-20 object-contain" />
                                        </div>
                                        <div className="text-left flex-1 min-w-0">
                                            <div className="text-xs font-black uppercase tracking-widest text-slate-900 truncate">{t('control.hub')}</div>
                                            <div className="text-[12px] text-slate-500 font-medium leading-tight mt-1 line-clamp-3 whitespace-pre-line">{t('control.hubDesc')}</div>
                                        </div>
                                    </div>
                                    <div className="text-[11px] font-black px-1.5 py-0.5 rounded shrink-0" style={{ color: '#c8a165', backgroundColor: '#faf8f4' }}><span className="line-through text-[#ccc] font-medium">${MOTOR_PRICES.hub.marked}</span> +${MOTOR_PRICES.hub.original}</div>
                                </button>

                                <div className="w-full p-3 border border-dashed rounded-xl flex items-center gap-4" style={{ borderColor: '#e8dcc8', backgroundColor: '#fdfbf7' }}>
                                    <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border overflow-hidden shrink-0 shadow-sm" style={{ borderColor: '#e8dcc8' }}>
                                      <img src="https://res.cloudinary.com/dcmlcfynd/image/upload/v1765304892/motorised-blinds-automate-pulse-2-app-smarter-controls-for-climate-and-light-management-us_eg7ffg.png" alt="App" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-left flex-1 min-w-0">
                                        <div className="text-xs font-black uppercase tracking-widest truncate" style={{ color: '#8b6d3f' }}>Automate Pulse 2 App</div>
                                        <div className="text-[12px] text-slate-500 font-medium leading-tight mt-1 line-clamp-2 whitespace-pre-line">{t('control.appDesc')}</div>
                                        <div className="text-[12px] font-black uppercase mt-1.5 tracking-widest" style={{ color: '#c8a165' }}>Included with hub</div>
                                    </div>
                                </div>

                                <button onClick={() => updateConfig('sunSensor', !config.sunSensor)} className={`w-full p-3 border-2 rounded-xl flex items-center justify-between transition-all ${config.sunSensor ? 'border-[#c8a165] bg-[#faf8f4] ring-1 ring-[#c8a165]' : 'border-gray-100 hover:border-gray-300 bg-white shadow-sm'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border border-gray-100 overflow-hidden shrink-0 shadow-sm">
                                          <img src="https://res.cloudinary.com/dcmlcfynd/image/upload/v1767828127/SunSensor_yk4he7.avif" alt="Sun Sensor" className="w-20 h-20 object-contain" />
                                        </div>
                                        <div className="text-left flex-1 min-w-0">
                                            <div className="text-xs font-black uppercase tracking-widest text-slate-900 truncate">{t('control.sunSensor')}</div>
                                            <div className="text-[12px] text-slate-500 font-medium leading-tight mt-1 line-clamp-3 whitespace-pre-line">{t('control.sunSensorDesc')}</div>
                                        </div>
                                    </div>
                                    <div className="text-[11px] font-black px-1.5 py-0.5 rounded shrink-0" style={{ color: '#c8a165', backgroundColor: '#faf8f4' }}><span className="line-through text-[#ccc] font-medium">${MOTOR_PRICES.sunSensor.marked}</span> +${MOTOR_PRICES.sunSensor.original}</div>
                                </button>

                                <button onClick={() => updateConfig('motorizedCharger', !config.motorizedCharger)} className={`w-full p-3 border-2 rounded-xl flex items-center justify-between transition-all ${config.motorizedCharger ? 'border-[#c8a165] bg-[#faf8f4] ring-1 ring-[#c8a165]' : 'border-gray-100 hover:border-gray-300 bg-white shadow-sm'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border border-gray-100 overflow-hidden shrink-0 shadow-sm">
                                          <img src="https://res.cloudinary.com/dcmlcfynd/image/upload/v1767978103/rowley-automate-slim-drapery-motor-cable-mt03-0301-069007_o8lbi5.webp" alt="Motor Charger" className="w-20 h-20 object-contain" />
                                        </div>
                                        <div className="text-left flex-1 min-w-0">
                                            <div className="text-xs font-black uppercase tracking-widest text-slate-900 truncate">{t('control.charger')}</div>
                                            <div className="text-[12px] text-slate-500 font-medium leading-tight mt-1 line-clamp-3 whitespace-pre-line">{t('control.chargerDesc')}</div>
                                        </div>
                                    </div>
                                    <div className="text-[11px] font-black px-1.5 py-0.5 rounded shrink-0" style={{ color: '#c8a165', backgroundColor: '#faf8f4' }}><span className="line-through text-[#ccc] font-medium">${MOTOR_PRICES.charger.marked}</span> +${MOTOR_PRICES.charger.original}</div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
              )}

              {index === 6 && (
                <div className="space-y-6 pt-2">
                    {/* Step 7 Header */}
                    <div className="text-center mb-1">
                      <h3 className="text-[18px] font-normal text-[#1a1a1a] mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.01em' }}>
                        Customize the look of your shade
                      </h3>
                      <p className="text-[12px] text-[#94a3b8]">
                        You can keep the standard option or upgrade your look
                      </p>
                    </div>

                    <div className="space-y-3">
                        {/* Visual guide image — shown first */}
                        <div className="w-full rounded-xl overflow-hidden border border-gray-200 mb-2 shadow-sm bg-white">
                           <img 
                              src="https://res.cloudinary.com/dcmlcfynd/image/upload/v1767829241/Cassettand_valances_eybsoy.jpg" 
                              alt="Roll and Valance Styles" 
                              className="w-full h-auto object-cover"
                           />
                        </div>

                        {/* SECTION 1: Roll Type */}
                        <div className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-[0.15em] text-[11px] px-1">
                            <Layout size={14} /> <span>Roll Type</span>
                        </div>
                        <p className="text-[11px] text-[#94a3b8] px-1 -mt-1">Choose how your fabric rolls — both options are included free</p>

                        <div className="grid grid-cols-1 gap-2">
                          {VALANCE_OPTIONS.filter(opt => opt.id === 'standard' || opt.id === 'reverse').map(opt => {
                              const isRollSelected = config.valanceType === opt.id || (opt.id === 'standard' && config.valanceType !== 'reverse' && config.valanceType !== 'standard' && !config.valanceType);
                              const isActiveRoll = config.valanceType === opt.id || 
                                (config.valanceType === 'cassette' || config.valanceType === 'fascia') && (config.rollType === (opt.id === 'standard' ? 'Standard' : 'Reverse'));
                              return (
                                  <button 
                                      key={opt.id} 
                                      onClick={() => {
                                        if (config.valanceType === 'cassette' || config.valanceType === 'fascia') {
                                          // Keep the cover, just change roll direction
                                          setConfig({ ...config, rollType: opt.id === 'reverse' ? 'Reverse' : 'Standard' });
                                        } else {
                                          // No cover selected — set both valanceType and rollType in one call
                                          setConfig({ ...config, valanceType: opt.id as any, rollType: opt.id === 'reverse' ? 'Reverse' : 'Standard' });
                                        }
                                      }} 
                                      className={`w-full p-4 border-2 transition-all duration-300 relative ${
                                          isActiveRoll 
                                          ? 'border-[#c8a165] bg-[#fdfbf7] ring-2 ring-[#c8a165] shadow-lg scale-[1.01] rounded-xl' 
                                          : 'border-gray-200 hover:border-gray-300 bg-white rounded-xl shadow-sm'
                                      }`}
                                      style={isActiveRoll ? { boxShadow: '0 0 0 2px #c8a165, 0 6px 20px rgba(200,161,101,0.2)' } : {}}
                                  >
                                      <div className="flex items-center justify-between">
                                          <div className="text-left">
                                              <div className="text-[13px] font-semibold text-[#1a1a1a] leading-tight mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{opt.label}</div>
                                              <div className="text-[11px] text-[#777] font-medium leading-tight">{opt.desc}</div>
                                          </div>
                                          <div className="text-[10px] font-bold uppercase tracking-widest shrink-0 ml-3">
                                              <span className="text-green-600">Included</span>
                                          </div>
                                      </div>
                                  </button>
                              );
                          })}
                        </div>

                        {/* SECTION 2: Valance Cover (optional upgrade) */}
                        <div className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-[0.15em] text-[11px] px-1 mt-6">
                            <Layout size={14} /> <span>Valance Cover</span>
                            <span className="text-[9px] font-medium normal-case tracking-normal text-[#94a3b8]">(optional upgrade)</span>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          {/* No Cover option */}
                          <button 
                              onClick={() => {
                                const roll = config.rollType === 'Reverse' ? 'reverse' : 'standard';
                                updateConfig('valanceType', roll as any);
                              }} 
                              className={`w-full p-4 border-2 transition-all duration-300 relative ${
                                  (config.valanceType === 'standard' || config.valanceType === 'reverse')
                                  ? 'border-[#c8a165] bg-[#fdfbf7] ring-2 ring-[#c8a165] shadow-lg scale-[1.01] rounded-xl' 
                                  : 'border-gray-200 hover:border-gray-300 bg-white rounded-xl shadow-sm'
                              }`}
                              style={(config.valanceType === 'standard' || config.valanceType === 'reverse') ? { boxShadow: '0 0 0 2px #c8a165, 0 6px 20px rgba(200,161,101,0.2)' } : {}}
                          >
                              <div className="flex items-center justify-between">
                                  <div className="text-left">
                                      <div className="text-[13px] font-semibold text-[#1a1a1a] leading-tight mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>No Cover</div>
                                      <div className="text-[11px] text-[#777] font-medium leading-tight">Keep the clean, minimal look</div>
                                  </div>
                                  <div className="text-[10px] font-bold uppercase tracking-widest shrink-0 ml-3">
                                      <span className="text-green-600">Included</span>
                                  </div>
                              </div>
                          </button>

                          {VALANCE_OPTIONS.filter(opt => opt.id === 'cassette' || opt.id === 'fascia').map(opt => {
                              const isSelected = config.valanceType === opt.id;
                              return (
                                  <button 
                                      key={opt.id} 
                                      onClick={() => updateConfig('valanceType', opt.id as any)} 
                                      className={`w-full p-4 border-2 transition-all duration-300 relative ${
                                          isSelected 
                                          ? 'border-[#c8a165] bg-[#fdfbf7] ring-2 ring-[#c8a165] shadow-lg scale-[1.01] rounded-xl' 
                                          : 'border-gray-200 hover:border-gray-300 bg-white rounded-xl shadow-sm'
                                      }`}
                                      style={isSelected ? { boxShadow: '0 0 0 2px #c8a165, 0 6px 20px rgba(200,161,101,0.2)' } : {}}
                                  >
                                      {opt.id === 'cassette' && (
                                        <div className="absolute -top-2.5 left-3 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c8a165, #b8914f)' }}>
                                          Most Popular Upgrade
                                        </div>
                                      )}
                                      <div className="flex items-center justify-between">
                                          <div className="text-left">
                                              <div className="text-[13px] font-semibold text-[#1a1a1a] leading-tight mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{t(`valance.${opt.id}`)}</div>
                                              <div className="text-[11px] text-[#777] font-medium leading-tight">{opt.desc}</div>
                                          </div>
                                          <div className="text-[10px] font-bold uppercase tracking-widest shrink-0 ml-3" style={{ color: '#c8a165' }}>
                                              <span className="line-through text-[#ccc] font-normal">${applyMarkup(opt.pricePerInch).toFixed(2)}</span> +${opt.pricePerInch.toFixed(2)}/in
                                          </div>
                                      </div>
                                  </button>
                              );
                          })}
                        </div>
                        
                        <div className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-[0.15em] text-[11px] px-1 mt-6">
                            <PanelLeftClose size={14} /> <span>Light Blocking Channels</span>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-2 mt-3">
                          {SIDE_CHANNEL_OPTIONS.map(opt => {
                              const isSelected = config.sideChannelType === opt.id;
                              return (
                                  <button 
                                      key={opt.id} 
                                      onClick={() => updateConfig('sideChannelType', opt.id as any)} 
                                      className={`w-full p-4 border-2 transition-all duration-300 relative ${
                                          isSelected 
                                          ? 'border-[#c8a165] bg-[#fdfbf7] ring-2 ring-[#c8a165] shadow-lg scale-[1.01] rounded-xl' 
                                          : 'border-gray-200 hover:border-gray-300 bg-white rounded-xl shadow-sm'
                                      }`}
                                      style={isSelected ? { boxShadow: '0 0 0 2px #c8a165, 0 6px 20px rgba(200,161,101,0.2)' } : {}}
                                  >
                                      {opt.id === 'standard' && (
                                        <div className="absolute -top-2.5 left-3 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-[#8b6d3f] bg-[#f5f0e6] border border-[#e8dcc8]">
                                          Best for Blackout
                                        </div>
                                      )}
                                      <div className="flex items-center justify-between">
                                          <div className="text-left">
                                              <div className="text-[13px] font-semibold text-[#1a1a1a] leading-tight mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{opt.label}</div>
                                              <div className="text-[11px] text-[#777] font-medium leading-tight">
                                                  {opt.id === 'none' ? 'Standard installation — no extras needed' : 'Blocks light gaps on sides for full darkness'}
                                              </div>
                                          </div>
                                          <div className="text-[10px] font-bold uppercase tracking-widest shrink-0 ml-3" style={{ color: '#c8a165' }}>
                                              {opt.pricePerFoot === 0 ? <span className="text-green-600">Included</span> : <><span className="line-through text-[#ccc] font-normal">${applyMarkup(opt.pricePerFoot).toFixed(2)}</span> +${opt.pricePerFoot.toFixed(2)}/ft</>}
                                          </div>
                                      </div>
                                  </button>
                              );
                          })}
                        </div>
                    </div>
                </div>
              )}
              
              {index === 7 && (
                <div className="space-y-4 pt-2">
                  {/* Quantity header */}
                  <div className="text-center mb-1">
                    <h3 className="text-[18px] font-normal text-[#1a1a1a] mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.01em' }}>
                      Need more than one shade?
                    </h3>
                    <p className="text-[12px] text-[#94a3b8]">
                      Ordering multiple? Adjust the quantity below
                    </p>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-[#fdfbf7] rounded-xl border border-[#e8e5de]">
                    <label className="text-[13px] font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Quantity</label>
                    <div className="flex-1 flex items-center justify-end gap-3">
                        <button onClick={() => updateConfig('quantity', Math.max(1, config.quantity - 1))} className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-white transition-colors"><X size={12} className="rotate-45" /></button>
                        <span className="text-xl font-black text-slate-900 w-6 text-center">{config.quantity}</span>
                        <button onClick={() => updateConfig('quantity', config.quantity + 1)} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-white hover:opacity-90 transition-colors" style={{ borderColor: '#c8a165', backgroundColor: '#c8a165' }}><div className="font-bold text-lg">+</div></button>
                    </div>
                  </div>

                  {/* Trust stack */}
                  <div className="flex flex-col items-center gap-1.5 py-2">
                    <span className="text-[11px] text-[#666] flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      Perfect fit guarantee
                    </span>
                    <span className="text-[11px] text-[#666] flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      Ships in 5–7 business days
                    </span>
                    <span className="text-[11px] text-[#666] flex items-center gap-1.5">
                      <span className="text-amber-500">★</span>
                      4.8 from 2,000+ customers
                    </span>
                  </div>

                  {/* Urgency */}
                  {isSaleActive() && (
                    <div className="text-center">
                      <p className="text-[12px] font-semibold text-[#c0593a]">
                        ⏳ Sale ends soon — don't miss your discount
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* CONTINUE BUTTON — hidden on Step 0, sticky on ALL steps */}
              {index !== 0 && (() => {
                const hasMeasurements = config.width > 0 && config.height > 0;
                const isMeasureStep = index === 1;
                const isDisabled = isMeasureStep && !hasMeasurements;
                return (
                <div className='sticky bottom-0 z-10 bg-white pt-3 pb-1 -mx-2 px-2 shadow-[0_-8px_16px_rgba(255,255,255,0.9)]'>
                <button
                  onClick={() => !isDisabled && handleStepConfirmWithTracking(index)}
                  disabled={isDisabled}
                  className={`w-full mt-2 py-3.5 px-4 rounded-xl text-white font-medium text-[14px] tracking-wide transition-all duration-500 flex items-center justify-center gap-2 group/btn ${isLastStep ? 'cta-glow' : ''} ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:shadow-xl active:scale-[0.98]'}`}
                  style={{ 
                    background: 'linear-gradient(90deg, #C8A165 0%, #E7D8B8 55%, #C8A165 100%)',
                    boxShadow: isDisabled ? 'none' : isLastStep ? '0 10px 25px rgba(212, 175, 55, 0.35)' : '0 6px 24px rgba(200, 161, 101, 0.2)',
                    color: '#1a1a1a'
                  }}
                >
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {isLastStep ? (isSaleActive() ? `Add My Shade to Cart — ${SALE_CONFIG.discountPercent}% OFF` : 'Add My Shade to Cart') : index === 1 ? 'Choose My Fabric' : index === 2 ? 'Choose Fabric' : index === 4 ? 'Choose Your Control Type' : index === 5 ? 'Customize Your Look' : index === 6 ? 'Choose Your Quantity' : 'Continue'}
                  </span>
                  <ArrowRight size={15} className={`transition-transform duration-300 ${isDisabled ? '' : 'group-hover/btn:translate-x-1'}`} />
                </button>
                {isMeasureStep && (
                  <p className={`text-center text-[11px] mt-1.5 transition-all duration-300 ${hasMeasurements ? 'text-green-600 font-semibold' : 'text-[#bbb]'}`}>
                    {hasMeasurements ? 'Looks good 👍' : 'Enter your measurements to continue'}
                  </p>
                )}
                {isLastStep && (
                  <div className="text-center mt-2 space-y-1">
                    <p className="text-[11px] text-[#999]">Next: Review your order & checkout securely</p>
                    <p className="text-[10px] text-[#bbb]">You can edit your order before checkout</p>
                  </div>
                )}
                </div>
                );
              })()}
            </div>
          </div>
        );
      })}

      {/* CSS animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes stepReveal {
          0% { opacity: 0; transform: translateY(-8px) scale(0.98); }
          60% { opacity: 1; transform: translateY(2px) scale(1.005); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
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
};

export default Stepper;
