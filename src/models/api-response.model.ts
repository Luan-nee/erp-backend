// src/models/api-response.model.ts

/**
 * Interfaz para estandarizar todas las respuestas exitosas de la API.
 * @template T El tipo de datos contenidos en el campo 'info'.
 */
export interface ApiResponse<T> {
  status: number; // Código HTTP (ej. 200, 201)
  message: string;
  info: T | null; // Puede ser un objeto, un array de objetos, o null/undefined.
}

/**
 * Interfaz para estandarizar las respuestas de error.
 */
export interface ApiErrorResponse {
  status: number; // Código HTTP de error (ej. 400, 404, 500)
  message: string;
  // 'info' puede omitirse o ser un objeto de detalles de error.
}
