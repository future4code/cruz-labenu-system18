import { Request, Response } from "express";
import connection from "../connection";
import { teacher } from "../types";
import isValidClassByBody from "../validations/isValidClassByBody";
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

      isValidEmail(email)
      isValidDate(birth_date)
      isValidName(name)
      if(class_id){
         isValidClassByBody(req, res) 
         await connection.raw(`
         INSERT INTO teacher (name,email,birth_date,class_id) 
         VALUES ("${name}","${email}","${birth_date}",${class_id});`)
         res.status(200).send({
            message: "New teacher created.",
            teacher,
         })
      }
      
      await connection.raw(`
      INSERT INTO teacher (name,email,birth_date) 
      VALUES ("${name}","${email}","${birth_date}");`)
      res.status(200).send({
         message: "New teacher created.",
         teacher,
      })
  } catch (error) {
    if (error.sqlMessage && error.sqlMessage.includes("Duplicate")) {
      res.status(400).send({ message: "email has already been registered" });
    }
    if (error.sqlMessage && error.sqlMessage.includes("Incorrect date value")) {
      res.status(400).send({ message: "incorrect date format" });
    }
    if (error.sqlMessage && error.sqlMessage.includes("SQL syntax")) {
      res.status(500).send({ message: "internal error" });
    }

    console.error(error);
    res.send({ message: error.message || error.sqlMessage });
  }
}

