import {createSlice, nanoid, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import {client, clientPost} from '../../api/client';

const initialState = {
    posts: [],
    status: 'idle',
    error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const posts = await client('https://jsonplaceholder.typicode.com/posts');
    return posts;
});

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async initialPost => {
        const response = await clientPost('https://jsonplaceholder.typicode.com/posts', initialPost);
        return response;
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toLocaleString(),
                        title,
                        content,
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        }
                    }
                };
            },
        },
        postUpdated(state, action) {
            const {id, title, content} = action.payload;
            const existingPost = state.posts.find(post => post.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
        reactionAdded(state, action) {
            const {postId, reaction} = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.posts = action.payload.map(post => ({
                id: nanoid(),
                date: new Date().toLocaleString(),
                title: post.title,
                content: post.body,
                userId: post.userId.toString(),
                reactions: {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                }
            }));
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
        [addNewPost.fulfilled]: (state, action) => {
            state.posts.push({
                ...action.payload,
                id: nanoid(),
                date: new Date().toLocaleString(),
                reactions: {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                }
            });
        }
    }
});

export const {postUpdated, reactionAdded} = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = state => state.posts.posts;

export const selectPostById = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
);

