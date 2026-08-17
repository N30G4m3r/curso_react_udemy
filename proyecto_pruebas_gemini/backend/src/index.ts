import express, { Request, Response } from 'express';
import cors from 'cors';
import { convertUnits, UNITS_BY_CATEGORY, Category } from './converter.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Endpoint para obtener las unidades disponibles por categoría
app.get('/api/units', (_req: Request, res: Response) => {
  res.json(UNITS_BY_CATEGORY);
});

// Endpoint para realizar la conversión
app.post('/api/convert', (req: Request, res: Response) => {
  const { category, value, from, to } = req.body;

  if (!category || value === undefined || !from || !to) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos.' });
  }

  const numericValue = Number(value);
  if (isNaN(numericValue)) {
    return res.status(400).json({ error: 'El valor ingresado debe ser numérico.' });
  }

  try {
    const result = convertUnits(category as Category, numericValue, from, to);
    return res.json({
      category,
      originalValue: numericValue,
      from,
      to,
      result: Number(result.toFixed(6)), // Redondeo limpio a 6 decimales
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error interno';
    return res.status(400).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});