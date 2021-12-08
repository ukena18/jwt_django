import React,{useContext} from 'react'
import AuthContext from '../context/AuthContext'

export const LoginPAge = () => {
    // onsubmit call login user func from top pages 
    // authContenxt let us to reach the funcs from everywhere
    let {loginUser} = useContext(AuthContext)
    return (
        <div>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="username" />
                <input type="password" name="password" placeholder="Enter password" />
                <input type="submit"/>
            </form>
        </div>
    )
}
