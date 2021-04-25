import React from 'react'
import { NavLink } from 'react-router-dom'

export function Header() {
    return (
        <section className="header-container">
            <div className="header-hero max-layout">
                <nav>
                    <ul>
                        <li>
                            <NavLink exact activeClassName="selected" to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="selected" to="/attack/statistics">Statistics</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    )
}
