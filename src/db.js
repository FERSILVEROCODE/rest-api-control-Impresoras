import {createPool}  from 'mysql2/promise' /*se importa el módulo mysql2 y la función createPool para varias conexiones*/

import {DB_HOST,DB_USER,DB_DATABASE,DB_PASSWORD,DB_PORT} from './config.js'

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
    
})

