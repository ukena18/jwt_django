import { Route,Redirect } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// create private route so only authenticated user can reach it 
// children is pages and rest is for probs and other stuff
const PrivateRoute = ({children,...rest}) =>{
    console.log("private company")
    // user user from top pages
    const {user} = useContext(AuthContext)
    console.log(user,"user from private route")
    return(
        // check if there is a user or not 
        // if there is user let show the children
        // route is for moving aruong pages from react-route-dom
        // and rest is all the probs path  or exact
        <Route {...rest}>{!user ?<Redirect to="/login"/> : children}</Route>
    )
}

export default PrivateRoute