import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'Style/index.scss';
import store from 'Store/index';

import App from 'Components/App';
import 'Style/normalize.css';

if (module.hot) module.hot.accept();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
