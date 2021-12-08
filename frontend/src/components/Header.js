import React, {useContext} from 'react'
import {Link} from "react-router-dom"
import AuthContext from '../context/AuthContext'

export const Header = () => {
    // get the user and logOut func from authContext
    // useCOntext basicly allow you to reach at the very top func
    let {user,logoutUser} = useContext(AuthContext)
    return (
        <div>
            <Link to="/">Home</Link>
            <span> | </span>
            {/* check if the user exist or send to login form */}
            {user ? (<p onClick={logoutUser} >Logout</p>):(<Link to="/login">Login</Link>)}
            {user && <p>Hello {user} </p>}
        </div>
    )
}
