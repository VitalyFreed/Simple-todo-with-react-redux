import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {PostAuthor} from "./PostAuthor.jsx";
import {TimeAgo} from "./TimeAgo.jsx";
import {ReactionButtons} from "./ReactionButtons.jsx";
import {selectPostById} from "./postsSlice";

export const SinglePostPage = ({match}) => {
    const {postId} = match.params;

    const post = useSelector(state => selectPostById(state, postId));

    if (!post) {
        return (
            <section>
                <h2>Пост не найден!</h2>
            </section>
        );
    }

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
                <p className="post-content">{post.content}</p>
                <ReactionButtons post={post}/>
                <Link to={`/editPost/${post.id}`} className="button">Изменить пост</Link>
            </article>
        </section>
    );
};