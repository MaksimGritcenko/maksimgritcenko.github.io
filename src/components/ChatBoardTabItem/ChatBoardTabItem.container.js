import React, { useState } from 'react';
import { connect } from 'react-redux';

import { deleteChatBoardTab, updateChatBoard } from 'Store/ChatBoard/ChatBoard.dispatcher';

import {
    ADMIN_COLLECTION,
    CHAT_BOARDS_SUBCOLLECTION,
} from 'Utils/Constants/dbPathnames';

import ChatBoardTabItem from './ChatBoardTabItem.component';

export const mapStateToProps = (state) => ({
    adminDocId: state.AdminReducer.admin?.docId,
});

export const mapDispatchToProps = (dispatch) => ({
    removeChatBoardTab: (path, tabId) => deleteChatBoardTab(dispatch, path, tabId),
    updateChatBoardTitle: (path, tabId, tabData) => updateChatBoard(dispatch, path, tabId, tabData),
});

export const ChatBoardTabItemContainer = (props) => {
    const {
        tabName,
        adminDocId,
        updateChatBoardTitle,
        removeChatBoardTab,
    } = props;

    const [isEditting, setIsEditting] = useState(false);
    const [editValue, setEditValue] = useState(tabName);
    const [isLoading, setIsLoading] = useState(false);

    function getPath(tabId) {
        return `${ADMIN_COLLECTION}/${adminDocId}/${CHAT_BOARDS_SUBCOLLECTION}/${tabId}`;
    }

    function removeTab(tabId) {
        setIsLoading(true);
        removeChatBoardTab(getPath(tabId), tabId);
    }

    async function editTab(tabId, tabData) {
        const isTabChangeRequired = tabData?.name?.trim() === tabName.trim();

        if (isTabChangeRequired) {
            setIsEditting(false);
            return;
        }

        try {
            setIsLoading(true);
            await updateChatBoardTitle(getPath(tabId), tabId, tabData);
            setIsEditting(false);
            setIsLoading(false);
        } catch (e) {
            alert(e);
        }
    }

    function onEditChange(e) {
        setEditValue(e.target.value);
    }

    const containerFunctions = {
        removeTab,
        editTab,
        setIsEditting,
        onEditChange,
    };

    const containerProps = {
        ...props,
        isEditting,
        editValue,
        isLoading,
    };

    return (
        <ChatBoardTabItem
            {...containerProps}
            {...containerFunctions}
        />
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoardTabItemContainer);
