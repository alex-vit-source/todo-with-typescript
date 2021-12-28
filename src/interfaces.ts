export interface ITodo {
    title: string,
    id: number,
    completed: boolean
}

export type TTodos = ITodo[]



export type TCards = TTodos[] | []


