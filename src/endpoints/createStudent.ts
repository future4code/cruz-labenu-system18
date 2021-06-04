import { Request, Response } from "express";
import connection from "../connection";
import { student } from "../types";
import isValidClass from "../validations/isValidClass";
import isValidDate from "../validations/isValidDate";
import isValidEmail from "../validations/isValidEmail";
import isValidName from "../validations/isValidName";


export default async function createStudent(req: Request, res: Response): Promise<void> {
    try {
        const { name, email, birth_date, class_id } = req.body
        const student: student = { name, email, birth_date, class_id }
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
        if(class_id) {
          isValidClass(req, res)
          await connection.raw(` 
          INSERT INTO student (name,email,birth_date,class_id) 
          VALUES ("${name}","${email}","${birth_date}","${class_id}");`)
           res.status(200).send({
               message: "New student created.", 
               student,
           })
        
        }
        await connection.raw(` 
       INSERT INTO student (name,email,birth_date) 
       VALUES ("${name}","${email}","${birth_date}");`)
        res.status(200).send({
            message: "New student created.", 
            student,
        })
       
        

res.status(201).send({ message: "created" });
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

