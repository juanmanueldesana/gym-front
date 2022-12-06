import React from 'react';
import { useEffect, useState } from 'react';
import { MenuItems } from "./MenuItems"
import { Button } from "../Button"
import './Navbar.css'

const NavBar1 = () => {
    const [clicked, setClicked] = useState(false);
    const isLoggedIn = localStorage.getItem('token');

  return (
    <nav className="NavbarItems">
                <a style={{ textDecoration: "none" }} href="/"><h1 className="navbar-logo">ARES</h1></a>
                <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <a className='nav-links' href='/'>
                            INICIO
                        </a>
                    </li>
                    <li>
                        <a className='nav-links' href='/staff'>
                            STAFF
                        </a>
                    </li>
                    <li>
                        <a className='nav-links' href='/Comunidad'>
                            COMUNIDAD
                        </a>
                    </li>
                    <li>
                        <a className='nav-links' href='/Clases'>
                            RUTINAS
                        </a>
                    </li>
                    <li>
                        <a className='nav-links-mobile' href='/Login'>
                            LOGIN
                        </a>
                    </li>
                    <li>
                        <a className='nav-links-mobile' href='/signup'>
                            REGISTRO
                        </a>
                    </li>
                    <li>
                        <a className='nav-links-mobile' href='/profile'>
                        PERFIL
                        </a>
                    </li>
                </ul>
                {(isLoggedIn != null ?<Button><a style={{ textDecoration: "none", color: "black" }} href="/profile">PERFIL</a></Button> : <><Button><a style={{ textDecoration: "none", color: "black" }} href="/signin">LOGIN</a></Button><div style={{ paddingRight: "0.5vw" }}></div><Button><a style={{ textDecoration: "none", color: "black" }} href="/signup">REGISTRATE</a></Button></>)}
            </nav>
  )
}

export default NavBar1