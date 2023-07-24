// routes/Profile.js

import { useNavigate } from 'react-router-dom'
import { authService } from "../fbase"

const Profile = () => {
    const navigate = useNavigate()
    const onLogout = () => {
        authService.signOut().then(() => navigate('/'))
    }


    return(
        <>
            <button onClick={onLogout}>Log Out</button>
        </>
    )
}

export default Profile