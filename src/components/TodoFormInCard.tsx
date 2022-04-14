import React, { useState } from "react";
import todostore from '../store/todostore';
import { observer } from 'mobx-react-lite';

interface TodoFormProps {
    ind: number

}

export const TodoFormInCard: React.FC<TodoFormProps> = observer(({ ind }) => { //<{ onAdd(title: string): void }> = (props) => {
    const [title, setTitle] = useState<string>('')

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const keyPressHandler = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            todostore.addHandler(ind, title)
            //props.onAdd(props.ind, title)
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
            <label htmlFor="title" className="active" >Введите название дела</label>
        </div>
    )
})