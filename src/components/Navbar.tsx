import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import todostore from '../store/todostore';
import { observer } from 'mobx-react-lite';
import { CARDS_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';



//import M from 'materialize-css';


export const Navbar: React.FC = observer(() => {

    const navigate = useNavigate();

    useEffect(() => {
        const M = window.M;
        const elem = document.querySelector(".sidenav");
        const instance = M.Sidenav.init(elem!, {
            edge: "left",
            inDuration: 300
        });
    }, [])

    const LogOut = () => {

        todostore.loading = true;
        signOut(todostore.auth).then(() => {
            // Sign-out successful.
            console.log('singOut OK')
            todostore.loading = false;
            todostore.user = undefined;
            todostore.error = undefined;
            todostore.access = false;
            navigate(LOGIN_ROUTE);
        }).catch((error) => {
            // An error happened.
            console.log('singOut Error')
            todostore.loading = false;
            todostore.error = error;
        });

    };

    const LogIn = () => {

        const provider = new GoogleAuthProvider();
        todostore.loading = true;
        signInWithPopup(todostore.auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential!.accessToken;
                console.log(token);
                // The signed-in user info.
                const user = result.user;
                todostore.user = result.user;
                todostore.loading = false;
                todostore.error = undefined;
                todostore.access = true;
                navigate(CARDS_ROUTE);
                console.log(user);
                // ...
            }).catch((error) => {
                todostore.error = error;
                todostore.loading = false;
                // Handle Errors here.
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                console.log(errorMessage);
                // The email of the user's account used.
                const email = error.email;
                console.log(email);
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
        // signInWithGoogle();
    };



    return (
        <>
            <nav className="nav-extended">
                <div className="nav-wrapper purple darken-4 px1">
                    <a href="/" className="brand-logo">MyWorks</a>
                    <a href="/" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">

                        <li>
                            <Link to="/">Список дел</Link>
                        </li>
                        <li>
                            <Link to="about">О приложении</Link>
                        </li>
                        {todostore.access ? <li><button onClick={LogOut}>{'<'}--Выйти</button></li> : <li><button onClick={LogIn} >Войти--{'>'}</button></li>}
                        {/* <li>
                            <Link to="about">О приложении</Link>
                        </li> */}
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">

                <li>
                    <Link to="/">Список дел</Link>
                </li>
                <li>
                    <Link to="about">О приложении</Link>
                </li>
                <li>
                    <Link to="login">{todostore.access ? <button onClick={LogOut}>{'<'}--Выйти</button> : <button onClick={LogIn} >Войти--{'>'}</button>}</Link>
                </li>

            </ul>
        </>
    )
})