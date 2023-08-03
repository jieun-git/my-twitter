// TweetFactory
import {useState} from "react";
import {dbService, storageService} from "../fbase";
import {v4 as uuidv4} from "uuid";

const TweetFactory = ({ userObj }) => {
    const [tweet, setTweet] = useState('')
    const [attachment, setAttachment] = useState('')

    const onSubmit = async (event) => {
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

    const onClearAttachment = () => setAttachment(null)

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                onChange={onChange}
                value={tweet}
                placeholder="What's on your mind"
                maxLength={120}
            />
            <input type="file" accept="image/*" onChange={onFileChange}/>
            <input type="submit" value="Tweet" />
            { attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
        </form>
    )
}
export default TweetFactory