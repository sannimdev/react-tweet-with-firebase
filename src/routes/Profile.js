import React, { useEffect } from 'react';
import { authService, dbServce } from 'fbase';
import { useHistory } from 'react-router-dom';

export default ({ userObj }) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    };

    const getMyNweets = async () => {
        const nweets = await dbServce
            .collection('nweets')
            .where('creatorId', '==', userObj.uid)
            .orderBy('createdAt', 'desc') // 색인이 생성된 이후에 사용할 수 있다.
            .get();
        console.log(nweets.docs.map((doc) => doc.data()));
    };

    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};
