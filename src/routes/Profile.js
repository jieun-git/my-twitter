// routes/Profile.js

import { useNavigate } from 'react-router-dom'
import { authService, dbService } from "../fbase"
import { useEffect, useState } from "react";

const Profile = ({ userObj, refreshUser }) => {
    const navigate = useNavigate()

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
    const onLogout = () => {
        authService.signOut().then(() => navigate('/'))
    }

    const getMyTweets = async() => {
        const tweets =
            await dbService
                .collection('tweets')
                .where('creatorId', '==', userObj.uid)
                .orderBy('createdAt')
                .get()

        console.log('#tweets', tweets.docs.map((doc) => doc.data()))
    }


    useEffect(() => {
        getMyTweets()
    }, [])

    const onChange = (event) => {
        const {
            target: { value }
        } = event
        setNewDisplayName(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName
            })
            refreshUser()
        }
    }

    return(
        <div className="container">
            <form onSubmit={onSubmit} className="profile-form">
                <input
                    type="text"
                    placeholder="Display name"
                    onChange={onChange}
                    value={newDisplayName}
                    className="form-input"
                />
                <input type="submit" value="Update Profile" className="profile-update-input" />
            </form>
            <span className="form-btn cancel-btn log-out" onClick={onLogout}>Log Out</span>
        </div>
    )
}

export default Profile