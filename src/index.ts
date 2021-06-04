import express, { Express, Request, Response } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import deleteStudents from "./endpoints/deleteStudents";
import connection from "./connection";
import getAllClasses from "./endpoints/getAllClasses";
import getAllTeachers from "./endpoints/getAllTeachers";
import getAllStudents from "./endpoints/getAllStudents";
import getStudentByClass from "./endpoints/getStudentByClass";
import getAge from "./endpoints/getAge";

import seeStudentHobbie from "./endpoints/seeStudentHobbie";

import createClass from "./endpoints/createClass";
import createStudent from "./endpoints/createStudent";

import { addTeacherToClass } from "./endpoints/addTeacherToClass";
import { addStudentToClass } from "./endpoints/addStudentToClass";


import createTeacher from "./endpoints/createTeacher";


export type Class = {
  name: string;
  start_date: Date;
  end_date: Date;
  module: number;
};

const app: Express = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Ping Pong!!!");
});

app.get("/teacher", getAllTeachers);



const server = app.listen(process.env.PORT || 3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
   } else {
      console.error(`Failure upon starting server.`);
   }
});

app.get("/class", getAllClasses);


app.get("/student", getAllStudents);

app.get("/student/age/:id", getAge);

app.get("/student/class/:idClass", getStudentByClass);

app.get("/student/:id", seeStudentHobbie);

app.post("/teacher", createTeacher);

app.post("/student", createStudent);

app.post("/class", createClass);

app.delete("/student/:id", deleteStudents);


app.post('/class',createClass)

app.put('/teacher/edit/:teacherId',addTeacherToClass )

app.put('/student/edit/:studentId',addStudentToClass )

