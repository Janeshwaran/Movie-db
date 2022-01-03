import React, {useState, useEffect} from 'react'
import "./Nav.css"
import "./Modal"

function Nav() {
    const [nav, handleNav] = useState(false);

    const transitionNavBar = () => {
        if (window.scrollY > 100){
            handleNav(true);
        } else{
            handleNav(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar);
        return()=> window.addEventListener('scroll', transitionNavBar);
    }, []);

    return (
        <div className={`nav ${nav && 'nav_black'}`}>
            <div className="nav_contents">
                <h1 className="nav_logo">fakeDb</h1>
                
            </div>
        </div>
    )
}

export default Nav
