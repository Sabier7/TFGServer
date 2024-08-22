
import { createPool } from 'mysql2/promise'

// se pone mysql2/promise por que a la hora de ejecutarlo lo hicimos asincrono y necesita que sea una promesa el sigiuente codigo en erver.js

class Database
{

    async connect ()
    {
        this.pool = createPool
        ({
            host: 'localhost',
            user: 'root',
            password: 'DBlutomavar1',
            database: 'mi_basededatos',
            port: 3306
        });
    }

    async query (sql)
    {
        return await this.pool.query (sql)
    }
}

export const database = new Database()