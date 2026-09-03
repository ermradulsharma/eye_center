'use client';

import React from 'react';
import { Building2 } from 'lucide-react';

export default function AdminFooter() {
  return (
    <footer className="neu-flat mt-auto border-t border-slate-300/80 px-8 py-4 text-center text-xs font-semibold text-slate-500 flex flex-wrap justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        <Building2 className="w-4 h-4 text-sky-600" />
        <span>R.S. Eye Care & Rehabilitation Center — Administrative Operations (Etah Branch)</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[11px] text-slate-400">Enterprise Command Center v2.0</span>
      </div>
    </footer>
  );
}
