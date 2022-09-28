import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import todostore from '../store/todostore';
import { observer } from 'mobx-react-lite';




//import M from 'materialize-css';
type TodoBoxProps = {
    visible: boolean,
    environmentId: number,
    environmentName: string,
    environmentPrice: number,
    environmentAmount: number,
    orderDate: Date
}

export const TodoBox: React.FC<TodoBoxProps> = observer(({ visible }) => {
    const navigate = useNavigate();
    // const [overlayBox, setOverlayBox] = useState({ display: 'none' });
    // visible ? setOverlayBox({ display: '' }) : setOverlayBox({ display: 'none' })

    const boxStyle: {} = visible ? { display: '' } : { display: 'none' }

    return (
        <>
            <div className="overlay" style={boxStyle}></div>
            <div className="box" style={boxStyle}>
                <div className='buttonField'>
                    <div className="cl-btn-7" onClick={() => { console.log('CLOSE WINDOW'); todostore.visible = false }}></div>
                    {/* { setOverlayBox({ display: 'none' }); } */}
                </div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input placeholder="Placeholder" id="first_name" type="text" className="validate" />
                                <label htmlFor="first_name">First Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="last_name" type="text" className="validate" />
                                <label htmlFor="last_name">Last Name</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

})