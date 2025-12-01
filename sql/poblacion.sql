use `erp_app`;

-- 5 INSERTs para la tabla `productos` con datos falsos.
INSERT INTO `productos` (`sku`, `nombre`, `descripcion`, `path_foto`, `precio_compra`, `color_id`, `categoria_id`, `marca_id`) VALUES
('PN00006', 'Monitor Curvo 32" Quantum', 'Monitor de alta resolución con tasa de refresco de 144Hz, ideal para gaming y diseño profesional.', 'img/monitor_quantum.jpg', 380.00, 8, 1, 1),      -- Negro (8), Electrónica (1), TechNova (1)
('PN00007', 'Zapatillas Deportivas Runner V4', 'Calzado ligero y transpirable con suela de amortiguación avanzada para corredores de larga distancia.', 'img/zapatillas_v4.jpg', 55.99, 5, 2, 2),        -- Naranja (5), Ropa y Moda (2), FashionTrend (2)
('PN00008', 'Set de Sábanas King Size Percal', 'Juego de sábanas de 300 hilos, 100% algodón percal, tacto suave y fresco.', 'img/sabanas_king.jpg', 45.00, 10, 3, 3),      -- Celeste (10), Hogar y Jardín (3), HomeBliss (3)
('PN00009', 'Ebook "Guía de Inversiones 2026"', 'Guía completa sobre estrategias de inversión, criptomonedas y bolsa de valores.', 'img/ebook_inv.pdf', 8.50, 4, 4, 1),            -- Amarillo (4), Libros y Medios (4), TechNova (1)
('PN00010', 'Mesa Auxiliar de Madera Nórdica', 'Mesa de centro pequeña, estilo minimalista con patas de pino. Fácil de armar.', 'img/mesa_nordica.jpg', 32.75, 9, 3, 3);        -- Blanco (9), Hogar y Jardín (3), HomeBliss (3)