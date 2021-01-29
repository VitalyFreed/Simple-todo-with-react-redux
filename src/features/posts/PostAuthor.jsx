import React from 'react';
import {useSelector} from "react-redux";

export const PostAuthor = ({userId}) => {
    const author = useSelector(state => state.users.find(user => user.id.toString() === userId));

    return <div>
        <span>Автор: {author ? author.name : 'Неизвестный автор'}</span>
    </div>;
}