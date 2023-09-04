// components/App.js

import { useState, useEffect } from 'react'
import AppRouter from "components/Router"
import { authService } from "../fbase";

function App() {
    const [init, setInit] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userObj, setUserObj] = useState(null)

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true)
                setUserObj({
                    email: user.email,
                    displayName: user.displayName ? user.displayName : user.email.split('@')[0],
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args)
                })
            } else {
                setIsLoggedIn(false)
            }
            setInit(true)
        })
    }, [])

    const refreshUser = () => {
        const user = authService.currentUser

        setUserObj({
            email: user.email,
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args)
        })
    }

    return (
     <>
         {init ?
             <AppRouter
             isLoggedIn={isLoggedIn}
             userObj={userObj}
             refreshUser={refreshUser}
             />
             : 'initializing...'}
     </>
   );
 }

 export default App;



