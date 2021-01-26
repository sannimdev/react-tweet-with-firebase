import React, { useState } from 'react';
import { authService } from 'fbase';
import { useHistory } from 'react-router-dom';

export default ({ userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    };

    const getMyNweets = async () => {
        const nweets = await dbServce
            .collection('nweets')
            .where('creatorId', '==', userObj.uid)
            // .orderBy('createdAt', 'desc') 색인이 생성된 이후에 사용할 수 있다.
            .get();
        console.log(nweets.docs.map((doc) => doc.data()));
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder='Display name'
                    value={newDisplayName}
                    onChange={onChange}
                />
                <input type='submit' value='Update profile' />
            </form>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};
