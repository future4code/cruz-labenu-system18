"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
        throw new Error('email format is incorrect. email@anystring.anystring');
    }
    // return re.test(email);
}
exports.default = isValidEmail;
