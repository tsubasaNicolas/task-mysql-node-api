import mysql from 'mysql2/promise'
import {config} from './config'

export const connect = async () =>{
  return await mysql.createConnection(config)
}


/**import mysql from 'mysql2/promise'
import {config} from './config'

const connect = async () =>{
   const conn = await mysql.createConnection(config)

   const [rows] = await conn.query('select 1 + 1')
   console.log(rows)
}

connect(); */