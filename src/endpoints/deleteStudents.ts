import { Request, Response } from "express";
import connection from "../connection";
import isValidStudent from "../validations/isValidStudent";

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
      res.status(200).send({
         message: "student deleted."
      })
      
   } catch (error) {
      res.status(500).end()
   }
}