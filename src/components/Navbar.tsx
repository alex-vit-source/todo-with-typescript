import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css';


export const Navbar: React.FC = () => {

    useEffect(() => {
        const elem = document.querySelector(".sidenav");
        const instance = M.Sidenav.init(elem!, {
            edge: "left",
            inDuration: 300
        });
    }, [])


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
            </ul>
        </>
    )
}