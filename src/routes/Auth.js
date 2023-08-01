// src/routes/Auth.js

import { useState } from "react";
import {authService, firebaseInstance} from "../fbase";

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("")

    const onChange = (event) => {
        const {
            target: {name, value}
        } = event

        if (name === "email") setEmail(value)
        else if (name === "password") setPassword(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            if (newAccount) {
                const data =
                     await authService.createUserWithEmailAndPassword(email, password)
                console.log('new account data', data)
            } else {
                const data =
                    await authService.signInWithEmailAndPassword(email, password)
                console.log('login data', data)
            }
        } catch (e) {
           setError(e.message)
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev)

    const onSocialClick = async (event) => {
        const {
            target: {name}
        } = event
        let provider
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        } else if (name === 'github'){
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }

        const data = await authService.signInWithPopup(provider)
        console.log('data', data)
    }

    return(
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={onChange}
                        required />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={onChange}
                        required />
                    <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                    {error}
                </form>
                <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
                <div>
                    <button name="google" onClick={onSocialClick}>Continue with Google</button>
                    <button name="github" onClick={onSocialClick}>Continue with Github</button>
                </div>
            </div>
        </>
    )
}

export default Auth