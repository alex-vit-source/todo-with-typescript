import React, { useState } from 'react'


const Login: React.FC = () => {


    const [loginClass, setLoginClass] = useState<string>('');
    const [loadingClass, setLoadingClass] = useState<string>('hide');

    return (
        <>
            <h4>АВТОРИЗАЦИЯ:</h4>
            <div className={loginClass}>
                <button >Войти с помощью Google</button>
            </div>
            <div className={loadingClass}>
                <div className="ring">Loading
                    <span className="ringSpan"></span>
                </div>

            </div>

        </>
    )
}

export default Login;