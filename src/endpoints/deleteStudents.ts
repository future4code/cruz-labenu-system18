import { Request, Response } from "express";
import connection from "../connection";

export default async function deleteStudents(
   req: Request,
   res: Response
): Promise<void> {
   try {
      const  id  = req.params.id
      const [result] = await connection.raw(`
      DELETE FROM student_hobbie
      WHERE student_id = ${id};
      
      DELETE from student
      WHERE id = ${id}`)
      console.log('result: ',result)
      res.status(200).send(result)
      
   } catch (error) {
      res.status(500).end()
   }
}