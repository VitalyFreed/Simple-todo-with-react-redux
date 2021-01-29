import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {nanoid, unwrapResult} from "@reduxjs/toolkit";

import {addNewPost} from './postsSlice.js';

export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const dispatch = useDispatch();

    const users = useSelector(state => state.users);
    const posts = useSelector(state => state.posts.posts);

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChange = e => setUserId(e.target.value);

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    // const onSavePostClicked = () => {
    //     if (title && content) {
    //         dispatch(postAdded(title, content, userId));
    //         setTitle('');
    //         setContent('');
    //     }
    // }

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                const newPost = {
                    title,
                    content,
                    userId
                };
                setAddRequestStatus('pending');
                const resultAction = await dispatch(
                    addNewPost(newPost)
                );
                unwrapResult(resultAction);
                setTitle('');
                setContent('');
                setUserId('');
            } catch (err) {
                console.error('Ошибка загрузки поста: ', err);
            } finally {
                setAddRequestStatus('idle');
            }
        }
    };

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section>
            <h2>Добавить новый пост</h2>
            <form>
                <div>
                    <label htmlFor="postTitle">Заголовок поста:</label>
                    <input
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        value={title}
                        onChange={onTitleChanged}
                    />
                </div>
                <div>
                    <label htmlFor="postContent">Содержимое поста:</label>
                    <input
                        type="text"
                        id="postContent"
                        name="postContent"
                        value={content}
                        onChange={onContentChanged}
                    />
                </div>
                <div>
                    <label htmlFor="postAuthor">Автор:</label>
                    <select id="postAuthor" value={userId} onChange={onAuthorChange}>
                        <option value=""></option>
                        {usersOptions}
                    </select>
                </div>
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Сохранить пост</button>
            </form>
        </section>
    );
};