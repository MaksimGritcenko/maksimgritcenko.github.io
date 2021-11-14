import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addChatBoardTab } from 'Store/ChatBoard/ChatBoard.dispatcher';
import { pushNotification, WARNING_TYPE } from 'Store/Notification/Notification.dispatcher';
import {
    WARNING_ON_ADDING_ALREADY_EXISTING_TAB,
} from 'Utils/Constants/notificationMessages';
import {
    ADMIN_COLLECTION,
    CHAT_BOARDS_SUBCOLLECTION,
} from 'Utils/Constants/dbPathnames';

import ChatBoardAddTabPopup from './ChatBoardAddTabPopup.component';

export const mapStateToProps = (state) => ({
    adminDocId: state.AdminReducer.admin?.docId,
    chatBoards: state.AdminReducer.chatBoards,
});

export const mapDispatchToProps = (dispatch) => ({
    addChatBoardTab: (path, tabData, setLoading) => addChatBoardTab(dispatch, path, tabData, setLoading),
    pushNotification: (type, message) => pushNotification(dispatch, type, message),
});

export const ChatBoardAddTabPopupContainer = (props) => {
    const {
        pushNotification,
        addChatBoardTab,
        adminDocId,
        chatBoards,
    } = props;

    const [tabAddInputVal, setTabAddInputVal] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function onChange(e) {
        const { target: { value } } = e;
        setTabAddInputVal(value);
    }

    async function addTab() {
        const path = `${ADMIN_COLLECTION}/${adminDocId}/${CHAT_BOARDS_SUBCOLLECTION}`;

        const isTabAlreadyExist = chatBoards.length
      && chatBoards.some(({ data: { name } }) => name.trim() === tabAddInputVal.trim());

        if (isTabAlreadyExist) {
            pushNotification(WARNING_TYPE, WARNING_ON_ADDING_ALREADY_EXISTING_TAB);
            return;
        }

        await addChatBoardTab(path, { name: tabAddInputVal }, setIsLoading);
        setTabAddInputVal('');
    }

    const containerProps = () => ({
        tabAddInputVal,
        isLoading,
    });

    const containerFunctions = {
        onChange,
        addTab,
    };

    return (
        <ChatBoardAddTabPopup
            {...props}
            {...containerProps()}
            {...containerFunctions}
        />
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoardAddTabPopupContainer);
