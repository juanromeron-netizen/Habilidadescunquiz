/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { QUIZ_QUESTIONS } from './data/quizQuestions';
import { QuizSubmission, QuizView } from './types';
import { Header } from './components/Header';
import { StudentInfoForm } from './components/StudentInfoForm';
import { QuestionCard } from './components/QuestionCard';
import { QuizResults } from './components/QuizResults';
import { CertificateModal } from './components/CertificateModal';
import { HistoryModal } from './components/HistoryModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import {
  Send,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Download,
  Users,
} from 'lucide-react';

const STORAGE_KEY = 'cun_commercial_quiz_submissions_v1';

export default function App() {
  // Participant Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [commercialLine, setCommercialLine] = useState<'B2B' | 'B2C' | 'Ambas' | 'General'>('Ambas');

  // Quiz State
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [currentView, setCurrentView] = useState<QuizView>('form');
  const [currentSubmission, setCurrentSubmission] = useState<QuizSubmission | null>(null);

  // Stored Submissions History (Local browser)
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  // Central Server Submissions (For Quiz Owner / Evaluator)
  const [serverSubmissions, setServerSubmissions] = useState<QuizSubmission[]>([]);

  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Fetch centralized submissions from backend server
  const fetchServerSubmissions = useCallback(async () => {
    try {
      const res = await fetch('/api/submissions');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setServerSubmissions(json.data);
        }
      }
    } catch (err) {
      console.warn('Could not load server submissions, working in local mode:', err);
    }
  }, []);

  useEffect(() => {
    fetchServerSubmissions();
  }, [fetchServerSubmissions]);

  // Load local personal history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSubmissions(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  // Save history helper
  const saveSubmissions = (newSubmissions: QuizSubmission[]) => {
    setSubmissions(newSubmissions);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSubmissions));
    } catch {
      // Ignore
    }
  };

  const handleSelectOption = (questionId: number, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = QUIZ_QUESTIONS.length;
  const isAllAnswered = answeredCount === totalQuestions;
  const isNameValid = fullName.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (!isNameValid || !isEmailValid || !isAllAnswered) {
      // Find first unanswered question or field to scroll to
      if (!isNameValid || !isEmailValid) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      for (const q of QUIZ_QUESTIONS) {
        if (!answers[q.id]) {
          const el = document.getElementById(`question-card-${q.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          break;
        }
      }
      return;
    }

    // Calculate score
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctOptionId) {
        score += 1;
      }
    });

    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = score >= 3; // 3 out of 4 is 75%+

    const newSubmission: QuizSubmission = {
      id: 'cun-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      commercialLine,
      answers: { ...answers },
      score,
      totalQuestions,
      percentage,
      passed,
      submittedAt: new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // Save locally
    const updatedLocal = [newSubmission, ...submissions];
    saveSubmissions(updatedLocal);

    // Save to central server so the quiz owner can view and download all responses
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubmission),
      });
      if (res.ok) {
        fetchServerSubmissions();
      }
    } catch (err) {
      console.error('Error saving to server:', err);
    }

    setCurrentSubmission(newSubmission);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteServerSubmission = async (id: string) => {
    if (!window.confirm('¿Deseas eliminar este registro de la base de datos?')) return;
    try {
      const res = await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServerSubmissions((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error('Error deleting submission:', err);
    }
  };

  const handleClearAllServerSubmissions = async () => {
    if (!window.confirm('¿ATENCIÓN: Deseas borrar TODOS los registros acumulados en el servidor?')) return;
    try {
      const res = await fetch('/api/submissions', { method: 'DELETE' });
      if (res.ok) {
        setServerSubmissions([]);
      }
    } catch (err) {
      console.error('Error clearing submissions:', err);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setHasAttemptedSubmit(false);
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearForm = () => {
    if (window.confirm('¿Estás seguro de que deseas limpiar el formulario y borrar las respuestas actuales?')) {
      setAnswers({});
      setHasAttemptedSubmit(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('¿Deseas eliminar todo tu historial personal de intentos guardados en este navegador?')) {
      saveSubmissions([]);
    }
  };

  const handleSelectFromHistory = (sub: QuizSubmission) => {
    setCurrentSubmission(sub);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header
        attemptCount={submissions.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onResetToForm={handleRetake}
        currentView={currentView}
        onOpenAdmin={() => setIsAdminOpen(true)}
        totalServerSubmissions={serverSubmissions.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Notice for the owner/evaluator to access their panel */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-700">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Acceso Dueño / Evaluador
                </span>
                <span className="text-xs text-slate-300">
                  {serverSubmissions.length} respuestas recopiladas
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Consulta en vivo las notas de los participantes, efectividad por pregunta y descarga el reporte en Excel/CSV.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAdminOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Ver Panel de Resultados</span>
          </button>
        </div>

        {currentView === 'form' ? (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Participant info form card */}
            <StudentInfoForm
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              commercialLine={commercialLine}
              setCommercialLine={setCommercialLine}
              hasAttemptedSubmit={hasAttemptedSubmit}
            />

            {/* Questions list */}
            <div className="space-y-4">
              {QUIZ_QUESTIONS.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  selectedOptionId={answers[question.id]}
                  onSelectOption={handleSelectOption}
                  showError={hasAttemptedSubmit && !answers[question.id]}
                  totalQuestions={totalQuestions}
                />
              ))}
            </div>

            {/* Bottom Sticky Floating Progress & Submit bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Progress counter */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-200">
                  {answeredCount}/{totalQuestions}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    {isAllAnswered ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ¡Todas las preguntas respondidas!
                      </span>
                    ) : (
                      <span>{answeredCount} de {totalQuestions} preguntas respondidas</span>
                    )}
                  </div>
                  <div className="w-36 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 transition-all duration-300"
                      style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {answeredCount > 0 && (
                  <button
                    type="button"
                    onClick={handleClearForm}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                  >
                    Borrar formulario
                  </button>
                )}

                <button
                  type="submit"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Enviar Evaluación
                </button>
              </div>
            </div>

            {/* Error banner if submit was attempted with missing fields */}
            {hasAttemptedSubmit && (!isNameValid || !isEmailValid || !isAllAnswered) && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>
                  Por favor completa todos los campos obligatorios (*) y responde las 4 preguntas antes de enviar la evaluación.
                </span>
              </div>
            )}
          </form>
        ) : (
          /* Results View */
          currentSubmission && (
            <QuizResults
              submission={currentSubmission}
              questions={QUIZ_QUESTIONS}
              onRetake={handleRetake}
              onOpenCertificate={() => setIsCertificateOpen(true)}
            />
          )
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-700">
            Corporación Unificada Nacional de Educación Superior (CUN) • Habilidades Comerciales de Alto Impacto
          </p>
          <p className="text-slate-400">
            Basado en la capacitación oficial sobre el Dr. Rincón, Prospección B2B y Conversión B2C.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <a
              href="https://habilidades-comerciales-cun.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-600 transition-colors inline-flex items-center gap-1"
            >
              Portal de Capacitación CUN <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://cun.edu.co"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-600 transition-colors inline-flex items-center gap-1"
            >
              cun.edu.co <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Certificate Modal */}
      {currentSubmission && (
        <CertificateModal
          submission={currentSubmission}
          isOpen={isCertificateOpen}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      {/* History Modal (Personal attempts) */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        submissions={submissions}
        onSelectSubmission={handleSelectFromHistory}
        onClearHistory={handleClearHistory}
      />

      {/* Admin Dashboard Modal (For Owner / Teacher / Evaluator) */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        submissions={serverSubmissions}
        questions={QUIZ_QUESTIONS}
        onRefresh={fetchServerSubmissions}
        onDeleteSubmission={handleDeleteServerSubmission}
        onClearAll={handleClearAllServerSubmissions}
      />
    </div>
  );
}
