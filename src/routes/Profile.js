// routes/Profile.js

import { useNavigate } from 'react-router-dom'
import { dbService } from "../fbase"
import { useEffect, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DAY, MONTH, NATION_CODE, YEAR } from "../common/constants";

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

        await userObj.updateProfile({
            displayName: newDisplayName
        })
        refreshUser()

        const monthValue = event.target.elements.month.value
        const dayValue = event.target.elements.day.value
        const yearValue = event.target.elements.year.value
        const nationValue = event.target.elements.nation.value
        const phoneValue = event.target.elements.phone.value


        localStorage.setItem(userObj.email,
            JSON.stringify({
                month: monthValue,
                day: dayValue,
                year: yearValue,
                nation: nationValue,
                phone: phoneValue
            }))
    }

    const onClick = () => {
        alert('!!!')
    }

    const onGoHome = () => {
        navigate('/')
    }

    const profile = localStorage.getItem(userObj.email)
    const parsedProfile = JSON.parse(profile)

    return(
        <div className="profile-wrapper">
            <span onClick={onGoHome}>
                <FontAwesomeIcon icon={faArrowLeft} color="white" size="2x"/>
            </span>
            <div className="profile-container">
                <h1>{userObj.displayName}'s Profile</h1>
                <form onSubmit={onSubmit} className="profile-form">
                    <b>닉네임</b>
                    <input
                        type="text"
                        placeholder="Display name"
                        onChange={onChange}
                        value={newDisplayName}
                        className="form-input"
                    />
                    <b>생일</b>
                    <div className="auth-birth-select">
                        <select name="month" id="month" defaultValue={parsedProfile.month}>
                            <option>월</option>
                            {MONTH.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                        <select name="day" id="day" defaultValue={parsedProfile.day}>
                            <option>일</option>
                            {DAY.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                        <select name="year" id="year" defaultValue={parsedProfile.year}>
                            <option>년도</option>
                            {YEAR.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                    <b>휴대폰 번호</b>
                    <div className="auth-birth-select">
                        <select name="nation" id="nation" defaultValue={parsedProfile.nation}>
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
                            defaultValue={parsedProfile.phone}
                        />
                    </div>
                    <button type="submit" onClick={onClick} className="form-btn">
                        프로필 저장
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Profile