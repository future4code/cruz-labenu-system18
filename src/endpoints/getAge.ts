import { Response, Request } from "express";
import connection from "../connection";

async function getAge(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if(!id){
      res.statusCode = 400
      throw new Error("id was not passed");
    }

    const students = await connection('student')
    const studentExist = students.filter((student) =>  student.id === id)
    if(studentExist.length === 0){
      res.statusCode = 404
      throw new Error("student does not exist");
    }

    const [result] = await connection.raw(`
      SELECT DATEDIFF(CURDATE(), birth_date) / 365 AS age 
      FROM student
      WHERE id = ${id};
    `);

    res.send({age: parseInt(result[0].age, 10)});
  } catch (error) {
    
    console.error(error)
    res.send({ message: error.message || error.sqlMessage });
  }
}

export default getAge;
