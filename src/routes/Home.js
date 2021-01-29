import Nweet from 'components/Nweet';
import { dbServce } from 'fbase';
import React, { useEffect, useState } from 'react';
import NweetFactory from '../components/NweetFactory';

export default ({ userObj }) => {
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

    return (
        <div>
            <NweetFactory userObj={userObj} />
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
