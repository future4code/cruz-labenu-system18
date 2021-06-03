import { Request, Response } from "express";
import connection from "../connection";


export default async function (req:Request,res:Response):Promise<void>  {
    try {
       const {name,start_date,end_date,module} = req.body
       const result = await connection.raw(`
       INSERT  INTO class (name,start_date,end_date,module) 
       VALUES ("${name}","${start_date}","${end_date}","${module}");`)
       res.status(200).send(result)
    } catch (error) {
       console.log(error)
       res.send(error.message || error.sqlMessage)
    }
 }