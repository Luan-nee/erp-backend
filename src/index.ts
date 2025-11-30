import express from 'express';
import type { Request, Response } from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    // TypeScript nos ayuda con los tipos de 'req' y 'res'
    res.send('¡Hola, mundo! Esta es mi primera API con TypeScript y Express.');
});

// Ruta de ejemplo con un recurso (API RESTful)
app.get('/api/usuarios', (req: Request, res: Response) => {
    const usuarios = [
        { id: 1, nombre: 'Alice' },
        { id: 2, nombre: 'Bob' }
    ];
    res.json(usuarios);
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});