// routes/Profile.js

import { useNavigate } from 'react-router-dom'
import { dbService } from "../fbase"
import { useEffect, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = ({ userObj, refreshUser }) => {
    const navigate = useNavigate()

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

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

    const onClick = () => {
        alert('!!!')
    }

    const onGoHome = () => {
        navigate('/')
    }

    return(
        <div className="profile-wrapper">
            <span onClick={onGoHome}>
                <FontAwesomeIcon icon={faArrowLeft} color="white" size="2x"/>
            </span>
            <div className="profile-container">
                <h1>{userObj.displayName}'s Profile</h1>
                <form onSubmit={onSubmit} className="profile-form">
                    <input
                        type="text"
                        placeholder="Display name"
                        onChange={onChange}
                        value={newDisplayName}
                        className="form-input"
                    />
                    <button type="submit" onClick={onClick} className="form-btn">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Profile