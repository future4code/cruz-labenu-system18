import { Request, Response } from "express";
import connection from "../connection";

async function updateModule(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const newModule = Number(req.body.newModule);

    if (!id) {
      res.statusCode = 400;
      throw new Error("id not informed");
    }
    if (!newModule) {
      res.statusCode = 400;
      throw new Error("new module not informed");
    }

    const classes = await connection("class");
    const classExist = classes.filter((classInfo) => classInfo.id === id);
    if (classExist.length === 0) {
      res.statusCode = 404;
      throw new Error("class does not exist");
    }

    await connection.raw(`
      UPDATE class
      SET module = ${newModule}
      WHERE id = ${id};
    `);

    res.send({ message: "updated!" });
  } catch (error) {
    console.error(error);
    res.send({ message: error.message || error.sqlMessage });
  }
}

export default updateModule;
