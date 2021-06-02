import express, { Express, Request, Response } from "express"
import cors from "cors"
import { AddressInfo } from "net"
import connection from "./connection";

export type Class = {
name:string,
start_date:Date,
end_date:Date,
module: number
}

const app: Express = express();
app.use(express.json());
app.use(cors())


const server = app.listen(process.env.PORT || 3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
   } else {
      console.error(`Failure upon starting server.`);
   }
});

app.get('/', async (req, res) => { res.send('Ping Pong!!!') })

app.get('/teacher',async (req:Request,res:Response):Promise<void> => {
   try {
      const [result] = await connection.raw(`
      SELECT * FROM teacher;
      `)
      
      res.status(200).send(result)
   } catch (error) {
      console.log(error)
      res.send(error.message || error.sqlMessage)
   }
})

app.get('/class',async (req:Request,res:Response):Promise<void> => {
   try {
      const [result] = await connection.raw(`
      SELECT * FROM class;
      `)
      
      res.status(200).send(result)
   } catch (error) {
      console.log(error)
      res.send(error.message || error.sqlMessage)
   }
})

app.get('/student',async (req:Request,res:Response):Promise<void> => {
   try {
      const [result] = await connection.raw(`
      SELECT * FROM student;
      `)
      
      res.status(200).send(result)
   } catch (error) {
      console.log(error)
      res.send(error.message || error.sqlMessage)
   }
})

app.post('/teacher',async (req:Request,res:Response):Promise<void> => {
   try {
      const {name,email,birth_date,class_id} = req.body
      const result = await connection.raw(`
      INSERT  INTO teacher (name,email,birth_date,class_id) 
      VALUES ("${name}","${email}","${birth_date}","${class_id}");`)
      res.status(200).send(result)
   } catch (error) {
      console.log(error)
      res.send(error.message || error.sqlMessage)
   }
})

app.post('/student',async (req:Request,res:Response):Promise<void> => {
   try {
      const {name,email,birth_date,class_id} = req.body
      const result = await connection.raw(`
      INSERT INTO student (name,email,birth_date,class_id) 
      VALUES ("${name}","${email}","${birth_date}","${class_id}");`)
      res.status(200).send(result[1])
   } catch (error) {
      console.log(error)
      res.send(error.message || error.sqlMessage)
   }
})

app.post('/class',async (req:Request,res:Response):Promise<void> => {
   try {
      const {name,start_date,end_date,module} = req.body
      const result = await connection.raw(`
      INSERT  INTO class (name,start_date,end_date,module) 
      VALUES ("${name}","${start_date}","${end_date}","${module}");`)
      res.status(200).send(result)
   } catch (error) {
      console.log(error)
      res.send(error.message || error.sqlMessage)
   }
})