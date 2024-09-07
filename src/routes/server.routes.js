//
// Autor: Jonatan David Vargas Revollo
// Copyrigh (c) 2023

import { Router } from 'express'

import { ping } from '../controllers/server.controller.js';

const router = Router()

router.get('/ping',ping);

export default router