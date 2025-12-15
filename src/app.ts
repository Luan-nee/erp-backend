// src/app.ts
import express from "express";
import productRoutes from "./routes/product.routes";
import cors from "cors";

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
app.use("/api/products", productRoutes);

// Inicializar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Asegúrate de que tu DB esté inicializada con una tabla 'products'
  console.log(`Open http://localhost:${PORT}/api/products`);
});
