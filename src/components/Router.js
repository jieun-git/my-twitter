// components/Router.js

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "../routes/Profile";
import AuthForm from "./AuthForm";
import {useState} from "react";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    const [newAccount, setNewAccount] = useState(true)
    const setDisplayName = () => {
        if (!userObj.displayName) {
            userObj.displayName = userObj.email.split('@')[0]
        }
        return userObj
    }

    return(
        <Router>
            {isLoggedIn && <Navigation userObj={setDisplayName()} />}
            <Routes>
                {
                    isLoggedIn ?
                        <>
                            <Route path="/" element={<Home userObj={userObj} />} />
                            <Route path="/profile" element={<Profile userObj={setDisplayName()} refreshUser={refreshUser}/>}  />
                        </>
                        :
                        <>
                            <Route path="/" element={<Auth setNewAccount={setNewAccount}/>} />
                            <Route path="/account" element={<AuthForm newAccount={newAccount}/>} />
                        </>
                }
            </Routes>
        </Router>
    )
}

export default AppRouter