import { Response, Request } from "express";
import connection from "../connection";

async function getStudentByHobbie(req: Request, res: Response) {
  try {
    const idHobbie = Number(req.params.idHobbie);

    if(!idHobbie){
      res.statusCode = 400
      throw new Error("incomplete information");
    }

    const hobbies = await connection('hobbie')
    const hobbieExist = hobbies.filter((hobbie) =>  hobbie.id === idHobbie)
    if(hobbieExist.length === 0){
      res.statusCode = 404
      throw new Error("hobbie does not exist");
    }

    const [result] = await connection.raw(`
      SELECT id, name, email, birth_date, class_id, hobbie_id
      FROM student
      JOIN student_hobbie
      ON student.id = student_hobbie.student_id
      WHERE hobbie_id = ${idHobbie};
    `);

    if(result.length === 0){
      res.statusCode = 400
      throw new Error("there are no people with this hobby");
    }

    res.send(result);
  } catch (error) {
    console.error(error);
    res.send({ message: error.message || error.sqlMessage });
  }
}

export default getStudentByHobbie;
