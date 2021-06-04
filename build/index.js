"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const deleteStudents_1 = __importDefault(require("./endpoints/deleteStudents"));
const connection_1 = __importDefault(require("./connection"));
const getAllClasses_1 = __importDefault(require("./endpoints/getAllClasses"));
const getAllTeachers_1 = __importDefault(require("./endpoints/getAllTeachers"));
const getAllStudents_1 = __importDefault(require("./endpoints/getAllStudents"));
const seeStudentHobbie_1 = __importDefault(require("./endpoints/seeStudentHobbie"));
const createClass_1 = __importDefault(require("./endpoints/createClass"));
const createStudent_1 = __importDefault(require("./endpoints/createStudent"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.delete("/student/:id", deleteStudents_1.default);
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address();
        console.log(`Server is running in http://localhost:${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () { res.send('Ping Pong!!!'); }));
app.get('/teacher', getAllTeachers_1.default);
app.get('/class', getAllClasses_1.default);
app.get('/student', getAllStudents_1.default);
app.get('/student/:id', seeStudentHobbie_1.default);
app.post('/teacher', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, birth_date, class_id } = req.body;
        const result = yield connection_1.default.raw(`
      INSERT  INTO teacher (name,email,birth_date,class_id) 
      VALUES ("${name}","${email}","${birth_date}","${class_id}");`);
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.send(error.message || error.sqlMessage);
    }
}));
app.post('/student', createStudent_1.default);
app.post('/class', createClass_1.default);
