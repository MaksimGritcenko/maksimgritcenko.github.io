import React from 'react';
import { connect } from 'react-redux';

import { updateActivePopupId } from 'Store/Popup/Popup.dispatcher';
import { CHATBOARD_ADD_TAB_POPUP } from 'Components/ChatBoardAddTabPopup/ChatBoardAddTabPopup.config';

import ChatBoardTabItem from './ChatBoardTabs.component';

export const mapStateToProps = (state) => ({
    tabs: state.AdminReducer.chatBoards,
});

export const mapDispatchToProps = (dispatch) => ({
    openPopup: (popupId) => updateActivePopupId(dispatch, popupId),
});

export const ChatBoardTabItemContainer = (props) => {
    const { openPopup } = props;

    function onAddTabClick() {
        openPopup(CHATBOARD_ADD_TAB_POPUP);
    }

    const containerFunctions = {
        onAddTabClick,
    };

    const containerProps = {
        ...props,
    };

    return (
        <ChatBoardTabItem
            {...containerProps}
            {...containerFunctions}
        />
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoardTabItemContainer);
