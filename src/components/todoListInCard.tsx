import React from "react";
import { ITodo } from "../interfaces";
import { useDrop } from 'react-dnd';
import { TodoElement } from "./TodoElement";
import todostore from '../store/todostore';
import { observer } from 'mobx-react-lite';

type TodoListProps = {
    todos: ITodo[],
    ind: number
}

export const TodoListInCard: React.FC<TodoListProps> = observer(({ todos, ind }) => {
    /////////////////////////////////////////////////////////////////////////////
    const [{ isOver }, dropRef] = useDrop({
        accept: 'todo',
        drop: (item: { indCard: number, indTodo: number }, monitor) => {
            //const isOverCur = monitor.isOver({ shallow: true })
            const dragCardIndex = item.indCard;
            const dragTodoIndex = item.indTodo;
            const hoverCardIndex = ind;
            todostore.dndTodoHandler(dragCardIndex, hoverCardIndex, dragTodoIndex, 0);
            //props.onDndTodo(dragCardIndex, hoverCardIndex, dragTodoIndex, 0);

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
    if (todos.length === 0) {
        return (
            <>
                <p ref={dropRef} className="center" >{isOver ? 'Drop Here!' : 'Список дел пуст!'}</p>
            </>
        )
    }

    // const removeHandler = (event: React.MouseEvent, cardId: number, todoId: number) => {
    //     event.preventDefault();
    //     props.onRemove(cardId, todoId);
    // }
    // //DND
    // const DndTodoHandler = (event: React.MouseEvent, cardId: number, todoId: number) => {
    //     event.preventDefault();
    //    // props.onDndTodo(cardId, todoId);
    // }


    return (
        <ul>
            {todos.map((todo, index) =>
                <TodoElement key={todo.id}
                    todo={todo}
                    indCard={ind}
                    indTodo={index}
                />

            )}
            {/* onToggle.bind(null, todo.id) */}
        </ul >
    )
})