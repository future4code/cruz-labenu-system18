import { Request, Response } from "express";
import connection from "../connection";

export default async function deleteTeacherClass(req: Request, res: Response): Promise<void> {
    try {
        const teacher_id = req.params.teacher_id
        const class_id = req.params.class_id
        const [allTeacherIds] = await connection.raw(`SELECT id FROM teacher`);
        const isThisIdIsValidteacher = (object: any) => {
            return object.id == teacher_id;
        };
        const isTeacherExist = allTeacherIds.filter(isThisIdIsValidteacher);
        if (!isTeacherExist.length) {
            throw new Error("This teacher doesn't exist");
        }
        const [allTeacherIdsInAClass] = await connection.raw(`SELECT id FROM teacher WHERE class_id = ${class_id}`);
        const thisIdExist = (object: any) => {
            return object.id == teacher_id;
        };
        const isIdExist = allTeacherIdsInAClass.filter(thisIdExist);
        if (!isIdExist.length) {
            throw new Error("This teacher doesn't belong to this class");
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
        UPDATE teacher 
        set class_id = NULL
        WHERE id = ${teacher_id};
        `)
        res.status(200).send({
            message: `The teacher was removed from his class`
        })


    } catch (error) {
        res.send(error.message || error.sqlMessage)
    }
}