import { Request, Response } from "express";
import connection from "../connection";
import { classroom } from "../types";
import { dateValidations, isClassNameValid } from "../validations/classValidations";
// import { isClassNameValid } from "../validations/isValidName";


export default async function (req:Request,res:Response):Promise<void>  {
    try {
       let {name,start_date,end_date,module, na_night} = req.body
       if (!name) {
         throw new Error("name is missing")
     }
     if (!start_date) {
         throw new Error("start_date is missing")
     }
     if (!end_date) {
         throw new Error("end_date is missing")
     }
     if (!module && module!=0) {
         throw new Error("module is missing")
     }
     isClassNameValid(name)
     dateValidations(start_date,end_date)
     if(module<0 || module>7){
        throw new Error("Module must be between 0 and 7.")
     }
     if(na_night) {
        name = name + "_na_night"
     }

     const classroom:classroom = {
        name,start_date,end_date,module
     }
       const result = await connection.raw(`
       INSERT  INTO class (name,start_date,end_date,module) 
       VALUES ("${name}","${start_date}","${end_date}","${module}");`)
       res.status(200).send({
          message: "Class created",
          classroom
       })
    } catch (error) {
       res.send(error.message || error.sqlMessage)
    }
 }