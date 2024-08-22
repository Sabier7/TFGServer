
// Autor: Jonatan David Vargas Revollo
// Fecha:
// Copyrigh (c) 2023

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
