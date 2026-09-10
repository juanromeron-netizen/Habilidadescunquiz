import React from 'react';
import { QuizSubmission } from '../types';
import { X, History, Trash2, CheckCircle2, XCircle, ArrowRight, Download } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: QuizSubmission[];
  onSelectSubmission: (submission: QuizSubmission) => void;
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  submissions,
  onSelectSubmission,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  const handleExportPersonalCSV = () => {
    if (submissions.length === 0) return;
    const headers = ['ID', 'Nombre', 'Correo', 'Línea', 'Puntaje', 'Total Preguntas', 'Porcentaje', 'Aprobado', 'Fecha'];
    const rows = submissions.map((s) => [
      `"${s.id}"`,
      `"${s.fullName.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.commercialLine || 'General'}"`,
      s.score,
      s.totalQuestions,
      `"${s.percentage}%"`,
      s.passed ? 'Aprobado' : 'No Aprobado',
      `"${s.submittedAt}"`,
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Mis_Intentos_Quiz_CUN_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              Mis Intentos Personales ({submissions.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {submissions.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <History className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-medium">Aún no hay intentos registrados en este navegador.</p>
              <p className="text-xs text-slate-400 mt-1">
                Completa el quiz para guardar tus resultados aquí.
              </p>
            </div>
          ) : (
            submissions.map((sub) => (
              <div
                key={sub.id}
                onClick={() => {
                  onSelectSubmission(sub);
                  onClose();
                }}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all cursor-pointer group flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {sub.fullName}
                    </span>
                    {sub.passed ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Aprobado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                        <XCircle className="w-3 h-3 text-red-600" /> No aprobado
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>{sub.email}</span>
                    <span>•</span>
                    <span>{sub.submittedAt}</span>
                    {sub.commercialLine && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-600 font-semibold">{sub.commercialLine}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-base font-black text-slate-900">
                      {sub.score}/{sub.totalQuestions}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {sub.percentage}%
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {submissions.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportPersonalCSV}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-white border border-slate-300 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Descargar intentos personales en CSV"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                Exportar CSV
              </button>
              <button
                type="button"
                onClick={onClearHistory}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Borrar
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
