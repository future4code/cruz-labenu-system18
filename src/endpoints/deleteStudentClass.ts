import { Request, Response } from "express";
import connection from "../connection";

export default async function deleteStudentClass(req: Request, res: Response): Promise<void> {
    try {
        const student_id = req.params.student_id
        const class_id = req.params.class_id
        const [allStudentIds] = await connection.raw(`SELECT id FROM student`);
        const isThisIdIsValidStudent = (object: any) => {
            return object.id == student_id;
        };
        const isStudentExist = allStudentIds.filter(isThisIdIsValidStudent);
        if (!isStudentExist.length) {
            throw new Error("This student doesn't exist");
        }
        const [allStudentIdsInAClass] = await connection.raw(`SELECT id FROM student WHERE class_id = ${class_id}`);
        const thisIdExist = (object: any) => {
            return object.id == student_id;
        };
        const isIdExist = allStudentIdsInAClass.filter(thisIdExist);
        if (!isIdExist.length) {
            throw new Error("This student doesn't belong to this class");
        }
        const [allClassIds] = await connection.raw(`SELECT id FROM class`);
        const idIdExist = (object: any) => {
            return object.id == class_id;
        };
        const isIdExistInThisClass = allClassIds.filter(idIdExist);
        if (!isIdExistInThisClass.length) {
            throw new Error("This class doesn't exist");
        }

        await connection.raw(`
        UPDATE student 
        set class_id = NULL
        WHERE id = ${student_id};
        `)
        res.status(200).send({
            message: `The student was removed from his class`
        })


    } catch (error) {
        res.send(error.message || error.sqlMessage)
    }
}