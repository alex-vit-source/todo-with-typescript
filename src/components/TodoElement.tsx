import React from "react";
import { ITodo } from "../interfaces";
import { useDrag } from 'react-dnd';

type TodoProps = {
    todos: ITodo[],
    indCard: number,
    indTodo: number,
    onToggle(cardId: number, id: number): void, // onToggle: (id: number) => void
    onRemove(cardId: number, todoId: number): void
    onDndTodo(cardId: number, todoId: number): void// Drag&Drop
}

export const TodoElement: React.FC<TodoProps> = ({ todos, onToggle, onRemove, onDndTodo }) => {


}//({ todos, onToggle, onRemove }) => {}