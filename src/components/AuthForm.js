import { useState } from "react";
import { authService } from "../fbase";
import { YEAR, MONTH, DAY } from "../common/constants";

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
                await authService.createUserWithEmailAndPassword(email, password)
            } else {
                await authService.signInWithEmailAndPassword(email, password)
            }
        } catch (e) {
            setError(e.message)
        }
    }

    return(
        <div className="auth-account-form-container">
            {newAccount ? <h1>계정을 생성하세요</h1> : <h1>로그인</h1>}
            <form onSubmit={onSubmit} className="auth-form-modal">
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
                {newAccount && (
                    <div className="auth-birth">
                        <b>생년월일</b>
                        <p>이 정보는 공개적으로 표시되지 않습니다. 비즈니스, 반려동물 등 계정 주제에 상관 없이 나의 연령을 확인하세요.</p>
                        <div className="auth-birth-select">
                            <select name="month" id="month">
                                <option>월</option>
                                {MONTH.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                            <select name="day" id="day">
                                <option>일</option>
                                {DAY.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                            <select name="year" id="year">
                                <option>년도</option>
                                {YEAR.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
                <button
                    type="submit"
                    className="auth-submit-btn"
                >
                    {newAccount ? "Create Account" : "Log In"}
                </button>
                {error && <span className="authError">{error}</span>}
            </form>
        </div>
    )
}

export default AuthForm