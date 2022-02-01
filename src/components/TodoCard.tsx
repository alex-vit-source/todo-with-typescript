import React, { useState, useRef } from "react";
import { ITodo } from "../interfaces";
import { TodoFormInCard } from "./TodoFormInCard";
import { TodoListInCard } from "./todoListInCard";
import { useDrag, useDrop } from 'react-dnd';
import todostore from '../store/todostore';
import { observer } from 'mobx-react-lite';

interface TodoCardProps {
    ind: number
    onAdd(cardId: number, title: string): void
    todos: ITodo[],
    onToggle(cardId: number, id: number): void, // onToggle: (id: number) => void
    onRemove(cardId: number, todoId: number): void,
    onRemoveCard(cardId: number): void,
    onDragDrop(dragId: number, hoverId: number): void
    onDndTodo(cardDragId: number, cardHoverId: number, todoDrugId: number, todoHoverId: number): void// Drag&Drop
}

export const TodoCard: React.FC<TodoCardProps> = observer(({ ind, onAdd, todos, onToggle, onRemove, onRemoveCard, onDragDrop, onDndTodo }) => { //<{ onAdd(title: string): void }> = (props) => {

    // useDrag - the list item is draggable
    const [{ isDragging }, dragRef] = useDrag({
        type: 'card',
        item: { ind },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),


    })


    // useDrop - the list item is also a drop area
    const [{ canDrop, isOver }, dropRef] = useDrop({
        accept: 'card',
        hover: (item: { ind: number }, monitor) => {
            const isOverCur = monitor.isOver({ shallow: true })
            const dragIndex = item.ind
            const hoverIndex = ind
            console.log(isOverCur);

            if (dragIndex !== hoverIndex) onDragDrop(dragIndex, hoverIndex);
            item.ind = hoverIndex;
            console.log(item.ind);




            // moveListItem(dragIndex, hoverIndex)
            //car.index = hoverIndex
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    })
    const opacity = (isOver) ? 0 : 1

    return (
        <>
            <div ref={(node) => dragRef(dropRef(node))} className='z-depth-3' style={{
                maxWidth: '400px', minHeight: '400px',
                borderRadius: '10px', background: '#CCFF66',
                padding: '5px', paddingTop: '5px', margin: '10px', opacity
            }}>

                <div className='buttonField'>
                    <div className="cl-btn-7" onClick={() => todostore.removeCardHandler(ind)}></div>
                </div>

                <div style={{ borderRadius: '5px', background: 'white', padding: '5px' }}>
                    <TodoFormInCard ind={ind} onAdd={onAdd} />
                    <TodoListInCard ind={ind} todos={todos} onToggle={onToggle} onRemove={onRemove} onDndTodo={onDndTodo} />

                </div>
            </div>




        </>
    )
})






// import React, { useState, useRef } from "react";
// import { ITodo } from "../interfaces";
// import { TodoFormInCard } from "./TodoFormInCard";
// import { TodoListInCard } from "./todoListInCard";
// import { useDrag, useDrop } from 'react-dnd';
// import todostore from '../store/todostore';
// import { observer } from 'mobx-react-lite';

// interface TodoCardProps {
//     ind: number
//     onAdd(cardId: number, title: string): void
//     todos: ITodo[],
//     onToggle(cardId: number, id: number): void, // onToggle: (id: number) => void
//     onRemove(cardId: number, todoId: number): void,
//     onRemoveCard(cardId: number): void,
//     onDragDrop(dragId: number, hoverId: number): void
//     onDndTodo(cardDragId: number, cardHoverId: number, todoDrugId: number, todoHoverId: number): void// Drag&Drop
// }

// export const TodoCard: React.FC<TodoCardProps> = observer(({ ind, onAdd, todos, onToggle, onRemove, onRemoveCard, onDragDrop, onDndTodo }) => { //<{ onAdd(title: string): void }> = (props) => {

//     // useDrag - the list item is draggable
//     const [{ isDragging }, dragRef] = useDrag({
//         type: 'card',
//         item: { ind },
//         collect: (monitor) => ({
//             isDragging: monitor.isDragging(),
//         }),


//     })


//     // useDrop - the list item is also a drop area
//     const [{ canDrop, isOver }, dropRef] = useDrop({
//         accept: 'card',
//         hover: (item: { ind: number }, monitor) => {
//             const isOverCur = monitor.isOver({ shallow: true })
//             const dragIndex = item.ind
//             const hoverIndex = ind
//             console.log(isOverCur);

//             if (dragIndex !== hoverIndex) onDragDrop(dragIndex, hoverIndex);
//             item.ind = hoverIndex;
//             console.log(item.ind);




//             // moveListItem(dragIndex, hoverIndex)
//             //car.index = hoverIndex
//         },
//         collect: (monitor) => ({
//             isOver: monitor.isOver(),
//             canDrop: monitor.canDrop()
//         })
//     })
//     const opacity = (isOver) ? 0 : 1

//     return (
//         <>
//             <div ref={(node) => dragRef(dropRef(node))} className='z-depth-3' style={{
//                 maxWidth: '400px', minHeight: '400px',
//                 borderRadius: '10px', background: '#CCFF66',
//                 padding: '5px', paddingTop: '5px', margin: '10px', opacity
//             }}>

//                 <div className='buttonField'>
//                     <div className="cl-btn-7" onClick={() => onRemoveCard(ind)}></div>
//                 </div>

//                 <div style={{ borderRadius: '5px', background: 'white', padding: '5px' }}>
//                     <TodoFormInCard ind={ind} onAdd={onAdd} />
//                     <TodoListInCard ind={ind} todos={todos} onToggle={onToggle} onRemove={onRemove} onDndTodo={onDndTodo} />

//                 </div>
//             </div>




//         </>
//     )
// })