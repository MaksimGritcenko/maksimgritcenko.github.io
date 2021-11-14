export const SET_ADMIN_EMAIL = 'SET_ADMIN';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_IS_GRAND_ADMIN = 'SET_IS_GRAND_ADMIN';
export const SET_CHAT_BOARDS = 'SET_CHAT_BOARDS';
export const PUSH_CHAT_BOARD_TAB = 'PUSH_CHAT_BOARD_TAB';
export const REMOVE_CHAT_BOARD_TAB = 'REMOVE_CHAT_BOARD_TAB';
export const UPDATE_CHAT_BOARD_TAB = 'UPDATE_CHAT_BOARD_TAB';

export const setAdmin = (admin) => ({
    type: SET_ADMIN_EMAIL,
    admin,
});

export const setIsLoggedIn = (isLoggedIn) => ({
    type: SET_IS_LOGGED_IN,
    isLoggedIn,
});

export const setIsGrandAdmin = (isGrandAdmin) => ({
    type: SET_IS_GRAND_ADMIN,
    isGrandAdmin,
});

export const setChatBoards = (chatBoards) => ({
    type: SET_CHAT_BOARDS,
    chatBoards,
});

export const pushChatBoard = (chatBoard) => ({
    type: PUSH_CHAT_BOARD_TAB,
    chatBoard,
});

export const removeChatBoardTab = (tabId) => ({
    type: REMOVE_CHAT_BOARD_TAB,
    tabId,
});

export const updateChatBoardTab = (tabId, tabData) => ({
    type: UPDATE_CHAT_BOARD_TAB,
    tabId,
    tabData,
});
