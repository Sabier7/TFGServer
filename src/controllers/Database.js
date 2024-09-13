//
// Autor: Jonatan David Vargas Revollo
// Copyrigh (c) 2023

import { createPool } from 'mysql2/promise';

class Database {
    async connect() {
        this.pool = createPool({
            host: 'localhost',
            user: 'mi_basededatos',
            password: 'DBlutomavar1',
            database: 'mi_basededatos',
        });
    }

    async query(sql, params) {
        try {
            const [rows] = await this.pool.query(sql, params);
            return rows;
        } catch (error) {
            console.error('Error en la consulta SQL:', error);
            throw error;
        }
    }
}


export const database = new Database();

