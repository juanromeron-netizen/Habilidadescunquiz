import React, { useState, useMemo } from 'react';
import { QuizSubmission, QuizQuestion } from '../types';
import {
  ShieldCheck,
  X,
  Download,
  Search,
  CheckCircle2,
  XCircle,
  Users,
  Award,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Eye,
  Trash2,
  Clock,
  Mail,
  BookOpen,
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: QuizSubmission[];
  questions: QuizQuestion[];
  onRefresh: () => void;
  onDeleteSubmission?: (id: string) => void;
  onClearAll?: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  submissions,
  questions,
  onRefresh,
  onDeleteSubmission,
  onClearAll,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'passed' | 'failed'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<QuizSubmission | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Direct access for owner convenience
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Statistics
  const stats = useMemo(() => {
    const total = submissions.length;
    if (total === 0) {
      return {
        total: 0,
        passedCount: 0,
        passRate: 0,
        averageScore: 0,
        averagePercentage: 0,
        questionAccuracy: {} as Record<number, number>,
      };
    }

    const passedCount = submissions.filter((s) => s.passed).length;
    const passRate = Math.round((passedCount / total) * 100);
    const totalScore = submissions.reduce((acc, curr) => acc + curr.score, 0);
    const averageScore = +(totalScore / total).toFixed(1);
    const averagePercentage = Math.round((averageScore / 4) * 100);

    // Question-by-question accuracy
    const questionAccuracy: Record<number, number> = {};
    questions.forEach((q) => {
      const correctCount = submissions.filter((s) => s.answers && s.answers[q.id] === q.correctOptionId).length;
      questionAccuracy[q.id] = Math.round((correctCount / total) * 100);
    });

    return {
      total,
      passedCount,
      passRate,
      averageScore,
      averagePercentage,
      questionAccuracy,
    };
  }, [submissions, questions]);

  // Filtered submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      const matchesSearch =
        s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.commercialLine && s.commercialLine.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        filterStatus === 'all'
          ? true
          : filterStatus === 'passed'
          ? s.passed
          : !s.passed;

      return matchesSearch && matchesStatus;
    });
  }, [submissions, searchTerm, filterStatus]);

  if (!isOpen) return null;

  const handleExportCSV = () => {
    if (submissions.length === 0) {
      alert('No hay resultados para exportar.');
      return;
    }

    const headers = [
      'ID',
      'Nombre y Apellidos',
      'Correo Institucional',
      'Línea Comercial',
      'Puntaje',
      'Total Preguntas',
      'Porcentaje',
      'Estado',
      'P1 (Dr. Rincón)',
      'P2 (5 Pasos B2B)',
      'P3 (Enfoque B2C)',
      'P4 (B2B vs B2C)',
      'Fecha y Hora',
    ];

    const rows = submissions.map((s) => [
      `"${s.id}"`,
      `"${s.fullName.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.commercialLine || 'General'}"`,
      s.score,
      s.totalQuestions,
      `"${s.percentage}%"`,
      s.passed ? 'Aprobado' : 'No Aprobado',
      s.answers[1] || '',
      s.answers[2] || '',
      s.answers[3] || '',
      s.answers[4] || '',
      `"${s.submittedAt}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CUN_Resultados_Quiz_Comercial_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-slate-50 rounded-2xl w-full max-w-5xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  Panel del Evaluador / Dueño
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  juan_romeron@cun.edu.co
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                Consola de Resultados y Métricas CUN
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRefresh}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700"
              title="Recargar respuestas recibidas"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Actualizar</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-xs"
              title="Descargar archivo Excel con notas de todos los participantes"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Excel / CSV</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Metric Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Total Evaluated */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Participantes
                </span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">
                {stats.total}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Evaluaciones registradas
              </div>
            </div>

            {/* Pass Rate */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Tasa Aprobación
                </span>
                <Award className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-700 mt-2">
                {stats.passRate}%
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {stats.passedCount} de {stats.total} aprobados
              </div>
            </div>

            {/* Average Score */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Promedio Nota
                </span>
                <TrendingUp className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">
                {stats.averageScore} <span className="text-base text-slate-400">/ 4.0</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {stats.averagePercentage}% rendimiento medio
              </div>
            </div>

            {/* Performance Level */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Nivel del Grupo
                </span>
                <BarChart3 className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-purple-700 mt-2">
                {stats.passRate >= 80 ? 'Sobresaliente' : stats.passRate >= 60 ? 'Competente' : stats.total === 0 ? 'Sin Datos' : 'Requiere Refuerzo'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Basado en meta CUN (≥75%)
              </div>
            </div>
          </div>

          {/* Question-by-Question Accuracy Breakdown */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              Efectividad por Pregunta Evaluada
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              {questions.map((q) => {
                const acc = stats.questionAccuracy[q.id] || 0;
                return (
                  <div key={q.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between text-slate-700 mb-1">
                      <span className="font-bold">P{q.id}: {q.title.split(':')[1] || q.title}</span>
                      <span className={`font-black ${acc >= 75 ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {acc}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${acc >= 75 ? 'bg-emerald-600' : acc >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${acc}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                      {q.category === 'dr_rincon' ? 'Dr. Rincón: 1° Yo, 2° Empresa, 3° Producto' : q.category === 'b2b' ? '5 Fases de Pipeline B2B' : q.category === 'b2c' ? 'Conversión directa B2C' : 'Diferencia B2B vs B2C'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Search, Filter and Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Buscar por nombre o correo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-white text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setFilterStatus('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    filterStatus === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Todos ({submissions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus('passed')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    filterStatus === 'passed'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  Aprobados ({stats.passedCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus('failed')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    filterStatus === 'failed'
                      ? 'bg-red-600 text-white'
                      : 'text-slate-600 hover:text-red-700'
                  }`}
                >
                  No Aprobados ({stats.total - stats.passedCount})
                </button>
              </div>

              {submissions.length > 0 && onClearAll && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors border border-transparent hover:border-red-200 cursor-pointer"
                  title="Reiniciar lista de evaluaciones"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Submissions Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Participante</th>
                    <th className="px-4 py-3">Línea</th>
                    <th className="px-4 py-3 text-center">Puntaje</th>
                    <th className="px-4 py-3 text-center">Estado</th>
                    <th className="px-4 py-3">Fecha</th>
                    <th className="px-4 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                        No se encontraron resultados para los filtros seleccionados.
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Name and email */}
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900">{sub.fullName}</div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {sub.email}
                          </div>
                        </td>

                        {/* Commercial Line */}
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                            {sub.commercialLine || 'General'}
                          </span>
                        </td>

                        {/* Score */}
                        <td className="px-4 py-3 text-center">
                          <div className="font-black text-sm text-slate-900">
                            {sub.score} / 4
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {sub.percentage}%
                          </div>
                        </td>

                        {/* Pass / Fail */}
                        <td className="px-4 py-3 text-center">
                          {sub.passed ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Aprobado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                              <XCircle className="w-3 h-3 text-red-600" /> No aprobado
                            </span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                          {sub.submittedAt}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedSubmission(sub)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                              title="Ver respuestas individuales"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Ver
                            </button>
                            {onDeleteSubmission && (
                              <button
                                type="button"
                                onClick={() => onDeleteSubmission(sub.id)}
                                className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Eliminar registro"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Base de datos sincronizada en tiempo real con el servidor CUN.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Cerrar Panel
          </button>
        </div>
      </div>

      {/* Individual Submission Detail Sub-Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold">Detalle de Examen</h4>
                <p className="text-xs text-slate-400">
                  {selectedSubmission.fullName} ({selectedSubmission.email})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="font-bold text-slate-800">Calificación: </span>
                  <span className="text-base font-black text-emerald-700">
                    {selectedSubmission.score} / 4 ({selectedSubmission.percentage}%)
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">{selectedSubmission.submittedAt}</span>
                </div>
              </div>

              <div className="space-y-3">
                {questions.map((q) => {
                  const userAns = selectedSubmission.answers[q.id];
                  const isCorrect = userAns === q.correctOptionId;
                  const selectedOpt = q.options.find((o) => o.id === userAns);
                  const correctOpt = q.options.find((o) => o.id === q.correctOptionId);

                  return (
                    <div
                      key={q.id}
                      className={`p-3.5 rounded-xl border ${
                        isCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-red-200 bg-red-50/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-slate-800">
                          {q.id}. {q.title}
                        </span>
                        {isCorrect ? (
                          <span className="font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correcto
                          </span>
                        ) : (
                          <span className="font-bold text-red-700 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Incorrecto
                          </span>
                        )}
                      </div>
                      <div className="text-slate-600 mb-1.5">{q.question}</div>
                      <div className="p-2 rounded bg-white border border-slate-200 space-y-1">
                        <div>
                          <span className="font-semibold text-slate-700">Marcó: </span>
                          <span className={isCorrect ? 'text-emerald-800 font-bold' : 'text-red-800 font-bold'}>
                            [{userAns}] {selectedOpt ? selectedOpt.text : 'Sin respuesta'}
                          </span>
                        </div>
                        {!isCorrect && correctOpt && (
                          <div className="text-emerald-800 font-semibold pt-1 border-t border-slate-100">
                            <span>Respuesta correcta: </span>
                            <span>[{q.correctOptionId}] {correctOpt.text}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
