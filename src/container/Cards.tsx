import React, { useState, useEffect } from 'react';
import { TodoFormInCard } from '../components/TodoFormInCard';
import { TodoListInCard } from '../components/todoListInCard';
import { ITodo, TTodos, TCards } from '../interfaces';

declare var confirm: (str: string) => boolean;

export const Cards: React.FC = () => {

    const [cards, setCards] = useState<TTodos[]>(
        [
            [
                {
                    title: 'Test',
                    id: Date.now(),
                    completed: false
                },
                {
                    title: 'Test2',
                    id: Date.now() + 1,
                    completed: false
                }
            ],
            [
                {
                    title: 'Test3',
                    id: Date.now(),
                    completed: false
                },
                {
                    title: 'Test4',
                    id: Date.now() + 1,
                    completed: false
                }
            ]
        ]
    )
    //const [todos, setTodos] = useState<ITodo[]>([])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cards') || '[]') as TTodos[]
        setCards(data)
    }, [])

    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards))
    }, [cards])

    const addCardHandler = () => {

        const newCard: TTodos =

            [
                {
                    title: 'Test5',
                    id: Date.now(),
                    completed: false
                }

            ];
        let tempCards = cards;
        tempCards.push(newCard);
        //setTodos([newTodo, ...todos])
        //setCards(tempCards)// setCards(prev => [newCard, ...prev])
        setCards(prev => [...tempCards]);
    }

    const addHandler = (cardId: number, title: string) => {

        const newTodo: ITodo = {
            title: title,
            id: Date.now(),
            completed: false
        }
        //setTodos([newTodo, ...todos])
        let tempCards = cards.map((item, index) => {
            if (cardId === index) {
                item.push(newTodo);
            }
            return item
        });

        setCards(prev => tempCards)
    }

    // const addHandler = (id: number, title: string) => {

    //     const newTodo: ITodo = {
    //         title: title,
    //         id: Date.now(),
    //         completed: false
    //     }
    //     //setTodos([newTodo, ...todos])
    //     setCards(prev => [newTodo, ...prev])
    // }

    // const toggleHandler = (id: number) => {

    //     const temp: ITodo[] = todos;
    //     temp.forEach(todo => {
    //         if (todo.id === id) {
    //             todo.completed = !todo.completed;
    //         }
    //     });
    //     setTodos([...temp]);
    // }

    // const removeHandler = (id: number) => {
    //     const remove = confirm('Вы уверены что хотите удалить эту запись?') // window.confirm('Вы уверены что хотите удалить эту запись?')
    //     if (remove) setTodos(prev => prev.filter(todo => todo.id !== id))
    // }

    return (
        <>
            <button className='btn' onClick={addCardHandler}>ADD</button>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {cards.map((item, index) => {

                    return (
                        <div key={index} className='z-depth-3' style={{
                            maxWidth: '400px', minHeight: '400px',
                            borderRadius: '10px', background: '#CCFF66',
                            padding: '5px', paddingTop: '5px', margin: '10px'
                        }}>

                            <div className='buttonField'>
                                <div className="cl-btn-7"></div>
                            </div>

                            <div style={{ borderRadius: '5px', background: 'white', padding: '5px' }}>
                                <TodoFormInCard ind={index} onAdd={addHandler} />
                                <TodoListInCard todos={item} />
                                {/* <TodoList todos={item} onToggle={toggleHandler} onRemove={removeHandler} /> */}
                            </div>
                        </div>
                    )
                })}
            </div>



        </>
    );
}


