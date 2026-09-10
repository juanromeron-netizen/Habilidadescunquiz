import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');

// Ensure data folder and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadSubmissions(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading submissions:', err);
    return [];
  }
}

function saveSubmissions(submissions: any[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving submissions:', err);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API: Get all submissions
  app.get('/api/submissions', (_req, res) => {
    const data = loadSubmissions();
    res.json({ success: true, count: data.length, data });
  });

  // API: Post a new submission
  app.post('/api/submissions', (req, res) => {
    const submission = req.body;
    if (!submission || !submission.fullName || !submission.email) {
      res.status(400).json({ success: false, error: 'Nombre y correo son requeridos.' });
      return;
    }

    const data = loadSubmissions();
    // Add new submission at the top
    const updated = [submission, ...data];
    saveSubmissions(updated);

    res.json({ success: true, message: 'Evaluación registrada en el servidor.', submission });
  });

  // API: Delete a submission
  app.delete('/api/submissions/:id', (req, res) => {
    const { id } = req.params;
    const data = loadSubmissions();
    const updated = data.filter((s: any) => s.id !== id);
    saveSubmissions(updated);
    res.json({ success: true, count: updated.length });
  });

  // API: Clear all submissions
  app.delete('/api/submissions', (_req, res) => {
    saveSubmissions([]);
    res.json({ success: true, count: 0 });
  });

  // API: Export to CSV (with UTF-8 BOM for Excel support)
  app.get('/api/export-csv', (_req, res) => {
    const data = loadSubmissions();
    const headers = ['ID', 'Nombre', 'Correo', 'Línea Comercial', 'Puntaje', 'Total Preguntas', 'Porcentaje', 'Aprobado', 'Fecha'];
    
    const rows = data.map((s: any) => [
      `"${s.id || ''}"`,
      `"${(s.fullName || '').replace(/"/g, '""')}"`,
      `"${(s.email || '').replace(/"/g, '""')}"`,
      `"${s.commercialLine || 'General'}"`,
      s.score,
      s.totalQuestions,
      `"${s.percentage}%"`,
      s.passed ? 'Aprobado' : 'No Aprobado',
      `"${s.submittedAt || ''}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="Resultados_Quiz_CUN_${Date.now()}.csv"`);
    res.send(csvContent);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
