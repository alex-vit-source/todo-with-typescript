import React from "react";
import { ITodo } from "../interfaces";

type TodoListProps = {
    todos: ITodo[],
    onToggle(id: number): void, // onToggle: (id: number) => void
    onRemove(id: number): void
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onRemove }) => {
    if (todos.length === 0) {
        return (
            <p className="center">Список дел пуст!</p>
        )
    }

    const removeHandler = (event: React.MouseEvent, id: number) => {
        event.preventDefault();
        onRemove(id);
    }

    return (
        <ul>
            {todos.map((todo) => {
                const liClass: string[] = ['todo']
                if (todo.completed) liClass.push('completed')
                return (
                    <li className={liClass.join(' ')} key={todo.id}>
                        <label>
                            <input type="checkbox" checked={todo.completed} onChange={() =>

                                onToggle(todo.id)
                            } />
                            <span>{todo.title}</span>
                            <i className="material-icons red-text" onClick={(event) => removeHandler(event, todo.id)}>delete</i>
                        </label>
                    </li>
                )
            })}
            {/* onToggle.bind(null, todo.id) */}
        </ul>
    )
}