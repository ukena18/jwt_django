// createContext is for sending data to sub funcs or files
import { createContext , useState , useEffect } from 'react';
// to decode so we can get the username
import jwt_decode from "jwt-decode";
// use history to go back in the browser
import { useHistory } from 'react-router-dom'

// create context
const AuthContext = createContext();


// export it    
export default AuthContext;


// authprovider is for covering our entire app so we can send data to sub pages
// using useContext hook
// children is all the pages 
export const AuthProvider = ({children}) =>{
    // get the localstorage token if exist
    const localStorageTokens = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) :null;
    const [authTokens,setAuthTokens] = useState(()=>{
        return(localStorageTokens)
    });
    // get the user from localstorage.user if exist
    const localStorageUser = localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")).username :null;
    const [user,setUser] = useState(()=>{
        return(localStorageUser)
    });

    // for updating refresh token
    const [loading,setLoading] = useState(true)
    
    //for go back in the browser
    const history = useHistory()
    
    // login form
    let loginUser = async (e) =>{
        // prevent refresh page after submit the form
        e.preventDefault();
        console.log("form submitted")
        // send post request to token api with username and password
        // and returning access and refresh token
        let response = await fetch("http://127.0.0.1:8000/api/token/",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"username":e.target.username.value,"password":e.target.password.value})
        })
        // get the refresh and access token 
        let data = await response.json()
        console.log(data)
        // we want to get token if it only 200  status
        if (response.status ===200){
            // acces and refresh token
                setAuthTokens(data)
                // storage them into browser cookies
                localStorage.setItem("authTokens",JSON.stringify(data))
                // get the user name from token 
                setUser(jwt_decode(data.access).username)
                console.log()
                // send them to home page
                history.push('/')
        }else{
            console.log("coulnd get response 200")
        }
    }
    
    // logout func 
    const logoutUser = () =>{
        // tokens =null
        setAuthTokens(null);
        // user = null
        setUser(null);
        // local storage remove
        localStorage.removeItem("authTokens");
        // send to login page
        history.push('/login');
    }

    // update the refresh token token 
    let updateToken = async () =>{
        console.log("updateToken called")
        // send post request using refresh token   so we can get new access token
        let response = await fetch("http://127.0.0.1:8000/api/token/refresh/",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"refresh":authTokens?.refresh})
        })
        // get the tokens 
        let data = await response.json()
        console.log(response.status)
    if(response.status === 200){
        // storage them into  authtokens
        setAuthTokens(data)
        // get the user name from token 
        setUser(jwt_decode(data.access).username)
        // storage them into browser cookies
        localStorage.setItem("authTokens",JSON.stringify(data))
        console.log("update token called set token and user adn local is fine")
    }else{
        // if it couldnt refresh then log them out 
        // because session is expired
        logoutUser()
    }
    // for updating token
    if (loading){setLoading(false)}

    }
    // this will be visible and callable from everywhere on the app
    let contextData= {
        user: user,
        loginUser :loginUser,
        logoutUser:logoutUser,
        authTokens:authTokens,

    }

    // when we first render the app run it
    // for refreshing acces token 
    useEffect(()=>{
        if  (loading){
            updateToken()
        }
 
        let fourMins = 1000*60*4;
        // it keep call the func inside again and again 
        let interval =  setInterval(()=>{
            if (authTokens){
                updateToken()
            }
        },fourMins)
        // if we dont clear inteveal it will multiply everytime
        // 1st it is called once then twice then 4times then 8 times
        // and break the app dont forget that
        return () => clearInterval(interval)

    },[authTokens,loading])

    return (
        // from create context
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
           </AuthContext.Provider>
        )
}