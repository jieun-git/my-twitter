import { useState } from "react";
import { authService } from "../fbase";

const AuthForm = ({ newAccount }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

    return(
        <>
            <div>{newAccount ? '회원 가입' : '로그인'}</div>
            <form onSubmit={onSubmit} className="container">
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                    required
                    className="auth-input"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    required
                    className="auth-input"
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Log In"}
                    className="auth-input auth-submit"
                />
                {error && <span className="authError">{error}</span>}
            </form>
        </>
    )
}

export default AuthForm