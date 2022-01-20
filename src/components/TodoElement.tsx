import React from "react";
import { ITodo } from "../interfaces";
import { useDrag, useDrop } from 'react-dnd';

type TodoProps = {

    todo: ITodo,
    indCard: number,
    indTodo: number,
    onToggle(cardId: number, id: number): void, // onToggle: (id: number) => void
    removeHandler(event: React.MouseEvent, cardId: number, todoId: number): void
    onDndTodo(cardDragId: number, cardHoverId: number, todoDrugId: number, todoHoverId: number): void// Drag&Drop
}

export const TodoElement: React.FC<TodoProps> = ({ todo, indCard, indTodo, onToggle, removeHandler, onDndTodo }) => {

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
            // console.log(`dragCardIndex ${dragCardIndex}`);
            // console.log(`dragTodoIndex ${dragTodoIndex}`);
            // console.log(`hoverCardIndex ${hoverCardIndex}`);
            // console.log(`hoverTodoIndex ${hoverTodoIndex}`);
            // console.log(isOverCur);

            if ((dragCardIndex !== hoverCardIndex) || (dragTodoIndex !== hoverTodoIndex)) onDndTodo(dragCardIndex, hoverCardIndex, dragTodoIndex, hoverTodoIndex);
            item.indCard = hoverCardIndex;
            item.indTodo = hoverTodoIndex;
            // console.log(item.ind);




            // moveListItem(dragIndex, hoverIndex)
            //car.index = hoverIndex
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    })
    const opacity = (isOver) ? 0 : 1



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

                            onToggle(indCard, todo.id)
                        } />
                    <span style={{ width: '80%', height: 'auto', display: 'block', wordWrap: 'break-word' }}>{todo.title}</span>
                    {/* <i className="material-icons red-text">delete</i> */}
                    <i className="material-icons red-text" onClick={(event) => removeHandler(event, indCard, todo.id)}>delete</i>
                </label>
            </li>
        </div>
    )
}//({ todos, onToggle, onRemove }) => {}