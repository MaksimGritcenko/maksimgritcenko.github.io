import { setAdmin, setIsLoggedIn, setChatBoards } from 'Store/Admin/Admin.action';
import { pushNotification, SUCCESS_TYPE } from 'Store/Notification/Notification.dispatcher';
import { signInWithEmailAndPassword, logout as logoutQuery } from 'Queries/Auth.queries';
import BrowserDatabase from 'Utils/BrowserDatabase';
import { getDocId, getCollectionDocs, getDocByPath } from 'Utils/Query';
import { SUCCESS_LOGIN_MESSAGE, SUCCESS_LOGOUT_MESSAGE } from 'Utils/Constants/notificationMessages';

import {
    ADMIN_COLLECTION,
    CHAT_BOARDS_SUBCOLLECTION,
} from 'Utils/Constants/dbPathnames';

export const ADMIN = 'ADMIN';
export const CHAT_BOARDS = 'CHAT_BOARDS';

export const login = async (dispatch, data) => {
    const {
        email: emailToSend,
        password,
    } = data;

    try {
        const { user: { uid } } = await signInWithEmailAndPassword(emailToSend, password);
        const docId = await getDocId(ADMIN_COLLECTION, 'uid', uid);
        const user = await getDocByPath(`${ADMIN_COLLECTION}/${docId}`);
        const chatBoards = await getCollectionDocs(`${ADMIN_COLLECTION}/${docId}/${CHAT_BOARDS_SUBCOLLECTION}`);

        const admin = {
            ...user,
            docId,
        };

        dispatch(setAdmin(admin));
        dispatch(setChatBoards(chatBoards));
        dispatch(setIsLoggedIn(true));
        pushNotification(
            dispatch,
            SUCCESS_TYPE,
            SUCCESS_LOGIN_MESSAGE,
        );

        setBrowserDB(admin, chatBoards);
    } catch (e) {
        alert(e);
    }
};

export const logout = (dispatch) => {
    logoutQuery();

    dispatch(setAdmin(null));
    dispatch(setIsLoggedIn(false));
    pushNotification(
        dispatch,
        SUCCESS_TYPE,
        SUCCESS_LOGOUT_MESSAGE,
    );

    dropBrowserDB();
};

export const dropBrowserDB = () => {
    BrowserDatabase.deleteItem(ADMIN);
    BrowserDatabase.deleteItem(CHAT_BOARDS);
};

export const setBrowserDB = (admin, chatBoards) => {
    BrowserDatabase.setItem(ADMIN, admin);
    BrowserDatabase.setItem(CHAT_BOARDS, chatBoards);
};
