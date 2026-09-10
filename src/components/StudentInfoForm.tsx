import React from 'react';
import { User, Mail, Briefcase, AlertCircle, CheckCircle } from 'lucide-react';

interface StudentInfoFormProps {
  fullName: string;
  setFullName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  commercialLine: 'B2B' | 'B2C' | 'Ambas' | 'General';
  setCommercialLine: (line: 'B2B' | 'B2C' | 'Ambas' | 'General') => void;
  hasAttemptedSubmit: boolean;
}

export const StudentInfoForm: React.FC<StudentInfoFormProps> = ({
  fullName,
  setFullName,
  email,
  setEmail,
  commercialLine,
  setCommercialLine,
  hasAttemptedSubmit,
}) => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isNameValid = fullName.trim().length >= 3;

  const showNameError = hasAttemptedSubmit && !isNameValid;
  const showEmailError = hasAttemptedSubmit && !isEmailValid;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all">
      {/* Top Google Forms style colored accent stripe */}
      <div className="h-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600" />

      <div className="p-5 sm:p-7 space-y-6">
        {/* Header inside card */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Módulo de Evaluación • CUN
            </span>
            <span className="text-xs text-slate-600 font-medium">
              4 Preguntas • Opción Múltiple
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Evaluación: Habilidades Comerciales
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Bienvenido(a) a la prueba rápida de conocimientos sobre la capacitación comercial de la CUN. 
            Esta evaluación comprende los conceptos clave explicados por el <strong>Doctor Rincón</strong>, 
            el pipeline de <strong>5 pasos de la venta B2B</strong> y el modelo de conversión directa <strong>B2C</strong>.
          </p>
        </div>

        {/* Required indicator banner */}
        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
          <span className="font-medium">
            * Indica que la pregunta o campo es obligatorio
          </span>
          <span className="font-bold text-amber-800">
            Aprobación: 3/4 o más
          </span>
        </div>

        <div className="border-t border-slate-100 pt-5 space-y-5">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600" />
            Datos del Asesor / Participante
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre Completo */}
            <div>
              <label 
                htmlFor="fullName" 
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Nombre y Apellidos <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej: Juan Romero N."
                  className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 transition-colors focus:bg-white focus:outline-hidden ${
                    showNameError
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : isNameValid
                      ? 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                      : 'border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                  }`}
                />
                <User className="w-4 h-4 text-slate-600 absolute left-3.5 top-3" />
                {isNameValid && (
                  <CheckCircle className="w-4 h-4 text-emerald-600 absolute right-3.5 top-3" />
                )}
              </div>
              {showNameError && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" /> Por favor ingresa tu nombre completo (mínimo 3 caracteres).
                </p>
              )}
            </div>

            {/* Correo Electrónico */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@cun.edu.co"
                  className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 transition-colors focus:bg-white focus:outline-hidden ${
                    showEmailError
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : isEmailValid
                      ? 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                      : 'border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                  }`}
                />
                <Mail className="w-4 h-4 text-slate-600 absolute left-3.5 top-3" />
                {isEmailValid && (
                  <CheckCircle className="w-4 h-4 text-emerald-600 absolute right-3.5 top-3" />
                )}
              </div>
              {showEmailError && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" /> Por favor ingresa un correo electrónico válido.
                </p>
              )}
            </div>
          </div>

          {/* Línea Comercial / Perfil */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Línea Comercial de tu Interés / Desempeño
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(
                [
                  { id: 'B2B', label: 'Línea 1 • B2B', sub: 'Corporativo' },
                  { id: 'B2C', label: 'Línea 2 • B2C', sub: 'Digital y Sedes' },
                  { id: 'Ambas', label: 'Ambas Líneas', sub: 'B2B y B2C' },
                  { id: 'General', label: 'Equipo CUN', sub: 'General' },
                ] as const
              ).map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => setCommercialLine(option.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    commercialLine === option.id
                      ? 'bg-emerald-50/80 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold">{option.label}</div>
                  <div className="text-[11px] text-slate-600">{option.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
