import React from 'react';
import { Award, ExternalLink, History, BookOpen, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  attemptCount: number;
  onOpenHistory: () => void;
  onResetToForm: () => void;
  currentView: 'form' | 'results';
  onOpenAdmin: () => void;
  totalServerSubmissions: number;
}

export const Header: React.FC<HeaderProps> = ({
  attemptCount,
  onOpenHistory,
  onResetToForm,
  currentView,
  onOpenAdmin,
  totalServerSubmissions,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div 
          onClick={onResetToForm}
          className="flex items-center gap-3 cursor-pointer group select-none"
          title="Volver al inicio del cuestionario"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black text-xl shadow-xs group-hover:scale-105 transition-transform">
            C
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-widest text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                CUN • Habilidades Comerciales
              </span>
              <span className="hidden sm:inline-block text-[11px] text-slate-500 font-medium">
                cun.edu.co
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Quiz de Capacitación Comercial
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin / Owner Dashboard Button */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-300 rounded-lg transition-all shadow-2xs cursor-pointer"
            title="Panel del Dueño / Evaluador para ver todas las respuestas y notas"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Panel Dueño</span>
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-black text-white bg-slate-900 rounded-full px-1">
              {totalServerSubmissions}
            </span>
          </button>

          <a
            href="https://habilidades-comerciales-cun.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-emerald-700 rounded-lg transition-colors"
            title="Ver presentación y material original"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Capacitación</span>
            <ExternalLink className="w-3 h-3 text-slate-600" />
          </a>

          <button
            type="button"
            onClick={onOpenHistory}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors relative cursor-pointer"
            title="Ver mis intentos personales"
          >
            <History className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Mis Intentos</span>
            {attemptCount > 0 && (
              <span className="ml-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-black text-white bg-emerald-600 rounded-full px-1">
                {attemptCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
