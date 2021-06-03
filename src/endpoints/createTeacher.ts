import { Request, Response } from "express";
import connection from "../connection";
import { teacher } from "../types";
import isValidClass from "../validations/isValidClass";
import isValidDate from "../validations/isValidDate";
import isValidEmail from "../validations/isValidEmail";
import isValidName from "../validations/isValidName";

export default async function createTeacher(req: Request, res: Response): Promise<void> {
   try {
      const { name, email, birth_date, class_id } = req.body
      const teacher: teacher = { name, email, birth_date, class_id }
      if (!name) {
         throw new Error("name is missing")
      }
      if (!email) {
         throw new Error("email is missing")
      }
      if (!birth_date) {
         throw new Error("birth_date is missing")
      }
      if (!class_id) {
         throw new Error("class_id is missing")
      }

      isValidEmail(email)
      isValidDate(birth_date)
      isValidName(name)
     await  isValidClass(req, res) 

      await connection.raw(`
      INSERT INTO teacher (name,email,birth_date,class_id) 
      VALUES ("${name}","${email}","${birth_date}","${class_id}");`)
      res.status(200).send({
         message: "New teacher created.",
         teacher,
      })
   } catch (error) {
      res.send(error.message || error.sqlMessage)
   }
}