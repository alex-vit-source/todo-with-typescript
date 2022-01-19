import React from "react";
import { ITodo } from "../interfaces";
import { useDrag } from 'react-dnd';
import { TodoElement } from "./TodoElement";

type TodoListProps = {
    todos: ITodo[],
    ind: number
    onToggle(cardId: number, id: number): void, // onToggle: (id: number) => void
    onRemove(cardId: number, todoId: number): void
    onDndTodo(cardId: number, todoId: number): void// Drag&Drop
}

export const TodoListInCard: React.FC<TodoListProps> = (props) => {//({ todos, onToggle, onRemove }) => {
    if (props.todos.length === 0) {
        return (
            <p className="center">Список дел пуст!</p>
        )
    }
    const temptodo = props.todos;
    const tempind = props.ind;

    const removeHandler = (event: React.MouseEvent, cardId: number, todoId: number) => {
        event.preventDefault();
        props.onRemove(cardId, todoId);
    }
    //DND
    const DndTodoHandler = (event: React.MouseEvent, cardId: number, todoId: number) => {
        event.preventDefault();
        props.onDndTodo(cardId, todoId);
    }


    return (
        <ul>
            {props.todos.map((todo, index) =>
                <TodoElement todo={todo}
                    indCard={props.ind}
                    indTodo={index}
                    onToggle={props.onToggle}
                    removeHandler={removeHandler}
                    onDndTodo={DndTodoHandler} />

            )}
            {/* onToggle.bind(null, todo.id) */}
        </ul >
    )
}