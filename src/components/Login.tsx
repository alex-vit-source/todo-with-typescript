import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import todostore from '../store/todostore';
import { observer } from 'mobx-react-lite';
import { CARDS_ROUTE, LOGIN_ROUTE } from '../utils/consts';





const Login: React.FC = observer(() => {

    const navigate = useNavigate();
    const [loginClass, setLoginClass] = useState<string>('');
    const [loadingClass, setLoadingClass] = useState<string>('hide');

    const LogIn = () => {

        const provider = new GoogleAuthProvider();
        todostore.loading = true;
        console.log('Hi')
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

    // const Entrance = () => {
    //     const navigate = useNavigate();
    //     LogOut();
    //     navigate(LOGIN_ROUTE);

    // };

    // const Exit = () => {
    //     const navigate = useNavigate();
    //     LogIn();
    //     navigate(CARDS_ROUTE);
    // }



    if (todostore.loading) {

        return (
            <>
                <div>
                    <p>Initialising User...</p>
                </div>
                <div className="ring">Loading
                    <span className="ringSpan"></span>
                </div>
            </>
        );
    }
    if (todostore.error) {
        return (
            <div>
                <p>Error: {todostore.error.message}</p>
            </div>
        );
    }
    if (todostore.user) {
        return (
            <div>
                <p>Current User: {todostore.user.email}</p>
                {/* <button onClick={Exit}>Log out</button> */}
            </div>
        );
    }

    return (
        <>
            <h4>АВТОРИЗАЦИЯ:</h4>
            <div className={loginClass}>
                <button onClick={LogIn}>Войти с помощью Google</button>
            </div>





        </>
    )
})

export default Login;