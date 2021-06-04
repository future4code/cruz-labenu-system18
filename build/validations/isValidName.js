"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidName(name) {
    let reg2 = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!reg2.test(name)) {
        throw new Error('Incorrect name format( Name LastName ). "Ex: Jorge Santos"  ');
    }
}
exports.default = isValidName;
