import { Request, Response } from "express";
import connection from "../connection";

export default async function (req:Request,res:Response):Promise<void>  {
    try {
       const {name,email,birth_date,class_id} = req.body
       const result = await connection.raw(`
       INSERT  INTO teacher (name,email,birth_date,class_id) 
       VALUES ("${name}","${email}","${birth_date}","${class_id}");`)
       res.status(200).send(result)
    } catch (error) {
       console.log(error)
       res.send(error.message || error.sqlMessage)
    }
 }