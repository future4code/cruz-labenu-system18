import { Request, Response } from "express";
import connection from "../connection";

export default async function createStudent(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, email, birthDate, classId } = req.body;

    if (!name || !email || !birthDate || !classId) {
      res.statusCode = 400;
      throw new Error("incomplete or invalid data");
    }

    await connection.raw(`
         INSERT INTO student (name,email,birth_date,class_id)
         VALUES (
            "${name}",
            "${email}",
            "${birthDate.split("/").reverse().join("-")}",
            "${classId}"
         );
    `);

    res.status(201).send({ message: "created" });
  } catch (error) {
    if (error.sqlMessage.includes("Duplicate")) {
      res.statusCode = 400
      res.send({ message: "email has already been registered" });
    }
    if (error.sqlMessage.includes("Incorrect date value")) {
      res.statusCode = 400
      res.send({ message: "incorrect date format" });
    }

    console.log(error);
    res.send({ message: error.message || error.sqlMessage });
  }
}
