import React, { useRef } from 'react';
import { QuizSubmission } from '../types';
import { X, Printer, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  submission: QuizSubmission;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  submission,
  isOpen,
  onClose,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Modal Controls Header (hidden on print) */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm">Certificado de Aprobación Institucional</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimir / Guardar PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body */}
        <div
          ref={certificateRef}
          className="p-8 sm:p-12 bg-gradient-to-b from-amber-50/40 via-white to-emerald-50/30 text-center relative selection:bg-none"
        >
          {/* Certificate Ornamental Border */}
          <div className="border-4 border-double border-amber-600/60 p-6 sm:p-10 rounded-2xl relative">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-700" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-700" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-700" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-700" />

            {/* CUN Badge & Branding */}
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-widest mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Corporación Unificada Nacional de Educación Superior • CUN
            </div>

            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-900 mt-2 font-serif">
              Certificado de Aprobación
            </h1>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">
              Programa de Formación Comercial Continua
            </p>

            <div className="my-6">
              <p className="text-xs sm:text-sm text-slate-600 italic">
                El presente documento certifica que
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-emerald-800 uppercase tracking-wide mt-2 border-b-2 border-emerald-600/30 pb-2 inline-block max-w-xl">
                {submission.fullName}
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                {submission.email}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-lg mx-auto">
              Ha demostrado competencia y dominio conceptual al aprobar satisfactoriamente la evaluación de:
            </p>

            <div className="my-4 p-3.5 bg-slate-50/90 rounded-xl border border-slate-200 inline-block max-w-lg">
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                Habilidades Comerciales de Alto Impacto
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Filosofía de Venta Personal (Dr. Rincón) • Pipeline de 5 Pasos B2B • Conversión Directa B2C
              </p>
            </div>

            {/* Score & Validation Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto my-6 text-left">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-500">Puntaje</div>
                <div className="text-base font-black text-emerald-700">
                  {submission.score} / {submission.totalQuestions}
                </div>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-500">Porcentaje</div>
                <div className="text-base font-black text-emerald-700">
                  {submission.percentage}%
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-2.5 bg-white rounded-lg border border-slate-200 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-500">Estado</div>
                <div className="text-base font-black text-emerald-700 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Aprobado
                </div>
              </div>
            </div>

            {/* Footer Signatures / Seal */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-600">
              <div className="text-center sm:text-left">
                <div className="font-serif italic font-bold text-slate-800 text-sm">
                  Dr. Rincón & Dirección Comercial
                </div>
                <div className="text-[11px] text-slate-500">
                  Capacitación y Talento Comercial CUN
                </div>
              </div>

              <div className="text-center sm:text-right font-mono text-[11px] text-slate-500">
                <div>Fecha de emisión: {submission.submittedAt}</div>
                <div>ID Verificación: {submission.id.substring(0, 13)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between print:hidden">
          <span className="text-xs text-slate-500">
            Puedes guardar este certificado como PDF usando el botón de impresión.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
