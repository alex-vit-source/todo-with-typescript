import React, { useState, useEffect } from 'react';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/todoList';
import { ITodo } from '../interfaces';

declare var confirm: (str: string) => boolean;

export const Todo: React.FC = () => {

  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[]
    setTodos(data)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addHandler = (title: string) => {

    const newTodo: ITodo = {
      title: title,
      id: Date.now(),
      completed: false
    }
    //setTodos([newTodo, ...todos])
    setTodos(prev => [newTodo, ...prev])
  }

  const toggleHandler = (id: number) => {

    const temp: ITodo[] = todos;
    temp.forEach(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
    setTodos([...temp]);
  }

  const removeHandler = (id: number) => {
    const remove = confirm('Вы уверены что хотите удалить эту запись?') // window.confirm('Вы уверены что хотите удалить эту запись?')
    if (remove) setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <>
      <div style={{ maxWidth: '400px', minHeight: '400px', borderRadius: '10px', background: '#CCFF66', padding: '5px', paddingTop: '30px' }}>
        <div style={{ borderRadius: '5px', background: 'white', padding: '5px' }}>
          <TodoForm onAdd={addHandler} />

          <TodoList todos={todos} onToggle={toggleHandler} onRemove={removeHandler} />
        </div>
      </div>



    </>
  );
}


