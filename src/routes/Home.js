import React, { useState } from 'react';

export default () => {
    const [nweet, setNweet] = useState('');
    const onSubmit = (event) => {
        event.preventDefault();
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
        </div>
    );
};
