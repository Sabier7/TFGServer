// Autor: Jonatan David Vargas Revollo
// Fecha:
// Copyrigh (c) 2023

import {Router} from 'express'
import { getCliente, createCliente, updateCliente, deleteCliente, getProductos, getProductoById, createProducto, updateProducto, deleteProducto } 
from '../controllers/action.controllers.js';

const router = Router();

// Rutas para clientes
router.get('/cliente/:id', getCliente);
router.post('/cliente', createCliente);
router.put('/cliente/:id', updateCliente);
router.delete('/cliente/:id', deleteCliente);

// Rutas para productos
router.get('/productos', getProductos);          // Obtener todos los productos
router.get('/productos/:id', getProductoById);   // Obtener un producto por ID
router.post('/productos', createProducto);       // Crear un nuevo producto
router.put('/productos/:id', updateProducto);    // Actualizar un producto
router.delete('/productos/:id', deleteProducto); // Eliminar un producto


export default router