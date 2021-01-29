import React from 'react';
import {PostAuthor} from "./PostAuthor.jsx";
import {TimeAgo} from "./TimeAgo.jsx";
import {ReactionButtons} from "./ReactionButtons.jsx";
import {Link} from "react-router-dom";

let PostExcerpt = ({post}) => {
    return (
        <div>
            <h3>{post.title}</h3>
            <PostAuthor userId={post.userId}/>
            <TimeAgo timestamp={post.date}/>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <ReactionButtons post={post}/>
            <Link to={`/posts/${post.id}`} className="button muted-button">Посмотреть пост</Link>
        </div>
    );
};

PostExcerpt = React.memo(PostExcerpt);
export {PostExcerpt};
