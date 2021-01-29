import { dbServce, storageService } from 'fbase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

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
        <div className='nweet'>
            {editing ? (
                <form onSubmit={onSubmit} className='container nweetEdit'>
                    <input
                        type='text'
                        placeholder='Edit your nweet'
                        value={newNweet}
                        onChange={onChange}
                        required
                    />
                    <input type='submit' value='Update Nweet' className='formBtn' />
                    <button onClick={toggleEditing}>Cancel</button>
                </form>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                    {isOwner && (
                        <div class='nweet__actions'>
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
export default Nweet;
