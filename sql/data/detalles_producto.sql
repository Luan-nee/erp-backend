INSERT INTO `detalles_producto` 
    (`porcentaje_ganancia`, `stock`, `stock_minimo`, `esta_inhabilitado`, `producto_id`, `sucursal_id`) 
VALUES
-- PRODUCTO 1: Laptop UltraPro (id=1)
(0.2000, 15, 5, FALSE, 1, 1), -- Central: buen stock, 20% ganancia
(0.2200, 8, 3, FALSE, 1, 2),  -- Norte: stock medio, 22% ganancia
(0.2000, 2, 5, FALSE, 1, 3),  -- Sur: bajo stock (alerta)

-- PRODUCTO 2: Auriculares Inalámbricos X (id=2)
(0.3500, 40, 10, FALSE, 2, 1),
(0.3200, 25, 10, FALSE, 2, 2),
(0.3500, 10, 5, FALSE, 2, 3),

-- PRODUCTO 3: Smartwatch Series 5 (id=3)
(0.3000, 20, 5, FALSE, 3, 1),
(0.3000, 10, 5, FALSE, 3, 2),
(0.3000, 0, 5, TRUE, 3, 3), -- Sur: Inhabilitado / Agotado

-- PRODUCTO 4: Cargador Rápido USB-C 65W (id=4)
(0.4000, 50, 20, FALSE, 4, 1),
(0.4000, 30, 20, FALSE, 4, 2),
(0.4200, 5, 10, FALSE, 4, 3), -- Sur: Bajo stock

-- PRODUCTO 5: Zapatillas Urbanas Clásicas (id=5)
(0.2500, 30, 10, FALSE, 5, 1),
(0.2500, 15, 10, FALSE, 5, 2),
(0.2700, 12, 5, FALSE, 5, 3),

-- PRODUCTO 6: Sudadera Algodón Oversize (id=6)
(0.3000, 25, 10, FALSE, 6, 1),
(0.3000, 18, 5, FALSE, 6, 2),
(0.3000, 5, 5, FALSE, 6, 3),

-- PRODUCTO 7: Jeans Slim Fit Elásticos (id=7)
(0.2500, 10, 5, FALSE, 7, 1),
(0.2500, 0, 5, FALSE, 7, 2),  -- Norte: Agotado
(0.2800, 8, 5, FALSE, 7, 3),

-- PRODUCTO 8: Gafas de Sol Polarizadas (id=8)
(0.4500, 60, 15, FALSE, 8, 1),
(0.4500, 40, 15, FALSE, 8, 2),
(0.4500, 15, 15, FALSE, 8, 3),

-- PRODUCTO 9: Mochila Antirrobo Ejecutiva (id=9)
(0.3000, 15, 5, FALSE, 9, 1),
(0.3200, 10, 5, FALSE, 9, 2),
(0.3000, 5, 5, FALSE, 9, 3),

-- PRODUCTO 10: Set de Sábanas King Size (id=10)
(0.3500, 20, 8, FALSE, 10, 1),
(0.3500, 15, 5, FALSE, 10, 2),
(0.3500, 10, 5, FALSE, 10, 3),

-- PRODUCTO 11: Máquina de Café Espresso (id=11)
(0.2000, 5, 2, FALSE, 11, 1),
(0.2000, 3, 2, FALSE, 11, 2),
(0.2000, 1, 2, TRUE, 11, 3), -- Sur: Inhabilitado / Bajo stock

-- PRODUCTO 12: Estantería Modular 5 Niveles (id=12)
(0.2500, 10, 4, FALSE, 12, 1),
(0.2500, 7, 3, FALSE, 12, 2),
(0.2800, 3, 3, FALSE, 12, 3),

-- PRODUCTO 13: Kit de Herramientas 50 Piezas (id=13)
(0.3000, 25, 10, FALSE, 13, 1),
(0.3000, 15, 10, FALSE, 13, 2),
(0.3200, 8, 5, FALSE, 13, 3),

-- PRODUCTO 14: Lámpara de Escritorio LED (id=14)
(0.4000, 30, 10, FALSE, 14, 1),
(0.4000, 20, 10, FALSE, 14, 2),
(0.4000, 15, 5, FALSE, 14, 3),

-- PRODUCTO 15: Alfombra Geométrica 2x3m (id=15)
(0.2500, 10, 5, FALSE, 15, 1),
(0.2500, 5, 5, FALSE, 15, 2),
(0.2500, 0, 5, TRUE, 15, 3), -- Sur: Inhabilitado / Agotado

-- PRODUCTO 16: Novela: El Secreto del Tiempo (id=16)
(0.5000, 100, 30, FALSE, 16, 1),
(0.5000, 80, 20, FALSE, 16, 2),
(0.5000, 50, 20, FALSE, 16, 3),

-- PRODUCTO 17: Libro de Cocina Vegana Gourmet (id=17)
(0.4500, 50, 15, FALSE, 17, 1),
(0.4500, 30, 10, FALSE, 17, 2),
(0.4500, 20, 10, FALSE, 17, 3),

-- PRODUCTO 18: Guía de Programación Python (id=18)
(0.4000, 40, 15, FALSE, 18, 1),
(0.4000, 25, 10, FALSE, 18, 2),
(0.4000, 15, 10, FALSE, 18, 3),

-- PRODUCTO 19: Revista de Viajes Mundo (id=19)
(0.6000, 80, 20, FALSE, 19, 1),
(0.6000, 60, 20, FALSE, 19, 2),
(0.6000, 40, 10, FALSE, 19, 3),

-- PRODUCTO 20: Audiobook: Liderazgo Moderno (id=20)
(0.5500, 0, 10, TRUE, 20, 1), -- Central: Inhabilitado
(0.5500, 20, 10, FALSE, 20, 2),
(0.5500, 15, 5, FALSE, 20, 3),

-- PRODUCTO 21: Comic: Aventuras Galácticas (id=21)
(0.5000, 70, 20, FALSE, 21, 1),
(0.5000, 50, 15, FALSE, 21, 2),
(0.5000, 30, 10, FALSE, 21, 3),

-- PRODUCTO 22: Ebook: Fundamentos de IA (id=22)
(0.4000, 30, 10, FALSE, 22, 1),
(0.4000, 20, 10, FALSE, 22, 2),
(0.4000, 10, 5, FALSE, 22, 3);