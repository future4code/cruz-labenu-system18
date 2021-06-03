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

 