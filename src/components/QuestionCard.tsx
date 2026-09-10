import React from 'react';
import { QuizQuestion } from '../types';
import { HelpCircle, AlertCircle, Check } from 'lucide-react';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedOptionId?: string;
  onSelectOption: (questionId: number, optionId: string) => void;
  showError: boolean;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
  showError,
  totalQuestions,
}) => {
  return (
    <div
      id={`question-card-${question.id}`}
      className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs overflow-hidden ${
        showError
          ? 'border-red-300 ring-2 ring-red-100'
          : selectedOptionId
          ? 'border-emerald-200 shadow-xs'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="p-5 sm:p-7 space-y-4">
        {/* Top bar: Question index and category badge */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
              Pregunta {question.id} de {totalQuestions}
            </span>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${question.badgeColor}`}
            >
              {question.categoryLabel}
            </span>
          </div>

          <span className="text-xs font-bold text-red-500 flex items-center gap-1">
            * <span className="font-normal text-slate-600">Obligatoria</span>
          </span>
        </div>

        {/* Question content */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {question.question}
          </h3>
          {question.contextHint && (
            <p className="text-xs text-slate-600 mt-1.5 flex items-start gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
              <span>{question.contextHint}</span>
            </p>
          )}
        </div>

        {/* Options list */}
        <div className="space-y-2.5 pt-1">
          {question.options.map((option) => {
            const isSelected = selectedOptionId === option.id;

            return (
              <label
                key={option.id}
                htmlFor={`q${question.id}-opt-${option.id}`}
                onClick={() => onSelectOption(question.id, option.id)}
                className={`group flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50/80 hover:border-slate-300'
                }`}
              >
                {/* Custom styled radio button */}
                <div className="pt-0.5 shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300 bg-white group-hover:border-slate-400'
                    }`}
                  >
                    {isSelected ? (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    ) : (
                      <span className="text-[10px] font-bold text-slate-600 group-hover:text-slate-600">
                        {option.id}
                      </span>
                    )}
                  </div>
                </div>

                {/* Option Text & Detail */}
                <div className="flex-1">
                  <div
                    className={`text-sm font-semibold transition-colors ${
                      isSelected ? 'text-emerald-950' : 'text-slate-800'
                    }`}
                  >
                    {option.text}
                  </div>
                  {option.detail && (
                    <div
                      className={`text-xs mt-0.5 transition-colors ${
                        isSelected ? 'text-emerald-800' : 'text-slate-600'
                      }`}
                    >
                      {option.detail}
                    </div>
                  )}
                </div>

                {/* Hidden input for semantics / accessibility */}
                <input
                  type="radio"
                  id={`q${question.id}-opt-${option.id}`}
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={isSelected}
                  onChange={() => onSelectOption(question.id, option.id)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>

        {/* Validation Error Message */}
        {showError && (
          <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            Por favor selecciona una respuesta para esta pregunta.
          </div>
        )}
      </div>
    </div>
  );
};
