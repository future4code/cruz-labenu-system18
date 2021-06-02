import { Request, Response } from "express";
import connection from "../connection";

export default async function deleteStudents(
   req: Request,
   res: Response
): Promise<void> {
   try {
      const  id  = req.params
      await connection("student")
         .delete()
         .where( "id", id )

      res.status(200).end()
      
   } catch (error) {
      res.status(500).end()
   }
}