// components/Navigation.js

import {Link, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser, faHouse, faSearch, faBell, faEnvelope, faBookmark, faPersonRunning } from "@fortawesome/free-solid-svg-icons";


const Navigation = ({ userObj }) => {
    const navigate = useNavigate()
    const goLogout = () => {
        navigate('/logout')
    }

    return (
        <>
            <nav>
                <ul className="navi-ul">
                    <li>
                        <Link to="/" className="navi-logo">
                            <FontAwesomeIcon icon={faTwitter} color="#04AAFF" size="4x" />
                        </Link>
                    </li>
                    <div>
                        <li>
                            <Link to="/" className="navi-profile">
                                <FontAwesomeIcon icon={faHouse} color="white" size="2x" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="navi-profile">
                                <FontAwesomeIcon icon={faSearch} color="white" size="2x" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="navi-profile">
                                <FontAwesomeIcon icon={faBell} color="white" size="2x" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="navi-profile">
                                <FontAwesomeIcon icon={faBookmark} color="white" size="2x" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="navi-profile">
                                <FontAwesomeIcon icon={faEnvelope} color="white" size="2x" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="navi-profile">
                                <FontAwesomeIcon icon={faUser} color="white" size="2x" />
                            </Link>
                        </li>
                    </div>
                    <li>
                    <span onClick={goLogout}>
                        <FontAwesomeIcon icon={faPersonRunning} color="darkGray" size="2x" />
                    </span>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navigation