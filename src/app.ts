// src/app.ts
import express, { Request, Response, NextFunction } from "express";
import productRoutes from "./routes/product.routes";

// Crea la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de Express
app.use(express.json()); // Permite a Express parsear cuerpos JSON

// Rutas API
app.use("/api/products", productRoutes);

// Middleware de Manejo de Errores GLOBAL (el último en la pila)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Registra el error completo en la consola

  // Aquí puedes mapear tipos de errores específicos a códigos HTTP
  let statusCode = 500;

  if (err.message.includes("not found")) {
    statusCode = 404;
  }

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

// Inicializar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Asegúrate de que tu DB esté inicializada con una tabla 'products'
  console.log(`Open http://localhost:${PORT}/api/products`);
});
