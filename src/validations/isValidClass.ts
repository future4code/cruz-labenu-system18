import connection from "../connection";
import { Request, Response } from "express";

export default async function isValidClass( req: Request, res: Response): Promise<void> {
  try {
    const [allClassIds] = await connection.raw(`SELECT id FROM class`);
    const class_id = req.params.class_id;
    const idIdExist = (object: any) => {
      return object.id == class_id;
    };
    const isIdExist = allClassIds.filter(idIdExist);
    if (!isIdExist.length) {
      throw new Error("This class doesn't exist");
    }
  } catch (error) {
    res.send(error.message || error.sqlMessage);
  }
}
