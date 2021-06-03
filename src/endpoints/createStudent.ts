import { Request, Response } from "express";
import connection from "../connection";



export default async function createStudent(req:Request,res:Response):Promise<void>  {
    try {
       const {name,email,birth_date,class_id} = req.body
       const result = await connection.raw(`
       INSERT INTO student (name,email,birth_date,class_id) 
       VALUES ("${name}","${email}","${birth_date}","${class_id}");`)
       res.status(200).send(result[1])
    } catch (error) {
       console.log(error)
       res.send(error.message || error.sqlMessage)
    }
 }