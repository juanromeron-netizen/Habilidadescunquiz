# Quiz de Capacitación en Habilidades Comerciales - CUN

Aplicación web interactiva para la evaluación formativa del equipo comercial de la **Corporación Unificada Nacional de Educación Superior (CUN)**, basada en el material de formación: [Habilidades Comerciales CUN](https://habilidades-comerciales-cun.vercel.app/).

## 🎯 Contenido Pedagógico Evaluado

1. **Filosofía del Dr. Rincón:** ¿Quién debe venderse primero? (*1° Yo, 2° La Empresa, 3° El Producto*).
2. **Los 5 Pasos del Pipeline B2B:** Prospección → Calificación → Propuesta de Valor → Negociación → Cierre.
3. **Fundamentos B2C:** Ciclos cortos, persuasión ágil, conversión emocional y venta directa.
4. **Diferenciación Estratégica:** Comparativa entre venta a empresas (B2B) y venta a consumidor final (B2C).

---

## 🚀 Características Principales

- **Formulario de Registro:** Captura de Nombre Completo, Correo Institucional CUN y Línea Comercial (B2B, B2C, Ambas).
- **Retroalimentación Inmediata:** Explicación detallada de respuestas correctas e incorrectas al finalizar el quiz.
- **Certificado Digital de Aprobación:** Generación de certificado descargable e imprimible para puntajes ≥ 75% (3 de 4 aciertos).
- **Panel del Evaluador / Dueño:**
  - Métricas de grupo (total participantes, tasa de aprobación, promedio de calificaciones).
  - Efectividad desglosada por cada pregunta.
  - Tabla interactiva con búsqueda por nombre o correo y visor de examen individual.
  - **Exportación en 1 clic a Excel / CSV** con codificación UTF-8 compatible con Microsoft Excel y Google Sheets.

---

## 🛠️ Requisitos e Instalación Local

### Requisitos previos
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm o yarn

### Pasos para ejecutar localmente

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   cd TU_REPOSITORIO
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor en modo desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4. **Compilar para producción:**
   ```bash
   npm run build
   npm start
   ```

---

## 📂 Estructura del Proyecto

```
├── data/
│   └── submissions.json       # Base de datos local de respuestas del servidor
├── src/
│   ├── components/            # Componentes UI (Formulario, Tarjetas, Modales, Dashboard)
│   ├── data/
│   │   └── quizQuestions.ts   # Banco de preguntas y respuestas oficiales
│   ├── App.tsx                # Lógica principal y conexión cliente-servidor
│   ├── types.ts               # Definiciones de TypeScript
│   └── main.tsx               # Punto de entrada React
├── server.ts                  # Servidor Express con endpoints de persistencia y exportación CSV
├── index.html                 # Plantilla HTML con estilos
└── package.json               # Dependencias y scripts
```

---

© 2026 Corporación Unificada Nacional de Educación Superior (CUN).
