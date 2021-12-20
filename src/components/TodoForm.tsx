import React, { useState } from "react";

interface TodoFormProps {
    onAdd(title: string): void
}

export const TodoForm: React.FC<TodoFormProps> = (props) => { //<{ onAdd(title: string): void }> = (props) => {
    const [title, setTitle] = useState<string>('')

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const keyPressHandler = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            props.onAdd(title)
            console.log(title)
            setTitle('')
        }
    }

    return (
        <div className="input -field mt2">
            <input
                value={title}
                type="text"
                id="title"
                placeholder="Введите название дела"
                onChange={changeHandler}
                onKeyPress={keyPressHandler}
            />
            <label htmlFor="title" className="active">Введите название дела</label>
        </div>
    )
} 