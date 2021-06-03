import { Request, Response } from "express";
import connection from "../connection";

export default async function getAllStudents(
   req: Request,
   res: Response
): Promise<void> {
   try {
      const  id  = req.params.id
      const [result] = await connection.raw(`
      SELECT * FROM student
      `)
      console.log('result: ',result)
      res.status(200).send(result)
      
   } catch (error) {
      res.status(500).end()
   }
}