import {useState} from "react";
import {authService} from "../fbase";

const AuthForm = () => {
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

    return(
        <>
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
            <span onClick={toggleAccount} className="auth-switch">
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>
    )
}

export default AuthForm