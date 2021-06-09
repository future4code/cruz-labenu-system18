
export default function isValidName(name:string):void {
    let reg2 = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if(!reg2.test(name)){
        throw new Error('Incorrect name format( Name LastName ). "Ex: Jorge Santos"  ')
    }
}

