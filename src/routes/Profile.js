// routes/Profile.js

import { useNavigate } from 'react-router-dom'
import {authService, dbService} from "../fbase"
import {useEffect} from "react";

const Profile = ({ userObj }) => {
    const navigate = useNavigate()
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


    return(
        <>
            <button onClick={onLogout}>Log Out</button>
        </>
    )
}

export default Profile