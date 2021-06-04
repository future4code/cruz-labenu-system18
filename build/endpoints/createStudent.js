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
const connection_1 = __importDefault(require("../connection"));
const isValidClass_1 = __importDefault(require("../validations/isValidClass"));
const isValidDate_1 = __importDefault(require("../validations/isValidDate"));
const isValidEmail_1 = __importDefault(require("../validations/isValidEmail"));
const isValidName_1 = __importDefault(require("../validations/isValidName"));
function createStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, birth_date, class_id } = req.body;
            const student = { name, email, birth_date, class_id };
            if (!name) {
                throw new Error("name is missing");
            }
            if (!email) {
                throw new Error("email is missing");
            }
            if (!birth_date) {
                throw new Error("birth_date is missing");
            }
            if (!class_id) {
                throw new Error("class_id is missing");
            }
            isValidEmail_1.default(email);
            isValidDate_1.default(birth_date);
            isValidName_1.default(name);
            isValidClass_1.default(req, res);
            yield connection_1.default.raw(`
       INSERT INTO student (name,email,birth_date,class_id) 
       VALUES ("${name}","${email}","${birth_date}","${class_id}");`);
            res.status(200).send({
                message: "New student created.",
                student,
            });
        }
        catch (error) {
            res.send(error.message || error.sqlMessage);
        }
    });
}
exports.default = createStudent;
