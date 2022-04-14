export interface ITodo {
    title: string,
    id: number,
    completed: boolean
}

export type TTodos = ITodo[]



export type TCards = TTodos[] | []


export interface Table {
    id: number,
    name: string,              //Рабочий стол
    ttodos: TCards,
    shareTo: string[],
}

export interface Coworkers {
    email: string,
    tables: string[],   //id ли названия таблиц
}

export interface AllTables {
    myTables: Table[],
    accessTo: Coworkers[]
}




