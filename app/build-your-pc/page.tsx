'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Cpu,
  Tv,
  Layers,
  Sliders,
  HardDrive,
  Zap,
  Box,
  Wind,
  Fan,
  CheckCircle2,
  AlertTriangle,
  ShoppingCart,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { COMPONENTS } from '@/data/components';
import { ComponentItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';

const STEPS = [
  { id: 'processor', name: 'Processor', icon: Cpu, desc: 'Intel Core & AMD Ryzen' },
  { id: 'gpu', name: 'Graphics Card', icon: Tv, desc: 'NVIDIA RTX & AMD Radeon' },
  { id: 'motherboard', name: 'Motherboard', icon: Layers, desc: 'Z790, B760, X670E' },
  { id: 'ram', name: 'RAM (Memory)', icon: Sliders, desc: 'High-speed DDR5 kits' },
  { id: 'storage', name: 'Storage (SSD)', icon: HardDrive, desc: 'PCIe Gen4/Gen5 NVMe' },
  { id: 'cooler', name: 'CPU Cooler', icon: Wind, desc: 'AIO Liquid or Tower Air' },
  { id: 'psu', name: 'Power Supply', icon: Zap, desc: '80+ Gold / Platinum' },
  { id: 'case', name: 'Cabinet / Chassis', icon: Box, desc: 'Dual-Chamber Panoramic' },
  { id: 'fans', name: 'Cooling Fans', icon: Fan, desc: 'Daisy-chain ARGB fans' },
];

export default function CustomPCBuilderPage() {
  const router = useRouter();
  const { addCustomBuildToCart } = useStore();

  const [activeStep, setActiveStep] = useState<string>('processor');
  const [selections, setSelections] = useState<Record<string, ComponentItem | null>>({
    processor: null,
    gpu: null,
    motherboard: null,
    ram: null,
    storage: null,
    cooler: null,
    psu: null,
    case: null,
    fans: null,
  });

  const handleSelectComponent = (category: string, item: ComponentItem) => {
    setSelections((prev) => ({
      ...prev,
      [category]: prev[category]?.id === item.id ? null : item,
    }));
  };

  const handleClearSelection = (category: string) => {
    setSelections((prev) => ({
      ...prev,
      [category]: null,
    }));
  };

  const resetAll = () => {
    setSelections({
      processor: null,
      gpu: null,
      motherboard: null,
      ram: null,
      storage: null,
      cooler: null,
      psu: null,
      case: null,
      fans: null,
    });
    setActiveStep('processor');
  };

  // Compatibility Checks
  const compatibilityStatus = useMemo(() => {
    const warnings: string[] = [];
    const cpu = selections.processor;
    const mb = selections.motherboard;
    const ram = selections.ram;
    const gpu = selections.gpu;
    const psu = selections.psu;

    if (cpu && mb) {
      if (cpu.socket && mb.socket && cpu.socket !== mb.socket) {
        warnings.push(
          `Socket Incompatibility: ${cpu.name} uses ${cpu.socket}, but ${mb.name} uses ${mb.socket}. Please select a compatible motherboard.`
        );
      }
    }

    if (ram && mb) {
      if (ram.memoryType && mb.memoryType && ram.memoryType !== mb.memoryType) {
        warnings.push(
          `Memory Type Incompatibility: ${ram.name} is ${ram.memoryType}, but ${mb.name} only supports ${mb.memoryType}.`
        );
      }
    }

    const estimatedWattage =
      (cpu?.wattage || 0) +
      (gpu?.wattage || 0) +
      (mb?.wattage || 0) +
      (ram?.wattage || 0) +
      (selections.storage?.wattage || 0) +
      (selections.cooler?.wattage || 0) +
      (selections.fans?.wattage || 0) +
      75;

    const recommendedWattage = Math.ceil((estimatedWattage * 1.3) / 50) * 50;

    if (psu) {
      const psuWattageMatch = psu.specs.match(/(\d+)\s*Watt/i);
      const psuWatts = psuWattageMatch ? parseInt(psuWattageMatch[1], 10) : 750;
      if (psuWatts < recommendedWattage) {
        warnings.push(
          `Wattage Advisory: Your build draws ~${estimatedWattage}W (recommended ${recommendedWattage}W PSU), but selected PSU is ${psuWatts}W. Consider upgrading to an 850W or 1000W PSU for safety.`
        );
      }
    }

    return {
      warnings,
      isCompatible: warnings.length === 0,
      estimatedWattage,
      recommendedWattage,
    };
  }, [selections]);

  const totalPrice = useMemo(() => {
    return Object.values(selections).reduce((acc, curr) => acc + (curr?.price || 0), 0);
  }, [selections]);

  const selectedCount = Object.values(selections).filter(Boolean).length;

  const handleAddToCart = () => {
    const chosenComponents = Object.values(selections).filter(Boolean) as ComponentItem[];
    if (chosenComponents.length === 0) return;
    addCustomBuildToCart(chosenComponents, totalPrice);
    router.push('/cart');
  };

  const currentStepComponents = COMPONENTS.filter((c) => c.category === activeStep);

  return (
    <div className="mx-auto w-[95%] max-w-[1440px] px-3 py-8 sm:px-6 lg:px-8 text-[#1D1D1F]">
      {/* Header */}
      <nav className="flex items-center gap-2 text-xs text-[#6E6E73]">
        <Link href="/" className="hover:text-ember transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ember font-medium">Custom PC Configurator</span>
      </nav>

      <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E5E7] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-ember/10 px-3.5 py-1 text-xs font-medium text-ember">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Studio Builder</span>
          </div>
          <h1 className="editorial-headline mt-3 text-3xl font-semibold text-[#1D1D1F] sm:text-5xl tracking-[-0.035em]">
            Build Your <span className="gradient-text">Dream Machine</span>
          </h1>
          <p className="mt-2 text-sm text-[#6E6E73] sm:text-base">
            Select individual components with real-time socket matching, dynamic wattage checks, and live pricing.
          </p>
        </div>

        {selectedCount > 0 && (
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-4 py-2 text-xs font-medium text-[#6E6E73] hover:border-red-400 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Configuration</span>
          </button>
        )}
      </div>

      {/* Main Builder Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Category Steps Selector (Col 3) */}
        <div className="lg:col-span-3 space-y-2">
          <span className="text-xs font-medium text-[#6E6E73] px-2 block">
            Components ({selectedCount}/9 Selected)
          </span>

          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {STEPS.map((step) => {
              const StepIcon = step.icon;
              const isSelected = !!selections[step.id];
              const isActive = activeStep === step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all shrink-0 lg:shrink w-56 lg:w-full ${
                    isActive
                      ? 'border-ember bg-ember/5 ring-2 ring-ember/20'
                      : isSelected
                      ? 'border-[#E5E5E7] bg-[#F5F5F7]'
                      : 'border-transparent bg-white/5 text-[#6E6E73] hover:bg-[#F5F5F7] hover:border-[#E5E5E7]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                        isActive
                          ? 'bg-ember text-[#1D1D1F]'
                          : isSelected
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                          : 'bg-[#F5F5F7] border border-[#E5E5E7] text-[#6E6E73]'
                      }`}
                    >
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-[#1D1D1F]">{step.name}</span>
                      <span className="text-[11px] text-[#6E6E73] line-clamp-1 font-medium">
                        {selections[step.id]?.name || step.desc}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Column: Component Selection List (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-3">
            <div>
              <h2 className="font-display font-normal tracking-[-0.02em] text-lg text-[#1D1D1F] capitalize">
                Select {activeStep.replace('-', ' ')}
              </h2>
              <p className="text-xs text-[#6E6E73]">
                Authorized retail boxed components with full manufacturer warranties
              </p>
            </div>
            {selections[activeStep] && (
              <button
                onClick={() => handleClearSelection(activeStep)}
                className="text-xs font-medium text-rose-400 hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          <div className="space-y-3">
            {currentStepComponents.map((item) => {
              const isSelected = selections[activeStep]?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectComponent(activeStep, item)}
                  className={`card-premium flex cursor-pointer items-center justify-between gap-4 rounded-xl p-4 transition-all ${
                    isSelected
                      ? 'border-ember ring-2 ring-ember/20 bg-ember/5'
                      : 'border-[#E5E5E7] bg-[#F5F5F7]'
                  }`}
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white/5 border border-[#E5E5E7]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1">
                    <span className="text-[11px] font-medium text-ember">
                      {item.brand}
                    </span>
                    <h3 className="font-sans text-sm font-medium text-[#1D1D1F] line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#6E6E73] line-clamp-2">{item.specs}</p>
                    {item.socket && (
                      <span className="mt-1.5 inline-block rounded-md bg-white/5 border border-[#E5E5E7] px-2 py-0.5 text-[11px] font-medium text-[#1D1D1F]">
                        Socket {item.socket}
                      </span>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span className="block font-sans text-base font-medium text-[#1D1D1F]">
                      {formatPrice(item.price)}
                    </span>
                    <button
                      type="button"
                      className={`mt-2 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-ember text-[#1D1D1F]'
                          : 'border border-[#E5E5E7] bg-[#F5F5F7] text-[#1D1D1F] hover:border-[#1D1D1F]'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Build Summary & Diagnostics (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Diagnostics Card */}
          <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6">
            <h3 className="font-sans text-sm font-medium text-[#1D1D1F] flex items-center gap-2">
              <Zap className="h-4 w-4 text-ember" />
              <span>Real-Time System Diagnostics</span>
            </h3>

            {/* Wattage Bar */}
            <div className="mt-4 rounded-xl bg-white/5 p-4 border border-[#E5E5E7]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6E6E73]">Estimated Peak Load:</span>
                <span className="font-medium text-[#1D1D1F]">
                  ~{compatibilityStatus.estimatedWattage} Watts
                </span>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-xs">
                <span className="text-[#6E6E73]">Recommended PSU:</span>
                <span className="font-medium text-ember">
                  {compatibilityStatus.recommendedWattage}W+
                </span>
              </div>

              {/* Meter */}
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-[#E5E5E7] transition-all duration-500 rounded-full"
                  style={{
                    width: `${Math.min(
                      (compatibilityStatus.estimatedWattage / 1000) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Compatibility Warning List */}
            {compatibilityStatus.warnings.length > 0 ? (
              <div className="mt-4 space-y-2">
                {compatibilityStatus.warnings.map((warn, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-800"
                  >
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                    <span>{warn}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-800 font-medium">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>All selected hardware is 100% physically & electrically compatible!</span>
              </div>
            )}
          </div>

          {/* Configuration Summary Card */}
          <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6">
            <h3 className="font-sans text-sm font-medium text-[#1D1D1F]">Selected Hardware</h3>

            <div className="mt-4 divide-y divide-line text-xs">
              {Object.entries(selections).map(([key, item]) => {
                if (!item) return null;
                return (
                  <div key={key} className="py-2.5 flex items-center justify-between gap-2">
                    <div>
                      <span className="font-medium text-[#1D1D1F] block line-clamp-1">{item.name}</span>
                      <span className="text-[11px] text-[#6E6E73] capitalize">{key}</span>
                    </div>
                    <span className="font-medium text-[#1D1D1F] shrink-0">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                );
              })}

              {selectedCount === 0 && (
                <p className="py-4 text-center text-xs text-[#6E6E73]">
                  No components chosen yet. Click any component from the list to start configuring.
                </p>
              )}
            </div>

            {/* Total Price & Checkout */}
            <div className="mt-6 border-t border-[#E5E5E7] pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-[#6E6E73]">Total Build Price:</span>
                <span className="text-3xl font-medium text-[#1D1D1F]">{formatPrice(totalPrice)}</span>
              </div>

              <button
                disabled={selectedCount === 0}
                onClick={handleAddToCart}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#1D1D1F] text-white py-4 text-sm font-medium transition-all hover:bg-ember active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add Complete Build to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
