import React, { useState, useRef } from "react";
import { ITodo } from "../interfaces";
import { TodoFormInCard } from "./TodoFormInCard";
import { TodoListInCard } from "./todoListInCard";
import { useDrag, useDrop } from 'react-dnd';


interface TodoCardProps {
    ind: number
    onAdd(cardId: number, title: string): void
    todos: ITodo[],
    onToggle(cardId: number, id: number): void, // onToggle: (id: number) => void
    onRemove(cardId: number, todoId: number): void,
    onRemoveCard(cardId: number): void,
    onDragDrop(dragId: number, hoverId: number): void
}

export const TodoCard: React.FC<TodoCardProps> = ({ ind, onAdd, todos, onToggle, onRemove, onRemoveCard, onDragDrop }) => { //<{ onAdd(title: string): void }> = (props) => {

    // useDrag - the list item is draggable
    const [{ isDragging }, dragRef] = useDrag({
        type: 'card',
        item: { ind },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item: { ind: number }, monitor) => {
            const didDrop = monitor.didDrop()
            if (!didDrop) {
                onDragDrop(item.ind, ind)
                console.log("END")
            }
        }
    })


    // useDrop - the list item is also a drop area
    const [spec, dropRef] = useDrop({
        accept: 'card',
        hover: (item: { ind: number }) => {
            const dragIndex = item.ind
            const hoverIndex = ind
            console.log(item.ind);

            if (dragIndex !== hoverIndex) onDragDrop(dragIndex, hoverIndex);
            item.ind = hoverIndex;
            console.log(item.ind);

            // moveListItem(dragIndex, hoverIndex)
            //car.index = hoverIndex
        },
    })
    const opacity = (isDragging) ? 0.5 : 1

    return (
        <>
            <div ref={(node) => dragRef(dropRef(node))} className='z-depth-3' style={{
                maxWidth: '400px', minHeight: '400px',
                borderRadius: '10px', background: '#CCFF66',
                padding: '5px', paddingTop: '5px', margin: '10px', opacity
            }}>

                <div className='buttonField'>
                    <div className="cl-btn-7" onClick={() => onRemoveCard(ind)}></div>
                </div>

                <div style={{ borderRadius: '5px', background: 'white', padding: '5px' }}>
                    <TodoFormInCard ind={ind} onAdd={onAdd} />
                    <TodoListInCard ind={ind} todos={todos} onToggle={onToggle} onRemove={onRemove} />

                </div>
            </div>




        </>
    )
} 