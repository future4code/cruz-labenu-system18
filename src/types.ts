export type student = {
    id?: number,
    name: string,
    email: string,
    birth_date: Date,
    class_id: number,
 }

 export type teacher = {
   id?: number,
   name: string,
   email: string,
   birth_date: Date,
   class_id: number,
}


export type classroom = {
   name: string,
   start_date: string,
   end_date: Date,
   module: number,
}

 export type classInfo = {
   id?: number,
   name: string,
   start_date: Date,
   end_date: Date,
   module: number
 }

 