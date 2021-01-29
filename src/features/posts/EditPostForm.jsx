import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';

import {postUpdated, selectPostById} from "./postsSlice";

export const EditPostForm = ({match}) => {
    const {postId} = match.params;

    const post = useSelector(state => selectPostById(state, postId));

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const dispatch = useDispatch();
    const history = useHistory();

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const onSavePostClicked = () => {
        if (title && post) {
            dispatch(postUpdated({id: postId, title, content}));
            history.push(`/posts/${postId}`);
        }
    }

    return (
        <section>
            <h2>Редактирование поста</h2>
            <form>
                <label htmlFor="postTitle">Заголовок поста:</label>
                <input
                type="text"
                id="postTitle"
                name="postTitle"
                placeholder="Что вы хотите изменить?"
                value={title}
                onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Заголовок поста:</label>
                <input
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
            </form>
            <button type="button" onClick={onSavePostClicked}>Сохранить пост</button>
        </section>
    );
}