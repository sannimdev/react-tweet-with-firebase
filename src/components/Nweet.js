import { dbServce, storageService } from 'fbase';
import React, { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm('Are you sure you want to delete this nweet?');
        console.log(ok);
        if (ok) {
            // delete nweet
            await dbServce.doc(`nweets/${nweetObj.id}`).delete();
            if (nweetObj.attachmentUrl) {
                await storageService.refFromURL(nweetObj.attachmentUrl).delete();
            }
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log('update', nweetObj, newNweet);
        await dbServce.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
        toggleEditing();
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };

    return (
        <div>
            {editing ? (
                <form onSubmit={onSubmit}>
                    <input
                        type='text'
                        placeholder='Edit your nweet'
                        value={newNweet}
                        onChange={onChange}
                        required
                    />
                    <input type='submit' value='Update Nweet' />
                    <button onClick={toggleEditing}>Cancel</button>
                </form>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (
                        <img
                            src={nweetObj.attachmentUrl}
                            width='50px'
                            height='50px'
                            alt={nweetObj.text}
                        />
                    )}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
export default Nweet;
