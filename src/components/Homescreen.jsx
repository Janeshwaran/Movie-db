import React from 'react'
import './Homescreen.css'
import Nav from './Nav'
import request from './../Requests'
import MainPage from './MainPage'

function Homescreen() {
    return (
        <div className="homescreen">
            <Nav/>
            <MainPage/>
        </div>
    )
}

export default Homescreen
