import React, {useEffect,useState,useContext} from 'react'
import AuthContext from '../context/AuthContext'

export const HomePAge = () => {
    
    const [notes,setNotes] = useState([])
     
    // get variable and method from top pages
    const {authTokens,logoutUser} = useContext(AuthContext)
    console.log(authTokens)
    // get the notes from api send authentication too
    const getNotes = async () =>{
       const response = await fetch('http://localhost:8000/api/notes/',{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                // we got to send it in order to get info 
                // this is for authentication
                "Authorization":"Bearer "+String(authTokens.access)
            }
        })
        
        // get the notes
        const data = await response.json()

        if(response.status ===200){
            setNotes(data)
        }else{
            console.log(response.status)
            console.log(response.statusText)
            logoutUser()
            
        }
        
    }
    useEffect(()=>{getNotes()},[])
    
    console.log(notes)
    return (
        <div>
            <p>You are logged in to home page</p>
            
                {notes.map(note => 
                <div key={note.id}>
                    <h1>{note.body}</h1>
                    </div>
                    )}
            
        </div>
    )
}
