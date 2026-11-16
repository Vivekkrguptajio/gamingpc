'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 rounded-xl border border-[#E5E5E7] bg-white/95 px-4 py-3.5 text-sm text-[#1D1D1F] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === 'warning' ? (
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="h-5 w-5 text-ember shrink-0" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-ember shrink-0" />
          )}
          <span className="font-medium text-xs sm:text-sm">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
