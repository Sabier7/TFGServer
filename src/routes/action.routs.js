//
// Autor: Jonatan David Vargas Revollo
// Copyrigh (c) 2023

import { Router } from 'express';
import { 
  getCliente, 
  createCliente, 
  updateCliente, 
  deleteCliente, 
  getProductos, 
  searchByName, 
  createProducto, 
  updateProducto, 
  deleteProducto, 
  getClienteByQR,
  updateProductoCantidad, 
  getProductoByNombreYFecha, 
  getOrCreateProducto 
} from '../controllers/action.controllers.js';

const router = Router();

// Rutas para clientes
router.get('/cliente/:id', getCliente);
router.post('/cliente', createCliente);
router.put('/cliente/:id', updateCliente);
router.delete('/cliente/:id', deleteCliente);
router.get('/cliente', getClienteByQR);

// Rutas para productos
router.get('/products', getProductos);                // Obtener todos los productos
router.get('/search', searchByName);         // Obtener un producto por ID
router.post('/productos', getOrCreateProducto);        // Crear un nuevo producto o buscar uno existente
router.put('/productos/:id', updateProducto);          // Actualizar un producto
router.put('/productos/:id/cantidad', updateProductoCantidad); // Actualizar cantidad del producto
router.delete('/productos/:id', deleteProducto);       // Eliminar un producto
router.get('/productos/nombre-fecha', getProductoByNombreYFecha); // Obtener producto por nombre y fecha

export default router;
