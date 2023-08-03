// components/Navigation.js

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";


const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul className="navi-ul">
                <li>
                    <Link to="/" className="navi-logo">
                        <FontAwesomeIcon icon={faTwitter} color="#04AAFF" size="2x" />
                    </Link>
                </li>
                <li><Link to="/profile" className="navi-profile">
                    <FontAwesomeIcon icon={faUser} color="#04AAFF" size="2x" />
                    <span>
                        {userObj.displayName} 's Profile
                    </span>
                </Link></li>
            </ul>
        </nav>
    )
}

export default Navigation