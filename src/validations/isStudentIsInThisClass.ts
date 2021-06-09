import connection from "../connection";
import { Request, Response } from "express";

export default async function isStudentIsInThisClass(req: Request, res: Response): Promise<void> {
    try {
        const class_id = req.params.class_id
        const student_id = req.params.student_id;
        const [allStudentIds] = await connection.raw(`SELECT id FROM student WHERE class_id = ${class_id}`);
        const thisIdExist = (object: any) => {
            return object.id == student_id;
        };
        const isIdExist = allStudentIds.filter(thisIdExist);
        if (!isIdExist.length) {
            throw new Error("This student doesn't belong to this class");
        }
    } catch (error) {
        res.send(error.message || error.sqlMessage);
    }
}
