import React from "react";
import { ITodo } from "../interfaces";

type TodoListProps = {
    todos: ITodo[],
    ind: number
    onToggle(cardId: number, id: number): void, // onToggle: (id: number) => void
    onRemove(cardId: number, todoId: number): void
}

export const TodoListInCard: React.FC<TodoListProps> = (props) => {//({ todos, onToggle, onRemove }) => {
    if (props.todos.length === 0) {
        return (
            <p className="center">Список дел пуст!</p>
        )
    }

    const removeHandler = (event: React.MouseEvent, cardId: number, todoId: number) => {
        event.preventDefault();
        props.onRemove(cardId, todoId);
    }

    return (
        <ul>
            {props.todos.map((todo) => {
                const liClass: string[] = ['todo']
                if (todo.completed) liClass.push('completed')
                return (
                    <li className={liClass.join(' ')} key={todo.id}>
                        <label >
                            {/* <input type="checkbox" defaultChecked={todo.completed}
                            /> */}
                            <input type="checkbox" checked={todo.completed}
                                onChange={() =>

                                    props.onToggle(props.ind, todo.id)
                                } />
                            <span style={{ width: '80%', height: 'auto', display: 'block', wordWrap: 'break-word' }}>{todo.title}</span>
                            {/* <i className="material-icons red-text">delete</i> */}
                            <i className="material-icons red-text" onClick={(event) => removeHandler(event, props.ind, todo.id)}>delete</i>
                        </label>
                    </li>
                )
            })}
            {/* onToggle.bind(null, todo.id) */}
        </ul >
    )
}