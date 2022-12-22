import React, { useCallback, useEffect, useState } from 'react';
import * as firebase from '../../firebase/index.js';
import { query, limitToLast, onValue, ref } from 'firebase/database';

const Chat = () => {
    const [comments, setComments] = useState([])
    const [input, setInput] = useState('')
    const id = '1'

    const getComment = useCallback(async () => {
        const roomRef = ref(firebase.db, id);
        const que = query(roomRef, limitToLast(20));
        onValue(que, (snapshot) => {
            let listComment = [];
            snapshot.forEach((item) => {
                listComment = [...listComment, item?.val()];
            });
            listComment = listComment.reverse();
            setComments(listComment);
        });
    }, []);

    useEffect(() => {
        getComment()
    }, [getComment])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleEnter = (e) => {
        if (e.code === 'Enter') {
            firebase.createComment('1', {
                user_id: '1',
                name: 'Nhat Le',
                message: input
            })
            setInput('')
        }
    }
    return (
        <div className='chat'>
            <div className='comments'>
                {
                    comments?.map((comment, index) => {
                        return (
                            <div className='comment-item' key={index}>
                                <h6 className=''>Nhat Le</h6>
                                <p className=''>{comment?.message}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className='comment'>
                <input value={input} onChange={handleChange} onKeyUp={handleEnter} />
            </div>
        </div>
    )
}

export default Chat