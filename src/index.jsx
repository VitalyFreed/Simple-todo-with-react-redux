import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import store from './app/store';
import {fetchUsers} from "./features/users/usersSlice";

import App from './app.jsx';

store.dispatch(fetchUsers());

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('content')
);