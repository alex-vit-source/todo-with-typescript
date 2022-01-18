import React from "react";
import { ITodo } from "../interfaces";
import { useDrag } from 'react-dnd';

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
            {props.todos.map((todo, index) => {
                const liClass: string[] = ['todo']
                if (todo.completed) liClass.push('completed')


                return (
                    <div key={index}>
                        <li className={liClass.join(' ')} key={todo.id}>
                            {/* ref={dragRef}> */}
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
                    </div>
                )
            })}
            {/* onToggle.bind(null, todo.id) */}
        </ul >
    )
}