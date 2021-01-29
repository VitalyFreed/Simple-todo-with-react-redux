import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from "react-router-dom";

import {fetchNotifications, selectAllNotifications} from '../features/notifications/notificationSlice';

export const Navbar = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(selectAllNotifications);
    const numUnreadNotifications = notifications.filter(n => !n.read).length;

    let unreadNotificationsBadge;

    if (numUnreadNotifications > 0) {
        unreadNotificationsBadge = (<span className="badge">{numUnreadNotifications}</span>);
    }

    const fetchNewNotifications = () => {
        dispatch(fetchNotifications());
    }

    return (
        <nav>
            <section>
                <h1>Redux Essentials Example</h1>

                <div className="navContent">
                    <div className="navLinks">
                        <Link to="/">Посты</Link>
                        <Link to="/users">Пользователи</Link>
                        <Link to="/notifications">Уведомления {unreadNotificationsBadge}</Link>
                    </div>
                    <button className="button" onClick={fetchNewNotifications}>
                        Обновить уведомления
                    </button>
                </div>
            </section>
        </nav>
    )
}