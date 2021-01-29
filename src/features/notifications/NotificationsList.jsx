import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

import {selectAllUsers} from "../users/usersSlice";
import {selectAllNotifications, allNotificationsRead} from "./notificationSlice";

export const NotificationsList = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(selectAllNotifications);
    const users = useSelector(selectAllUsers);
    
    useEffect(() => {
       dispatch(allNotificationsRead());
    });

    const renderedNotifications = notifications.map(notification => {
        const date = new Date().toLocaleString();
        const user = users.find(user => user.id === notification.user) || {name: 'Неизвестное имя'};

        const notificationClassname = classnames('notification', {
            new: notification.isNew
        });

        return (
            <div key={notification.id} className={notificationClassname}>
                <div>
                    <b>{user.name}</b>
                    <p>{notification.message}</p>
                </div>
                <div title={notification.date}>
                    <i>Дата: {date}</i>
                </div>
            </div>
        );
    });

    return (
        <section className="notificationsList">
            <h2>Уведомления</h2>
            {renderedNotifications}
        </section>
    );
}