import { Request, Response } from "express";
import connection from "../connection";


export default async function getAllClasses (req:Request,res:Response):Promise<void>  {
    try {
       const [result] = await connection.raw(`  SELECT * FROM class;`)
       res.status(200).send(result)
    } catch (error) {
       res.send(error.message || error.sqlMessage)
    }
 }