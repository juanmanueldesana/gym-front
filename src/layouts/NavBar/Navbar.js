import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import { Button } from "../Button"
import './Navbar.css'

const isLoggedIn = localStorage.getItem('token')

class Navbar extends Component {
    state = { clicked: false }

    
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(
            <nav className="NavbarItems">
                <a style={{ textDecoration: "none" }} href="/"><h1 className="navbar-logo">MUSCULITO</h1></a>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                {isLoggedIn != null ?<Button><a style={{ textDecoration: "none", color: "black" }} href="/Perfil">PERFIL</a></Button> : <Button><a style={{ textDecoration: "none", color: "black" }} href="/Login">LOGIN</a></Button>}
            </nav>
        )
    }
}

export default Navbar