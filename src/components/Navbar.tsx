import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar: React.FC = () => {
    return (
        <nav>
            <div className="nav-wrapper purple darken-4 px1">
                <a href="/" className="brand-logo">MyWorks</a>
                <ul className="right hide-on-med-and-down">

                    <li>
                        <Link to="/">Список дел</Link>
                    </li>
                    <li>
                        <Link to="about">О приложении</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}