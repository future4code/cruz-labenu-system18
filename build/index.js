"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const deleteStudents_1 = __importDefault(require("./endpoints/deleteStudents"));
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
app.get('/', (req, res) => { res.send('Ping Pong!!!'); });
