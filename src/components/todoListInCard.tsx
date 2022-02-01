import React from "react";
import { ITodo } from "../interfaces";
import { useDrop } from 'react-dnd';
import { TodoElement } from "./TodoElement";

type TodoListProps = {
    todos: ITodo[],
    ind: number
    onToggle(cardId: number, id: number): void, // onToggle: (id: number) => void
    onRemove(cardId: number, todoId: number): void
    onDndTodo(cardDragId: number, cardHoverId: number, todoDrugId: number, todoHoverId: number): void// Drag&Drop
}

export const TodoListInCard: React.FC<TodoListProps> = (props) => {//({ todos, onToggle, onRemove }) => {
    /////////////////////////////////////////////////////////////////////////////
    const [{ isOver }, dropRef] = useDrop({
        accept: 'todo',
        drop: (item: { indCard: number, indTodo: number }, monitor) => {
            //const isOverCur = monitor.isOver({ shallow: true })
            const dragCardIndex = item.indCard;
            const dragTodoIndex = item.indTodo;
            const hoverCardIndex = props.ind;

            props.onDndTodo(dragCardIndex, hoverCardIndex, dragTodoIndex, 0);

            // console.log(item.ind);




            // moveListItem(dragIndex, hoverIndex)
            //car.index = hoverIndex
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            //canDrop: monitor.canDrop()
        })
    })

    ///////////////////////////////////////////////////////////////////////////////
    if (props.todos.length === 0) {
        return (
            <>


                <p ref={dropRef} className="center" >{isOver ? 'Drop Here!' : 'Список дел пуст!'}</p>

                {/* {isOver && <div>Drop Here!</div>} */}
            </>
        )
    }

    const removeHandler = (event: React.MouseEvent, cardId: number, todoId: number) => {
        event.preventDefault();
        props.onRemove(cardId, todoId);
    }
    // //DND
    // const DndTodoHandler = (event: React.MouseEvent, cardId: number, todoId: number) => {
    //     event.preventDefault();
    //    // props.onDndTodo(cardId, todoId);
    // }


    return (
        <ul>
            {props.todos.map((todo, index) =>
                <TodoElement
                    todo={todo}
                    indCard={props.ind}
                    indTodo={index}
                    onToggle={props.onToggle}
                    removeHandler={removeHandler}
                    onDndTodo={props.onDndTodo} />

            )}
            {/* onToggle.bind(null, todo.id) */}
        </ul >
    )
}