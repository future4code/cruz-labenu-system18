import {Request, Response} from 'express'
import connection from '../connection'

export const addStudentToClass = async (req: Request, res: Response) => {
    try {
        
        let { class_id } = req.body 
        let  { studentId }  = req.params 
        
        const result = await connection.raw(`
        UPDATE student
        SET class_id = "${class_id}"
        WHERE id = "${studentId}"
    `)
    if(result[0].changedRows === 0) {
        throw new Error("Sem alterações, id da turma ou aluno invalidos")
    } else  {
        res.status(201).send("Estudante adicionado com sucesso a turma !")
    }  
        
    } catch (err) {
        if (err.message.includes("falha na chave estrangeira")) {  
            res.status(400).send("Turma não existe.");  
     } else {
        res.status(500).send({message: err.message})
     }
        
    }
}