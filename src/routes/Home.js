// routes/Home.js

import { useEffect, useState } from "react";
import { dbService } from "../fbase";
import Tweet from "../components/Tweet";
import TweetFactory from "../components/TweetFactory";
import Navigation from "components/Navigation";
import Trend from "../components/Trend";

const Home = ({ userObj }) => {
    const [tweets, setTweets] = useState([])

    useEffect(() => {
        dbService.collection('tweets').onSnapshot((snapshot) => {
            const tweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setTweets(tweetArray)
        })
    }, [])

    return(
        <div className="home-container">
            <div className="home-profile-container">
                <Navigation />
            </div>
            <div className="home-tweet-container">
                <TweetFactory userObj={userObj} />
                <div className="home-tweet">
                    {tweets.map((tweet) => (
                        <Tweet
                            key={tweet.id}
                            tweetObj={tweet}
                            isOwner={tweet.creatorId === userObj.uid}
                        />
                    ))}
                </div>
            </div>
            <Trend />
        </div>
    )
}

export default Home