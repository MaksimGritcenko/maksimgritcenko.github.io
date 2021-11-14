import BrowserDatabase from 'Utils/BrowserDatabase';
import { ADMIN, CHAT_BOARDS } from './Admin.dispatcher';

import {
    SET_ADMIN_EMAIL,
    SET_CHAT_BOARDS,
    SET_IS_LOGGED_IN,
    SET_IS_GRAND_ADMIN,
    PUSH_CHAT_BOARD_TAB,
    REMOVE_CHAT_BOARD_TAB,
    UPDATE_CHAT_BOARD_TAB,
} from './Admin.action';

export const pushChatBoard = (state, action) => {
    const { chatBoards: prevChatBoards } = state;
    const { chatBoard } = action;

    const chatBoards = [...prevChatBoards, chatBoard];

    BrowserDatabase.setItem(CHAT_BOARDS, chatBoards);

    return {
        ...state,
        chatBoards,
    };
};

export const removeChatBoard = (state, action) => {
    const { chatBoards: prevChatBoards } = state;
    const { tabId } = action;

    const chatBoards = prevChatBoards.filter(({ id }) => id !== tabId);
    BrowserDatabase.setItem(CHAT_BOARDS, chatBoards);

    return {
        ...state,
        chatBoards,
    };
};

export const updateChatBoard = (state, action) => {
    const { chatBoards: prevChatBoards } = state;
    const { tabId, tabData: data } = action;

    const idx = prevChatBoards.findIndex(({ id }) => id === tabId);
    const changedChatBoard = { data, id: tabId };
    const chatBoards = [...prevChatBoards];

    chatBoards.splice(idx, 1, changedChatBoard);

    BrowserDatabase.setItem(CHAT_BOARDS, chatBoards);

    return {
        ...state,
        chatBoards,
    };
};

export const getInitialState = () => ({
    admin: BrowserDatabase.getItem(ADMIN) || null,
    chatBoards: BrowserDatabase.getItem(CHAT_BOARDS) || null,
    isLoggedIn: !!BrowserDatabase.getItem(ADMIN),
    isGrandAdmin: true,
});

export const AdminReducer = (
    state = getInitialState(),
    action,
) => {
    switch (action.type) {
    case SET_ADMIN_EMAIL:
        const { admin } = action;

        return {
            ...state,
            admin,
        };

    case SET_IS_LOGGED_IN:
        const { isLoggedIn } = action;

        return {
            ...state,
            isLoggedIn,
        };

    case SET_IS_GRAND_ADMIN:
        const { isGrandAdmin } = action;

        return {
            ...state,
            isGrandAdmin,
        };

    case SET_CHAT_BOARDS:
        const { chatBoards } = action;

        return {
            ...state,
            chatBoards,
        };

    case PUSH_CHAT_BOARD_TAB:
        return pushChatBoard(state, action);

    case REMOVE_CHAT_BOARD_TAB:
        return removeChatBoard(state, action);

    case UPDATE_CHAT_BOARD_TAB:
        return updateChatBoard(state, action);

    default:
        return state;
    }
};

export default AdminReducer;
