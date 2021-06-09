import { Response, Request } from "express";
import connection from "../connection";

async function getTeacherByClass(req: Request, res: Response): Promise<void> {
  try {
    const idClass = Number(req.params.idClass);

    if(!idClass){
      res.statusCode = 400
      throw new Error("id not informed");
    }

    const classes = await connection('class')
    const classExist = classes.filter((classInfo) =>  classInfo.id === idClass)
    if(classExist.length === 0){
      res.statusCode = 404
      throw new Error("class does not exist");
    }

    const [result] = await connection.raw(`
      SELECT * FROM teacher
      WHERE class_id = ${idClass};
    `);

    if(result.length === 0){
      res.statusCode = 400
      throw new Error("there are no teachers in this class");
    }

    res.send(result);
  } catch (error) {
    console.error(error);
    res.send({ message: error.message || error.sqlMessage });
  }
}

export default getTeacherByClass;
