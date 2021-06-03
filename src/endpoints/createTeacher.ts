import { Request, Response } from "express";
import connection from "../connection";

async function createTeacher(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, birthDate, classId } = req.body;

    if (!name || !email || !birthDate || !classId) {
      res.statusCode = 400;
      throw new Error("incomplete or invalid data");
    }

    await connection.raw(`
      INSERT  INTO teacher (name,email,birth_date,class_id) 
      VALUES (
        "${name}",
        "${email}",
        "${birthDate.split("/").reverse().join("-")}",
        "${classId}"
      );
    `);

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

export default createTeacher;
