import React from 'react'

export const Navbar: React.FC = () => {
    return (
        <nav>
            <div className="nav-wrapper purple darken-4 px1">
                <a href="/" className="brand-logo">MyWorks</a>
                <ul className="right hide-on-med-and-down">
                    <li><a href="sass.html">Список дел</a></li>
                    <li><a href="badges.html">О приложении</a></li>
                </ul>
            </div>
        </nav>
    )
}