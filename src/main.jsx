import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from './Context/AuthContext'; 
import store from './Store/Store'; 
import App from './App';
import './index.css'

ReactDOM.render(
    <Provider store={store}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Provider>,
    document.getElementById('root')
);
