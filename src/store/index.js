import {
    combineReducers,
    createStore,
} from 'redux';

import AdminReducer from 'Store/Admin/Admin.reducer';
import CustomerReducer from 'Store/Customer/Customer.reducer';
import PopupReducer from './Popup/Popup.reducer';
import ChatBoardReducer from './ChatBoard/ChatBoard.reducer';
import NotificationReducer from './Notification/Notification.reducer';
import DeviceReducer from './Device/Device.reducer';
import PsychoTypesReducer from './PsychoTypes/PsychoTypes.reducer';
import SettingsReducer from './Settings/Settings.reducer';

const reducers = {
    AdminReducer,
    PopupReducer,
    ChatBoardReducer,
    NotificationReducer,
    DeviceReducer,
    CustomerReducer,
    PsychoTypesReducer,
    SettingsReducer,
};

export const store = createStore(
    combineReducers(reducers),
    ( // enable Redux dev-tools only in development
        process.env.NODE_ENV === 'development'
        && window.__REDUX_DEVTOOLS_EXTENSION__
    ) && window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true,
    }),
);

export default store;
