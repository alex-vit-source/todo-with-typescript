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

    }, [todostore.cards])


    const chooseCard = (cards: TTodos[], idTable: number) => {

        console.log('Card was chosen');
        console.log(cards);
        todostore.cards = [...cards];
        todostore.idTable = idTable;
    }

    return (
        <>
            <h4> Мои рабочие столы </h4>
            <ul>
                {todostore.alltables.myTables.map(({ name, ttodos }, index) => <li key={`${name}${index}`} onClick={() => chooseCard(ttodos, index)}><Link to="/card">{name} </Link></li>
                )}
                <li><button onClick={() => { console.log('++') }}><i className="material-icons">add</i></button></li>
            </ul>
            <h4> Cтолы коллег к которым есть доступ </h4>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
        </>
    )
})