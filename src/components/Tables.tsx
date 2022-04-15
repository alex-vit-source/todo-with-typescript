import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import todostore from '../store/todostore';
import { observer } from 'mobx-react-lite';
import { CARDS_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Link } from 'react-router-dom';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { AllTables, TTodos } from '../interfaces';


declare var confirm: (str: string) => boolean;


export const Tables: React.FC = observer(() => {

    useEffect(() => {
        let data: AllTables = {
            myTables: [],
            accessTo: []
        };
        async function getData() {
            console.log('getting');
            const docRef = doc(todostore.firestore, "todos", todostore.user.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                const dat = docSnap.data();
                const firebaseTodoString = dat.arrayTodo;
                const firebaseTablesString = dat.allTables;

                data = JSON.parse(firebaseTablesString || '{myTables: [], accessTo: []}') as AllTables
                todostore.alltables = data;

                // todostore.showCards();
                todostore.firstInitData = true;


            }
            else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                todostore.firstInitData = true;
            }

        }
        getData();

        // const data = JSON.parse(localStorage.getItem('cards') || '[]') as TTodos[]
        // todostore.cards = [...data];
        // todostore.showCards();
    }, [])

    useEffect(() => {

        // localStorage.setItem('cards', JSON.stringify(todostore.cards));
        //firestore data write

        const todoRef = collection(todostore.firestore, "todos");

        const data = [...todostore.cards];

        async function setData() {

            if (todostore.firstInitData === true) {
                console.log('update data');
                console.log(todostore.user.email);
                await setDoc(doc(todoRef, todostore.user.email), {

                    arrayTodo: JSON.stringify(todostore.cards),
                    allTables: JSON.stringify(todostore.alltables)
                });
            }
        }

        setData();


        ///////////////////

    }, [todostore.alltables.myTables])


    const chooseCard = (cards: TTodos[], idTable: number) => {

        console.log('Card was chosen');
        console.log(cards);
        todostore.cards = [...cards];
        todostore.idTable = idTable;
    }

    const addTable = () => {

        console.log('Table was added');
        const newTable = [{
            id: Date.now(),
            name: "New Table",
            ttodos: [],
            shareTo: []
        }
        ]
        todostore.alltables.myTables = [...todostore.alltables.myTables, ...newTable];

    }

    const delTable = (index: number): void => {

        console.log('delete Table');
        const remove = confirm('Вы уверены что хотите удалить этот рабочий стол?') // window.confirm('Вы уверены что хотите удалить эту запись?')
        if (remove) {
            //     this.cards = this.cards.filter((item, index) => index !== cardId);
            //     this.alltables.myTables[this.idTable].ttodos = [...this.cards];
            todostore.alltables.myTables = todostore.alltables.myTables.filter((item, ind) => ind !== index);
        }

    }

    const shareTable = (index: number): void => {
        todostore.alltables.myTables[index].shareTo = [...todostore.alltables.myTables[index].shareTo,
            'ganover@dmail.com'];
        console.log(todostore.alltables.myTables[index].shareTo)
    }

    return (
        <>
            <h4> Мои рабочие столы </h4>
            <ul>
                {todostore.alltables.myTables.map(({ name, ttodos, shareTo }, index) =>
                    <li key={`${name}${index}`} >
                        <Link to="/card" onClick={() => chooseCard(ttodos, index)}>{name} </Link>
                        <a href='#' className="material-icons red-text" onClick={() => delTable(index)}>delete</a>
                        <a href='#modal1' className="material-icons red-text waves-effect waves-light modal-trigger" onClick={() => shareTable(index)}>share</a>


                        {shareTo.map((item, id) => <span key={`${id}`}> {item} </span>)
                        }
                    </li>
                )}
                <li><button onClick={addTable}><i className="material-icons">add</i></button></li>
            </ul>
            <h4> Cтолы коллег к которым есть доступ </h4>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>

            <div className="overlay" style={{ display: 'none' }}></div>
            <div className="box" style={{ display: 'none' }}>
                <div className='buttonField'>
                    <div className="cl-btn-7" onClick={() => { console.log('Close window') }}></div>
                </div>
                <h1>Important message</h1>
                <p>
                    Here comes a very important message for your user.
                    Turn this window off by clicking the cross.
                </p>
            </div>
        </>
    )
})