//
// Autor: Jonatan David Vargas Revollo
// Copyrigh (c) 2023

import express from 'express'; 
import { database } from './controllers/Database.js';
import Clientes from './routes/action.routs.js';
import InfoDB from './routes/server.routes.js';

const app = express();

// Middleware para analizar cuerpos JSON
app.use(express.json());

// Middleware para analizar cuerpos codificados en URL
app.use(express.urlencoded({ extended: true }));

class Server {
  async start(port) {
    try {
      log.info("Connecting to database...");
      
      await database.connect(); // Conecta con la base de datos

      log.info("Starting server...");
      await this.startServer(port);
    } catch (error) {
      log.error("Error starting server:", error);
    }
  }

  async startServer(port) {
    const app = express();  // Instancia de la aplicación Express
    
    /*  */
    // Middleware de Express para analizar solicitudes
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Configuración de rutas
    app.use(Clientes);
    app.use(InfoDB);

    // Inicia el servidor en el puerto especificado
    app.listen(port, () => {
      log.info(`Server is running on port ${port}`);
    });

    // Manejo de errores global
    app.use((err, req, res, next) => {
      log.error("Server error:", err);
      res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export const server = new Server();