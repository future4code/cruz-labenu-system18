import { Request, Response } from "express";
import connection from "../connection";

export default async function seeStudentHobbie(
    req: Request,
    res: Response
 ): Promise<void> {
    try {
       const  id  = Number(req.params.id)
       console.log('id: ',id)
       console.log('type:',typeof(id))
       const [result] = await connection.raw(`
       SELECT student_id AS "ID",student.name  AS "Name",student.email AS "E-MAIL",hobbie.name AS "HOBBIE" FROM student 
       JOIN student_hobbie
       ON id = student_hobbie.student_id
       JOIN hobbie
       ON hobbie.id =student_hobbie.hobbie_id
       WHERE student_id = ${id};
       `)
       console.log('result: ',result)
       res.status(200).send(result)
       
    } catch (error) {
       res.status(500).end()
    }
 }