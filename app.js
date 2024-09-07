
// Autor: Jonatan David Vargas Revollo
// Copyrigh (c) 2023
// comando para iniciar "node app.js"

import { server } from './src/server.js'


global.log = console

try
{
    await server.start (3000)
}
catch (error)
{
    log.error ("The server failed to start: " + String(error))
}
