//
// Autor: Jonatan David Vargas Revollo
// Copyrigh (c) 2023

import { database } from './Database.js';

export const getCliente = async (req, res) => {
    const id = req.params.id;

    try {
        const cliente = await database.query('SELECT * FROM clientes WHERE id = ?', [id]);
        if (cliente.length > 0) {
            res.json(cliente[0]);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en la consulta', error });
    }
};


export const createCliente = async (req, res) => {
    try {
        const { nombre, telefono, orden_de_trabajo, mecanico, electrico, descripcion } = req.body;
        // No incluyas el ID en la inserción, ya que se generará automáticamente.
        await database.query('INSERT INTO clientes (nombre, telefono, ordenDeTrabajo, mecanico, electrico, descripcion) VALUES (?, ?, ?, ?, ?, ?)', [nombre, telefono, orden_de_trabajo, mecanico, electrico, descripcion]);
        res.json({ message: 'Cliente Creado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating client' });
    }
};

export const updateCliente = async (req, res) => {
    const id = req.params.id;
    const { nombre, telefono, ordenDeTrabajo, mecanico, electrico, descripcionNueva } = req.body;
  
    try {
      // Obtener el cliente actual para preservar la descripción anterior
      const cliente = await database.query('SELECT * FROM clientes WHERE id = ?', [id]);
      if (cliente.length === 0) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
  
      // Combinar la descripción anterior con la nueva
      const nuevaDescripcionCompleta = `${cliente[0].descripcion}\n${new Date().toLocaleString()}: ${descripcionNueva}`;
  
      // Actualizar el cliente en la base de datos
      await database.query(
        'UPDATE clientes SET nombre = ?, telefono = ?, ordenDeTrabajo = ?, mecanico = ?, electrico = ?, descripcion = ? WHERE id = ?',
        [nombre, telefono, ordenDeTrabajo, mecanico, electrico, nuevaDescripcionCompleta, id]
      );
  
      res.json({ message: 'Cliente actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      res.status(500).json({ message: 'Error en la actualización', error });
    }
  };
  

export const deleteCliente = async (req, res) => {
    try {
        const id = req.params.id; // Obtener el ID del cliente desde la URL
        // Resto del código para eliminar el cliente usando el ID
        // ...
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting client' });
    }
};
export const getProductos = async (req, res) => {
    try {
        const [rows] = await database.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};
export const getOrCreateProducto = async (req, res) => {
    const { nombre, descripcion, precio, cantidad, fechaCaducidad } = req.body;
    
    console.log('Datos recibidos del QR:', { nombre, descripcion, precio, cantidad, fechaCaducidad });
    try {
        // Verificar si el producto ya existe
        let query = 'SELECT * FROM productos WHERE nombre = ? AND descripcion = ? AND precio = ?';
        let params = [nombre, descripcion, precio];

        if (fechaCaducidad) {
            query += ' AND fecha_caducidad = ?';
            params.push(fechaCaducidad);
        }

        const [producto] = await database.query(query, params);

        if (producto.length > 0) {
            // El producto ya existe, aumentar la cantidad
            const productoExistente = producto[0];
            const nuevaCantidad = productoExistente.cantidad + cantidad;
            await database.query('UPDATE productos SET cantidad = ? WHERE id = ?', [nuevaCantidad, productoExistente.id]);

            return res.json({ message: 'Cantidad actualizada', producto: { ...productoExistente, cantidad: nuevaCantidad } });
        } else {
            // El producto no existe, agregarlo
            const [result] = await database.query(
                'INSERT INTO productos (nombre, descripcion, precio, cantidad, fecha_caducidad) VALUES (?, ?, ?, ?, ?)',
                [nombre, descripcion, precio, cantidad, fechaCaducidad || null]
            );

            return res.json({
                message: 'Producto creado',
                producto: { id: result.insertId, nombre, descripcion, precio, cantidad, fechaCaducidad }
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al procesar el producto', error });
    }
};

// Obtener un producto por ID
export const searchByName = async (req, res) => {
    const { searchType, nombre } = req.query;

    console.log('Datos recibidos:', { searchType, nombre });

    try {
        let query;
        let params = [nombre];

        if (searchType === 'cliente') {
            query = 'SELECT * FROM clientes WHERE nombre = ?';
        } else if (searchType === 'producto') {
            query = 'SELECT * FROM productos WHERE nombre = ?';
        } else {
            return res.status(400).json({ message: 'Tipo de búsqueda no válido.' });
        }

        // Ejecutar la consulta
        const [results] = await database.query(query, params);

        console.log('Resultados de la consulta:', results);

        // Asegúrate de que los resultados sean un array, incluso si solo hay un cliente
        if (results) {
            const formattedResults = Array.isArray(results) ? results : [results];  // Convierte en array si es necesario
            res.json(formattedResults);  // Devuelve un array
        } else {
            res.status(404).json({ message: `${searchType === 'cliente' ? 'Cliente' : 'Producto'} no encontrado` });
        }
    } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
        res.status(500).json({ message: 'Error en la consulta', error });
    }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
    const { nombre, descripcion, precio, cantidad, fechaCaducidad } = req.body;

    try {
        const [result] = await database.query(
            'INSERT INTO productos (nombre, descripcion, precio, cantidad, fecha_caducidad) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, cantidad, fechaCaducidad]
        );
        res.status(201).json({ id: result.insertId, nombre, descripcion, precio, cantidad, fechaCaducidad });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear producto', error });
    }
};

// Actualizar un producto
export const updateProducto = async (req, res) => {
    const { nombre, descripcion, precio, cantidad, fechaCaducidad } = req.body;
    try {
        const [result] = await database.query(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ?, fecha_caducidad = ? WHERE id = ?',
            [nombre, descripcion, cantidad, precio, fecha_caducidad, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
};
export const updateProductoCantidad = async (req, res) => {
    const id = req.params.id; // ID del producto
    const { cantidad } = req.body;

    try {
        const [result] = await database.query(
            'UPDATE productos SET cantidad = ? WHERE id = ?',
            [cantidad, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Cantidad de producto actualizada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar cantidad del producto' });
    }
};

// Eliminar un producto
export const deleteProducto = async (req, res) => {
    try {
        const [result] = await database.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};
export const getClienteByQR = async (req, res) => {
    const codigoQR = req.query.codigoQR; // Extraer el codigoQR de la query string

    try {
        const cliente = await database.query('SELECT * FROM clientes WHERE codigoQR = ?', [codigoQR]);
        if (cliente.length > 0) {
            res.json(cliente[0]);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en la consulta', error });
    }
};
export const getProductoByQR = async (req, res) => {
    const { nombre, descripcion, precio, fechaCaducidad } = req.query; // Asumimos que estos valores vienen del QR

    try {
        // Definir la consulta base para buscar productos por nombre, descripción y precio
        let query = 'SELECT * FROM productos WHERE nombre = ? AND descripcion = ? AND precio = ?';
        let params = [nombre, descripcion, precio];

        // Si hay fecha de caducidad, agregarla como condición adicional
        if (fechaCaducidad) {
            query += ' AND fecha_caducidad = ?';
            params.push(fechaCaducidad);
        }

        const [producto] = await database.query(query, params);

        if (producto.length > 0) {
            // Si el producto ya existe con los mismos criterios
            res.json(producto[0]);
        } else {
            // Producto no encontrado
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en la consulta', error });
    }
};
export const getProductoByNombreYFecha = async (req, res) => {
    const nombre = req.query.nombre;
    const fechaCaducidad = req.query.fecha_caducidad || null;

    try {
        // Construir la consulta SQL
        let query = 'SELECT * FROM productos WHERE nombre = ?';
        let params = [nombre];

        // Si la fecha de caducidad es proporcionada, agregarla a la consulta
        if (fechaCaducidad) {
            query += ' AND fecha_caducidad = ?';
            params.push(fechaCaducidad);
        }

        const producto = await database.query(query, params);

        if (producto.length > 0) {
            res.json(producto[0]);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error en la consulta', error });
    }
};

export const getClienteById = async (req, res) => {
    const id = req.query.id; // Asume que el código QR contiene el id del cliente

    try {
        const cliente = await database.query('SELECT * FROM clientes WHERE id = ?', [id]);
        if (cliente.length > 0) {
            res.json(cliente[0]);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en la consulta', error });
    }
};