// src/services/product.service.ts
import { Product } from '../models/producto.model';
import { ProductRepository } from '../repositories/productos.repository';

// Instanciamos el repositorio para usarlo
const productRepository = new ProductRepository();

export class ProductService {
    
    async getProducts(): Promise<Product[]> {
        // Podríamos añadir lógica de negocio aquí, ej: aplicar descuentos
        const products = await productRepository.findAll();
        return products;
    }

    async getProductById(id: number): Promise<Product> {
        const product = await productRepository.findById(id);
        
        if (!product) {
            // Manejo de error: aquí podrías lanzar un error tipado (ej. NotFoundError)
            throw new Error(`Product with ID ${id} not found.`);
        }
        return product;
    }

    async createProduct(productData: Omit<Product, 'id'>): Promise<number> {
        // Podríamos validar datos o aplicar transformaciones aquí
        const id = await productRepository.create(productData);
        return id;
    }
}