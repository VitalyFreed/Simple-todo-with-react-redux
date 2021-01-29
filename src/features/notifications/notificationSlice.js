import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {client} from '../../api/client';

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async () => {
        const response = await client(`https://jsonplaceholder.typicode.com/comments`);
        return response;
    }
);

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        allNotificationsRead(state, action) {
            state.forEach(notification => {
                notification.read = true
            });
        }
    },
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, action) => {
            const randomNumber = Math.round(Math.random() * 500);
            const newNotification = {
                id: action.payload[randomNumber].id,
                user: action.payload[randomNumber].postId,
                date: new Date().toLocaleString(),
                message: action.payload[randomNumber].name,
                read: false
            };
            state.push(newNotification);
            state.forEach(notification => notification.isNew = !notification.read);
            state.sort((a, b) => b.date.localeCompare(a.date));
        }
    }
});

export default notificationsSlice.reducer;

export const {allNotificationsRead} = notificationsSlice.actions;

export const selectAllNotifications = state => state.notifications;