
import { connect } from '../database'

export const getTasks = async (req,res) =>{
try {
    const connection = await connect()
const [rows] = await connection.query('SELECT * FROM tasks')
res.json(rows)
} catch (error) {
    console.log(error)
}
}

export const getTask= async (req,res) =>{
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM tasks where id = ?', 
    [req.params.id,
    ])
    console.log(rows[0])
    res.json(rows[0])
}

export const getTasksCount= async (req,res) =>{
    const connection = await connect()
    const [rows] = await connection.execute('SELECT COUNT(*) FROM tasks')
    console.log(rows)
    res.json(rows[0]["COUNT(*)"])
}

export const saveTask= async (req,res) =>{
    const connection = await connect()
    const [results] = await connection.execute('insert into tasks(title, description)values(?,?)'
    ,[req.body.title, req.body.description
    ])
    res.json({
        id: results.insertId,
        ...req.body
    })  
}
export const deleteTask= async (req,res) =>{
    const connection = await connect()
    const result = await connection.execute("delete from tasks where id = ?",[
        req.params.id
    ])
  res.sendStatus(204)
}

export const updateTask= async (req,res) =>{
    const connection = await connect()
 await connection.query("update tasks SET ? where id = ?", [
        req.body,
        req.params.id
    ])
    res.sendStatus(204)
}


