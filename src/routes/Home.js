import Nweet from 'components/Nweet';
import { dbServce } from 'fbase';
import React, { useEffect, useState } from 'react';

export default ({ userObj }) => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();

    useEffect(() => {
        dbServce.collection('nweets').onSnapshot((snapshot) => {
            // 🕧 onSnapshot 메서드를 사용하면 실시간으로 확인할 수 있다.
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbServce.collection('nweets').add({
            text: nweet,
            creatorId: userObj.uid,
            createdAt: Date.now(),
        });
        setNweet('');
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearAttachmentClick = () => setAttachment(null);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type='text'
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type='file' accept='image/*' onChange={onFileChange} />
                <input type='submit' value='Nweet' />
                {attachment && (
                    <div>
                        <img src={attachment} width='50px' height='50px' />
                        <button onClick={onClearAttachmentClick}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};
