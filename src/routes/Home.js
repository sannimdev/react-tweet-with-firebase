import { dbServce } from 'fbase';
import React, { useEffect, useState } from 'react';

export default ({ userObj }) => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);

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
                <input type='submit' value='Nweet' />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};
