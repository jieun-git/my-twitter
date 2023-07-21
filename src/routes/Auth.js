// src/routes/Auth.js

import { useState } from "react";
import { authService } from "../fbase";

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newAccount, setNewAccount] = useState(false)

    const onChange = (event) => {
        const {
            target: {name, value}
        } = event // 구조분해할당

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
            console.log('[ERR] AUTH SERVICE CALL', e)
        }
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input
                    // onChange 함수는 하나, password inpu t과의 구분을 위해 name 속성 필요
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
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth