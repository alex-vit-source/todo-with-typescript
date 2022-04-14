import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import todostore from '../store/todostore';
import { observer } from 'mobx-react-lite';




//import M from 'materialize-css';


export const TodoBox: React.FC = observer(() => {

    return (
        <>
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