import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QuizSubmission, QuizQuestion } from '../types';
import {
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Printer,
  ExternalLink,
  BookOpen,
  Sparkles,
  TrendingUp,
  Mail,
  User,
  Clock,
} from 'lucide-react';

interface QuizResultsProps {
  submission: QuizSubmission;
  questions: QuizQuestion[];
  onRetake: () => void;
  onOpenCertificate: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  submission,
  questions,
  onRetake,
  onOpenCertificate,
}) => {
  useEffect(() => {
    if (submission.passed) {
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00A859', '#10B981', '#0284C7', '#F59E0B'],
        });
      } catch {
        // Fallback silently if confetti encounters any iframe sandbox issue
      }
    }
  }, [submission.passed]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Score Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Accent top stripe */}
        <div
          className={`h-3 ${
            submission.passed
              ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600'
              : 'bg-gradient-to-r from-amber-500 to-orange-600'
          }`}
        />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                Resultado Oficial de Evaluación
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {submission.passed
                  ? '¡Felicitaciones, Has Aprobado!'
                  : 'Capacitación Completada — Buen Esfuerzo'}
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                {submission.score === 4
                  ? '¡Excelente desempeño! Tienes un dominio total de la filosofía del Dr. Rincón y de las líneas B2B y B2C de la CUN.'
                  : submission.passed
                  ? '¡Has aprobado con éxito la evaluación comercial! Revisa a continuación el desglose para afianzar cada concepto.'
                  : 'Obtuviste menos de 3 aciertos. Te recomendamos repasar los 5 pasos del pipeline B2B y el orden de la venta personal.'}
              </p>
            </div>

            {/* Big Score Gauge */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200 shrink-0">
              <div className="text-right">
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Puntaje Total
                </div>
                <div className="text-4xl font-black text-emerald-600 flex items-baseline gap-1">
                  <span>{submission.score}</span>
                  <span className="text-xl text-slate-600">/ 4</span>
                </div>
              </div>
              <div className="sm:mt-2 text-xs font-black px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
                {submission.percentage}% Acierto
              </div>
            </div>
          </div>

          {/* Participant details bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-600" />
              <span className="font-semibold text-slate-800">{submission.fullName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-600" />
              <span className="truncate">{submission.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-600" />
              <span>{submission.submittedAt}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
            {submission.passed && (
              <button
                type="button"
                onClick={onOpenCertificate}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
              >
                <Award className="w-4 h-4" />
                Ver Certificado de Aprobación
              </button>
            )}

            <button
              type="button"
              onClick={onRetake}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-600" />
              Presentar Nuevo Intento
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              Imprimir Respuestas
            </button>

            <a
              href="https://habilidades-comerciales-cun.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors ml-auto"
            >
              <BookOpen className="w-4 h-4" />
              Ir al Sitio de Capacitación
              <ExternalLink className="w-3 h-3 text-slate-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Answers Detailed Review */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Revisión Detallada de Respuestas y Retroalimentación
          </h3>
          <span className="text-xs font-semibold text-slate-600">
            {submission.score} de 4 correctas
          </span>
        </div>

        {questions.map((q) => {
          const userAnswerId = submission.answers[q.id];
          const isCorrect = userAnswerId === q.correctOptionId;
          const userOption = q.options.find((opt) => opt.id === userAnswerId);
          const correctOption = q.options.find((opt) => opt.id === q.correctOptionId);

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 space-y-4 shadow-2xs transition-all ${
                isCorrect ? 'border-emerald-200' : 'border-red-200 bg-red-50/10'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      Pregunta {q.id}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${q.badgeColor}`}
                    >
                      {q.categoryLabel}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    {q.question}
                  </h4>
                </div>

                {/* Badge correct / incorrect */}
                <div className="shrink-0">
                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Correcta
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
                      <XCircle className="w-4 h-4 text-red-600" />
                      Incorrecta
                    </span>
                  )}
                </div>
              </div>

              {/* Answers Comparison */}
              <div className="space-y-2 pt-1 text-sm">
                <div
                  className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-red-50 border-red-200 text-red-950'
                  }`}
                >
                  <div className="mt-0.5 font-bold text-xs">
                    Tu respuesta:
                  </div>
                  <div className="flex-1">
                    <span className="font-bold">[{userAnswerId}] </span>
                    {userOption ? userOption.text : 'No respondida'}
                  </div>
                </div>

                {!isCorrect && correctOption && (
                  <div className="p-3 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                    <div className="mt-0.5 font-bold text-xs text-emerald-800">
                      Respuesta correcta:
                    </div>
                    <div className="flex-1">
                      <span className="font-bold">[{q.correctOptionId}] </span>
                      {correctOption.text}
                    </div>
                  </div>
                )}
              </div>

              {/* Training Explanation Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  Fundamento de la Capacitación CUN:
                </div>
                <p className="leading-relaxed text-slate-600">
                  {q.explanation}
                </p>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">Concepto clave:</span>
                  <span>{q.keyTakeaway}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
