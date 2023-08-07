// src/routes/Auth.js

import { authService, firebaseInstance } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from 'react-router-dom'

const Auth = ({ setNewAccount }) => {
    const navigate = useNavigate()

    const onSocialClick = async (event) => {
        const {
            target: { name }
        } = event
        let provider
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        } else if (name === 'github'){
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }

        await authService.signInWithPopup(provider)
    }

    const onCreateAccount = () => {
        navigate('/account')
        setNewAccount(true)
    }

    const onLogin = () => {
        navigate('/account')
        setNewAccount(false)
    }

    return(
        <>
            <div className="auth-container">
                <FontAwesomeIcon
                    icon={faTwitter}
                    color="#04AAFF"
                    size="10x"
                    style={{ marginBottom: 30 }}
                />
                <div className="auth-account-container">
                    <h1>지금 일어나고 있는 일</h1>
                    <h2>Join today.</h2>
                    <div className="auth-btns">
                        <button name="google" onClick={onSocialClick} className="auth-btn">
                            Continue with Google <FontAwesomeIcon icon={faGoogle} />
                        </button>
                        <button name="github" onClick={onSocialClick} className="auth-btn">
                            Continue with Github <FontAwesomeIcon icon={faGithub} />
                        </button>
                    </div>
                    <div className="auth-divider">
                        <p>또는</p>
                    </div>
                    <div className="auth-create-account-btn-container">
                        <button className="auth-create-account-btn" onClick={onCreateAccount}>
                           계정 만들기
                        </button>
                        <p>가입하시려면 <Link to="/">쿠키 사용</Link>을 포함해 이용약관과 <Link to="/">개인정보 처리방침</Link>에 동의해야 합니다.</p>
                    </div>
                    <div className="auth-login-container">
                        <h3>이미 트위터에 가입하셨나요?</h3>
                        <button className="auth-login-btn" onClick={onLogin}>
                            로그인
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth