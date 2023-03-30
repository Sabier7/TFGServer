import {Router} from 'express'
import { getCliente, createCliente, updateCliente,deleteCliente} from '../controllers/action.controllers.js'

const router = Router()
// Configurar el servidor estas acciones estan pasadas a la carpeta controllers para mayor claridad
router.get('/cliente', getCliente)

router.post('/cliente',createCliente)

router.put('/cliente',updateCliente)

router.delete('/cliente', deleteCliente)

export default router