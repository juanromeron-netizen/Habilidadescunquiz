import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'dr_rincon',
    categoryLabel: 'Filosofía Comercial • Dr. Rincón',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    title: 'Pregunta 1: El Orden de la Venta Personal',
    question: 'Según el Doctor Rincón, ¿cuál es el orden correcto en el que uno debe venderse?',
    contextHint: 'Recuerda el principio fundamental de conexión humana y generación de confianza antes de hablar del portafolio.',
    options: [
      {
        id: 'A',
        text: 'Primero yo, luego la empresa y luego el producto',
        detail: 'Generar credibilidad personal, respaldar con la solidez de la CUN y presentar la oferta académica.',
      },
      {
        id: 'B',
        text: 'Primero el producto, luego la empresa y finalmente yo',
        detail: 'Explicar las características técnicas de la carrera antes de presentarte.',
      },
      {
        id: 'C',
        text: 'Primero la empresa, luego el producto y después yo',
        detail: 'Hablar de la historia de la CUN, sus sedes y de último quién eres.',
      },
      {
        id: 'D',
        text: 'Primero el producto, luego yo y al final la empresa',
        detail: 'Enfocarse en el precio del semestre, tus datos y dejar la institución al final.',
      },
    ],
    correctOptionId: 'A',
    explanation:
      '¡Correcto! El Dr. Rincón enfatiza que nadie compra un producto ni confía en una institución si primero no confía en la persona que le está hablando. La regla de oro es: 1° Véndete tú (empatía, seguridad, pulcritud y confianza), 2° Vende la empresa (respaldo institucional, acreditación y trayectoria de la CUN), y 3° Vende el producto (el programa académico, ciclos propedéuticos y facilidades de pago).',
    keyTakeaway: '“Primero yo, luego la empresa y luego el producto”. La confianza humana abre la puerta comercial.',
  },
  {
    id: 2,
    category: 'b2b',
    categoryLabel: 'Línea 1 • Pipeline B2B Corporativo',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    title: 'Pregunta 2: Los 5 Pasos de la Venta B2B',
    question: '¿Cuáles son los 5 pasos o fases del proceso comercial B2B (Corporativo) vistos en la capacitación?',
    contextHint: 'Corresponde a la ruta estructurada para cerrar convenios marco con empresas e instituciones.',
    options: [
      {
        id: 'A',
        text: '1. Prospección Estratégica, 2. Primer Contacto, 3. Presentación de Valor, 4. Negociación y Cierre, 5. Mantenimiento Activo',
        detail: 'Desde el targeting a gerentes de RRHH hasta la cosecha continua de matrículas en días de pago.',
      },
      {
        id: 'B',
        text: '1. Venta en frío, 2. Envío de catálogo, 3. Cobro de matrícula, 4. Facturación, 5. Despedida',
        detail: 'Proceso transaccional rápido sin seguimiento ni alianzas institucionales.',
      },
      {
        id: 'C',
        text: '1. Publicidad en redes sociales, 2. Formulario web, 3. Llamada telefónica, 4. Pago en línea, 5. Registro automático',
        detail: 'Embudo de conversión digital tradicional enfocado a usuarios individuales.',
      },
      {
        id: 'D',
        text: '1. Visita sin cita previa, 2. Discusión de tarifas, 3. Firma inmediata, 4. Entrega de folletos, 5. Fin de la alianza',
        detail: 'Abordaje directo en ventanilla sin diagnóstico de necesidades laborales.',
      },
    ],
    correctOptionId: 'A',
    explanation:
      '¡Exacto! El pipeline B2B de la CUN está compuesto por 5 fases estratégicas: 1. Prospección Estratégica (identificar empresas con alta rotación operativa), 2. Primer Contacto (romper el hielo con el hook de bienestar y plan de carrera), 3. Presentación de Valor (demostrar los ciclos propedéuticos y modalidad virtual 24/7), 4. Negociación y Cierre (firma ágil del convenio marco sin costo para la empresa), y 5. Mantenimiento Activo (stands en quincenas, email marketing interno y seguimiento con bienestar laboral).',
    keyTakeaway: 'Prospección ➔ Primer Contacto ➔ Presentación de Valor ➔ Negociación y Cierre ➔ Mantenimiento Activo.',
  },
  {
    id: 3,
    category: 'b2c',
    categoryLabel: 'Línea 2 • Conversión Directa B2C',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    title: 'Pregunta 3: El Enfoque de la Línea B2C',
    question: 'En la capacitación, ¿cuál es el objetivo y habilidad clave de la Línea B2C (Digital, Call Center y Sedes)?',
    contextHint: 'Piensa en el arquetipo del asesor “Francotirador” que atiende al aspirante en el momento caliente.',
    options: [
      {
        id: 'A',
        text: 'Velocidad de respuesta, empatía, sondeo activo de necesidades y acompañamiento directo al aspirante en su matrícula',
        detail: 'Conectar emocionalmente, resolver dudas de tiempo/dinero y guiarlo en el pago de su primer recibo.',
      },
      {
        id: 'B',
        text: 'Negociar pliegos de condiciones y contratos de licitación pública con alcaldías y gobernaciones',
        detail: 'Gestión documental de contratos estatales de largo aliento.',
      },
      {
        id: 'C',
        text: 'Esperar pasivamente a que el estudiante investigue solo y se matricule sin ninguna interacción humana',
        detail: 'Dejar el proceso 100% automático sin asesoría vocacional.',
      },
      {
        id: 'D',
        text: 'Hacer únicamente visitas a empresas para convencer a gerentes generales en reuniones de 1 hora',
        detail: 'Gestión enfocada exclusivamente en mesas directivas corporativas.',
      },
    ],
    correctOptionId: 'A',
    explanation:
      '¡Muy bien! En B2C (Business to Consumer), el tiempo es oro: responder rápido a los leads digitales, escuchar con empatía los sueños y miedos del aspirante (financieros o de tiempo), demoler objeciones con opciones de financiación directa y guiarlo hasta la inscripción exitosa.',
    keyTakeaway: 'B2C es velocidad, empatía profunda, diagnóstico vocacional y cierre inmediato.',
  },
  {
    id: 4,
    category: 'comparativa',
    categoryLabel: 'Estrategia Comercial • B2B vs B2C',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    title: 'Pregunta 4: Diferencia Esencial entre B2B y B2C',
    question: 'Considerando que en la capacitación nos enfocamos en B2B y B2C, ¿cuál es la diferencia fundamental entre ambos modelos?',
    contextHint: 'Observa a quién le vendes: ¿a una organización para volumen o al usuario final individual?',
    options: [
      {
        id: 'A',
        text: 'B2B es venta corporativa consultiva para generar convenios institucionales de volumen, mientras que B2C es venta directa e individual al aspirante',
        detail: 'B2B siembra con directivos de RRHH para cosechar decenas de matrículas; B2C acompaña al estudiante caso a caso.',
      },
      {
        id: 'B',
        text: 'B2B solo se comercializa en moneda extranjera y B2C únicamente en pesos colombianos',
        detail: 'Diferenciación basada erróneamente en divisas de pago.',
      },
      {
        id: 'C',
        text: 'B2B es para estudiantes de posgrado y maestría, y B2C es exclusivamente para cursos de idiomas',
        detail: 'Diferenciación por nivel educativo en vez del canal de comercialización.',
      },
      {
        id: 'D',
        text: 'No existe ninguna diferencia; ambos canales aplican exactamente los mismos guiones y tiempos de cierre',
        detail: 'Tratar a una empresa exactamente igual que a un aspirante en WhatsApp.',
      },
    ],
    correctOptionId: 'A',
    explanation:
      '¡Excelente! B2B (Business to Business) se enfoca en crear relaciones con empresas, cajas de compensación y fondos para beneficiar a sus colaboradores en masa. B2C (Business to Consumer) se centra en el contacto directo con cada aspirante que solicita información para estudiar en la CUN.',
    keyTakeaway: 'B2B = Alianzas corporativas de volumen. B2C = Conversión directa y personalizada con el aspirante.',
  },
];
