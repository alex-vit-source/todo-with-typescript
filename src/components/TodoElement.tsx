import React from "react";
import { ITodo } from "../interfaces";
import { useDrag, useDrop } from 'react-dnd';
import todostore from '../store/todostore';
import { observer } from 'mobx-react-lite';
import { TodoBox } from '../components/TodoBox';

type TodoProps = {
    todo: ITodo,
    indCard: number,
    indTodo: number,
}

export const TodoElement: React.FC<TodoProps> = observer(({ todo, indCard, indTodo }) => {

    // useDrag - the list item is draggable
    const [{ isDragging }, dragRef] = useDrag({
        type: 'todo',
        item: { indCard, indTodo },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })


    // useDrop - the list item is also a drop area
    const [{ canDrop, isOver }, dropRef] = useDrop({
        accept: 'todo',
        hover: (item: { indCard: number, indTodo: number }, monitor) => {
            const isOverCur = monitor.isOver({ shallow: true })
            const dragCardIndex = item.indCard;
            const dragTodoIndex = item.indTodo;
            const hoverCardIndex = indCard;
            const hoverTodoIndex = indTodo;
            if ((dragCardIndex !== hoverCardIndex) || (dragTodoIndex !== hoverTodoIndex)) todostore.dndTodoHandler(dragCardIndex,
                hoverCardIndex,
                dragTodoIndex,
                hoverTodoIndex);
            item.indCard = hoverCardIndex;
            item.indTodo = hoverTodoIndex;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    })
    const opacity = (isOver) ? 0 : 1

    ////////////////////////////////////



    /////////////////////////////////////////


    const liClass: string[] = ['todo']

    if (todo.completed) liClass.push('completed')


    return (
        <div key={indTodo} ref={(node) => dragRef(dropRef(node))} style={{ opacity }}>
            <li className={liClass.join(' ')} key={todo.id}>
                {/* ref={dragRef}> */}
                <label >
                    {/* <input type="checkbox" defaultChecked={todo.completed}
                /> */}
                    <input type="checkbox" checked={todo.completed}
                        onChange={() =>
                            todostore.toggleHandler(indCard, todo.id)
                            // onToggle(indCard, todo.id)
                        } />
                    <span onClick={() => { console.log(`Open OverBox Card=${indCard} ToDo=${todo.id}`) }} style={{ width: '80%', height: 'auto', display: 'block', wordWrap: 'break-word' }}>{todo.title}</span>
                    {/* <i className="material-icons red-text">delete</i> */}
                    <i className="material-icons red-text" onClick={(event) => todostore.removeHandler(event, indCard, todo.id)}>delete</i>
                </label>
            </li>
        </div>
    )
})//({ todos, onToggle, onRemove }) => {}