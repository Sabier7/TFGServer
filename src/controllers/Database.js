
import { createPool } from 'mysql2/promise'

// se pone mysql2/promise por que a la hora de ejecutarlo lo hicimos asincrono y necesita que sea una promesa el sigiuente codigo en erver.js
class Database {
    async connect() {
        this.pool = createPool({
            host: 'localhost',
            user: 'mi_basededatos',
            password: 'DBlutomavar1',
            database: 'mi_basededatos',
        });
    }

    async query(sql, params) { // Se añade el parámetro "params"
        try {
            const [rows] = await this.pool.query(sql, params); // Se pasan los parámetros aquí
            return rows;
        } catch (error) {
            console.error('Error en la consulta SQL:', error);
            throw error;
        }
    }
}

export const database = new Database();
