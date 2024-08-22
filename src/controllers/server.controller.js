import { database } from '../Database.js'

export const ping = async (req, res) => {
    const [result] = await database.query ('SELECT "Pong" AS result') 
    res.json(result[0])
 }