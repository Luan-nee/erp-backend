// src/app.ts
import express, { NextFunction } from "express";
import { ApiResponse } from "./models/api-response.model";
import { Request, Response } from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import categoriaRoutes from "./routes/categoria.routes";
import marcaRoutes from "./routes/marca.routes";
import colorRoutes from "./routes/color.routes";

// Crea la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:5173", // Reemplaza con el origen de tu frontend
}

app.use(cors(corsOptions));

// Middleware de Express
app.use(express.json()); // Permite a Express parsear cuerpos JSON

// Rutas API
app.use("/api/productos", productRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/marcas", marcaRoutes);
app.use("/api/colores", colorRoutes);

// Inicializar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Asegúrate de que tu DB esté inicializada con una tabla 'products'
  console.log(`Open http://localhost:${PORT}`);
});

/**
 * MIDDLEWARE GLOBAL DE ERRORES
 * Este es el lugar exacto donde transformamos cualquier error 
 * al formato estandarizado que solicitas.
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // 1. Determinamos el código de estado (por defecto 500 si no viene definido)
    const statusCode = err.status || 500;
    
    // 2. Construimos la respuesta siguiendo tu estructura exacta
    const responseBody: ApiResponse<any[]> = {
        status: statusCode,
        message: err.message || "Ocurrió un error inesperado en el servidor",
        info: [] // Como es un error, retornamos el array vacío como pides
    };

    console.log('❌ Error manejado por el middleware global:', err.message);

    // 3. Enviamos la respuesta
    res.status(statusCode).json(responseBody);
});
