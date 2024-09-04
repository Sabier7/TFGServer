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
    try {
        const id = req.params.id; // Obtener el ID del cliente desde la URL
        // Resto del código para actualizar el cliente usando el ID
        // ...
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating client' });
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

// Obtener un producto por ID
export const getProductoById = async (req, res) => {
    try {
        const [rows] = await database.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener producto' });
    }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
    const { nombre, descripcion, cantidad, precio } = req.body;
    try {
        const [result] = await database.query(
            'INSERT INTO productos (nombre, descripcion, cantidad, precio) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, cantidad, precio]
        );
        res.status(201).json({ id: result.insertId, nombre, descripcion, cantidad, precio });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear producto' });
    }
};

// Actualizar un producto
export const updateProducto = async (req, res) => {
    const { nombre, descripcion, cantidad, precio } = req.body;
    try {
        const [result] = await database.query(
            'UPDATE productos SET nombre = ?, descripcion = ?, cantidad = ?, precio = ? WHERE id = ?',
            [nombre, descripcion, cantidad, precio, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar producto' });
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
    const codigoQR = req.query.codigoQR; // Extraer el codigoQR de la query string

    try {
        const producto = await database.query('SELECT * FROM productos WHERE codigoQR = ?', [codigoQR]);
        if (producto.length > 0) {
            res.json(producto[0]);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
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