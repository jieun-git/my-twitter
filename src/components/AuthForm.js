import { useState } from "react";
import { authService } from "../fbase";
import { YEAR, MONTH, DAY, NATION_CODE } from "../common/constants";

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

        const monthValue = event.target.elements.month.value
        const dayValue = event.target.elements.day.value
        const yearValue = event.target.elements.year.value
        const nationValue = event.target.elements.nation.value
        const phoneValue = event.target.elements.phone.value


        localStorage.setItem(event.target.elements.email.value,
            JSON.stringify({
                month: monthValue,
                day: dayValue,
                year: yearValue,
                nation: nationValue,
                phone: phoneValue
            }))
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
                    <>
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
                        <div className="auth-birth">
                            <b>휴대폰 번호</b>
                            <p>이 정보는 공개적으로 표시되지 않습니다. 계정의 인증 및 유효성 확인을 위해 필요한 정보입니다.</p>
                            <div className="auth-birth-select">
                                <select name="nation" id="nation">
                                    {NATION_CODE.map((nation) => (
                                        <option key={nation.code}>
                                            {nation.icon} +{nation.code}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    className="auth-input"
                                    name="phone"
                                    placeholder="(-)를 제외하고 입력"
                                />
                            </div>
                        </div>
                    </>

                )}
                <button
                    type="submit"
                    className="auth-submit-btn"
                >
                    {newAccount ? "완료" : "로그인"}
                </button>
                {error && <span className="authError">{error}</span>}
            </form>
        </div>
    )
}

export default AuthForm