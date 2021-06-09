import connection from "../connection";
import { Request, Response } from "express";

export default async function isValidStudent( req: Request, res: Response): Promise<void> {
    try {
      const student_id = req.params.student_id;
      const [allStudentIds] = await connection.raw(`SELECT id FROM student`);
      const isIdExist = (object: any) => {
        return object.id == student_id;
      };
      const isStudentExist = allStudentIds.filter(isIdExist);
  
      if (!isStudentExist.length) {
        throw new Error("This student doesn't exist");
      }
    } catch (error) {
      res.send(error.message || error.sqlMessage);
    }
  }

