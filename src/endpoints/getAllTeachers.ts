import { Request, Response } from "express";
import connection from "../connection";


export default async function getAllTeachers (req:Request,res:Response):Promise<void>  {
    try {
       const [result] = await connection.raw(`
       SELECT * FROM teacher;
       `)
       
       res.status(200).send(result)
    } catch (error) {
       console.log(error)
       res.send(error.message || error.sqlMessage)
    }
 }