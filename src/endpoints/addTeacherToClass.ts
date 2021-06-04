import {Request, Response} from 'express'
import connection from '../connection'

export const addTeacherToClass = async (req: Request, res: Response) => {
    try {
        
        let { class_id } = req.body 
        let  { teacherId }  = req.params 
        
        const result = await connection.raw(`
        UPDATE teacher
        SET class_id = "${class_id}"
        WHERE id = "${teacherId}"
    `)
    if(result[0].changedRows === 0) {
        throw new Error("Sem alterações, id da turma ou professor invalidos")
    } else  {
        res.status(201).send("Professor adicionado com sucesso a turma !")
    }  
        
    } catch (err) {
        if (err.message.includes("falha na chave estrangeira")) {  
            res.status(400).send("Turma não existe.");  
     } else {
        res.status(500).send({message: err.message})
     }
        
    }
}