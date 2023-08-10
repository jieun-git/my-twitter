import { authService } from "../fbase"
import { useNavigate } from "react-router-dom";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Logout = () => {
    const navigate = useNavigate()

    const onLogout = () => {
        authService.signOut().then(() => navigate('/'))
    }

    const onCancel = () => {
        navigate('/')
    }

    return(
        <div className="logout-wrapper">
            <FontAwesomeIcon icon={faTwitter} color="#54A7DB" size="2x" />
            <h1>트위터에서 로그아웃할까요?</h1>
            <p>
                언제든지 다시 로그인할 수 있습니다.
                계정을 전환하려는 경우 이미 존재하는 계정을 추가하면 전환할 수 있습니다.
            </p>
            <button className="form-btn" onClick={onLogout}>로그아웃</button>
            <button className="form-btn cancel-btn" onClick={onCancel}>취소</button>
        </div>
    )
}

export default Logout