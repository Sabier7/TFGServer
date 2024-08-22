import Express from 'express';

//import mysql from 'mysql';

//al tratarse de un archivo propio se pone delante ./ y el nombre del archivo
import { database } from './Database.js';
// puedo crear una variable clientes y pasarle una ruta para usar posteriormente 
import Clientes from './routes/action.routs.js';
import InfoDB from './routes/server.routes.js';

class Server
{ 
    async start (port)
    {
        log.info ("Connecting to dabase...")

        await database.connect ()

        log.info ("Starting server...")
 
        await this.startServer (port)
    }

    async connectDatabase ()
    {
    }

    async startServer (port)
    {
        const app = Express();
        
        //esta linea declara lo que usare para acceder a emplados una ves indicada la ruta de donde esta clientes
        app.use (Clientes)

        app.use (InfoDB)

        app.listen (port)
    }
}

export const server = new Server()
