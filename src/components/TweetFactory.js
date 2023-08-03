// TweetFactory
import { useState } from "react";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TweetFactory = ({ userObj }) => {
    const [tweet, setTweet] = useState('')
    const [attachment, setAttachment] = useState('')

    const onSubmit = async (event) => {
        if (tweet === '') {
            return
        }
        event.preventDefault()
        let attachmentUrl = ''

        if (attachment !== '') {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            const response = await attachmentRef.putString(attachment, 'data_url')
            attachmentUrl = await response.ref.getDownloadURL()
        }
        const tweetObj = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        await dbService.collection('tweets').add(tweetObj)
        setTweet('')
        setAttachment('')
    }

    const onChange = (event) => {
        const {
            target: { value }
        } = event
        setTweet(value)
    }

    const onFileChange = (event) => {
        const {
            target: { files }
        } = event

        const theFile = files[0]
        const reader = new FileReader()

        reader.onloadend = ((finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent
            setAttachment(result)
        })
        reader.readAsDataURL(theFile)
    }

    const onClearAttachment = () => setAttachment('')

    return (
        <form onSubmit={onSubmit} className="factory-form">
            <div className="factory-input-container">
                <input
                    type="text"
                    onChange={onChange}
                    value={tweet}
                    placeholder="What's on your mind"
                    maxLength={120}
                    className='factory-input-input'
                />
                <input type="submit" value="Tweet" className="factory-input-arrow" />
            </div>
            <label htmlFor="attach-file" className="factory-input-label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="factory-input-attach"
            />
            { attachment && (
                <div className="factory-form-attachment">
                    <img src={attachment} style={{ backgroundImage: attachment }} />
                    <div onClick={onClearAttachment} className="factory-form-clear">
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    )
}
export default TweetFactory