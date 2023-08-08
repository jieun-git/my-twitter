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

    const onCreateAccount = () => {
        alert('계정 생성 완료')
        // TODO: 컨펌 창 만들기
    }

    const onConfirm = () => {
        // TODO: 컨펌창 ok 버튼 클릭하면 onSubmit() 호출되게 로직 구현
        // type="submit"
    }

    return(
        <div className="auth-account-form-container">
            {newAccount ? <h1>계정을 생성하세요</h1> : <h1>로그인</h1>}
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
                {newAccount && (
                    <div className="auth-birth">
                        <b>생년월일</b>
                        <p>이 정보는 공개적으로 표시되지 않습니다. 비즈니스, 반려동물 등 계정 주제에 상관 없이 나의 연령을 확인하세요.</p>
                        <div className="auth-birth-select">
                            <select name="month" id="month">
                                <option>월</option>
                                {MONTH.map((m) => (
                                    <option value={m}>{m}</option>
                                ))}
                            </select>
                            <select name="day" id="day">
                                <option>일</option>
                                {DAY.map((d) => (
                                    <option value={d}>{d}</option>
                                ))}
                            </select>
                            <select name="year" id="year">
                                <option>년도</option>
                                {YEAR.map((y) => (
                                    <option value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </form>
            <button
                onClick={onCreateAccount}
                className="auth-submit-btn"
            >
                {error && <span className="authError">{error}</span>}
                {newAccount ? "Create Account" : "Log In"}
            </button>
        </div>
    )
}

export default AuthForm