import React, { useState, useEffect } from 'react';
import { TodoFormInCard } from '../components/TodoFormInCard';
import { TodoListInCard } from '../components/todoListInCard';
import { TodoCard } from '../components/TodoCard';
import { ITodo, TTodos, TCards } from '../interfaces';
import { createTypeReferenceDirectiveResolutionCache } from 'typescript';


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

    const toggleHandler = (cardId: number, todoId: number) => {
        console.log(`${cardId} cardId`);
        console.log(`${todoId} todoId`);
        let tempTodos = cards.map((item, index) => {
            if (cardId === index) {
                console.log(item);
                item.forEach(todo => {
                    if (todo.id === todoId) {
                        todo.completed = !todo.completed;
                    }
                });
            }
            return item
        });
        setCards([...tempTodos]);


        // const temp: ITodo[] = cards[cardId];
        // temp.forEach(todo => {
        //     if (todo.id === todoId) {
        //         todo.completed = !todo.completed;
        //     }
        // });
        // setCards([...temp]);
    }

    const removeHandler = (cardId: number, todoId: number) => {
        const remove = confirm('Вы уверены что хотите удалить эту запись?') // window.confirm('Вы уверены что хотите удалить эту запись?')
        if (remove) setCards(prev => {
            let tempTodos = prev.map((item, index) => {
                if (cardId === index) {
                    return item.filter(todo => todo.id !== todoId)
                }
                return item
            })
            return tempTodos
        })
    }

    const removeCardHandler = (cardId: number) => {
        const remove = confirm('Вы уверены что хотите удалить эту карточку?') // window.confirm('Вы уверены что хотите удалить эту запись?')
        if (remove) setCards(prev => prev.filter((item, index) => index !== cardId))
    }

    /////////////////////////////////////////////////////////////////
    const dndCardHandler = (dragId: number, hoverId: number) => {
        const drugCard = cards[dragId];
        const hoverCard = cards[hoverId];


        setCards(prev => {
            const updatedCard = [...cards];
            updatedCard[hoverId] = drugCard;
            updatedCard[dragId] = hoverCard;
            return updatedCard;
        })
    }
    let countOne = 0;
    let countTwo = 0;
    let countThree = 0;

    const dndTodoHandler = (cardDragId: number, cardHoverId: number, todoDrugId: number, todoHoverId: number) => {

        // console.log(`dragCardIndex ${cardDragId}`);
        // console.log(`dragTodoIndex ${todoDrugId}`);
        // console.log(`hoverCardIndex ${cardHoverId}`);
        // console.log(`hoverTodoIndex ${todoHoverId}`);


        const drugTodo = cards[cardDragId][todoDrugId];
        const hoverTodo = cards[cardHoverId][todoHoverId];

        if (cardDragId === cardHoverId) {
            countOne++;
            console.log(countOne);
            setCards(prev => {
                const updatedCard = [...cards];
                updatedCard[cardHoverId][todoDrugId] = hoverTodo;
                const arrBefore = updatedCard[cardHoverId].slice(0, todoHoverId);
                const arrAfter = updatedCard[cardHoverId].slice(todoHoverId + 1);
                // console.log(arrBefore);
                // console.log(arrAfter);
                updatedCard[cardHoverId] = [...arrBefore, drugTodo, ...arrAfter];

                return updatedCard;
            })
        }

        if (cardDragId !== cardHoverId) {
            countTwo++;
            console.log(countTwo)
            setCards(prev => {
                const updatedCard = [...cards];
                //const deletedEl = updatedCard[cardDragId].splice(todoDrugId, 1);
                const arrBefore = updatedCard[cardHoverId].slice(0, todoHoverId);
                const arrAfter = updatedCard[cardHoverId].slice(todoHoverId);
                console.log(arrBefore);
                console.log(arrAfter);
                updatedCard[cardHoverId] = [...arrBefore, drugTodo, ...arrAfter];
                const deletedEl = updatedCard[cardDragId].splice(todoDrugId, 1);
                return updatedCard;
            })
        }


        console.log(drugTodo);
        console.log(hoverTodo);
        // setCards(prev => {
        //     let tempTodos = prev.map((item, index) => {
        //         if (cardId === index) {
        //             //item
        //             return item.filter(todo => todo.id !== todoId)
        //         }
        //         return item
        //     })
        //     return tempTodos
        // })
    }
    /////////////////////////////////////////////////////////////////

    return (
        <>
            <button className='btn' onClick={addCardHandler}>ADD</button>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {cards.map((item, index) => <TodoCard key={index}
                    ind={index}
                    onAdd={addHandler}
                    todos={item}
                    onToggle={toggleHandler}
                    onRemove={removeHandler}
                    onRemoveCard={removeCardHandler}
                    onDragDrop={dndCardHandler}
                    onDndTodo={dndTodoHandler} />


                )}
            </div>



        </>
    );
}


