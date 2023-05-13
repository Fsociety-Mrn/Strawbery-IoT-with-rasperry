import { 
    // browserSessionPersistence,
    inMemoryPersistence,
    getAuth, 
    onAuthStateChanged, 
    setPersistence, 
    signInWithEmailAndPassword,
    signOut, 
} from "firebase/auth"
import React from "react"
import { app } from "../firebase/firebase"


const auth = getAuth(app)

// Login
export const LoginStraw = async (user) => {
    const login = await setPersistence(auth, inMemoryPersistence)
    .then(async () =>{

        return await signInWithEmailAndPassword(auth, user.email, user.password)
        .then(
            userdata=> {
                localStorage.setItem('TOKEN',userdata._tokenResponse.refreshToken )
                
                return false
            }
        )
        .catch(error=>{
            return true
        })

    })
    return login
}


// Logout
export const LogoutStraw = async () => {
    await signOut(auth).then(()=>{
        console.log("Succesfull signout")
    }).catch((err)=>console.log(err))
    
    // console.log(sessionStorage.getItem('key'))
    return localStorage.clear();
  
}

// check the login status
export function useAuth() {
    const [ currentUser, setCurrentUser ] = React.useState("");
    
    
    React.useEffect(() => {
      const unsub = onAuthStateChanged(auth, user => setCurrentUser());
      return unsub;
    })
    
    
    return currentUser
  }