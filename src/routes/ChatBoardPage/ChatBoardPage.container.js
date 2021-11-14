import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { setActiveNavigationTab } from 'Store/ChatBoard/ChatBoard.action';

import { getQuestionsForTab } from 'Store/ChatBoard/ChatBoard.dispatcher';
import { updateActivePopupId } from 'Store/Popup/Popup.dispatcher';

import WithAuthRedirect from 'Hoc/WithAuthRedirect';

import ChatBoardPage from './ChatBoardPage.component';

import { CHAT_BOARD_MOBILE_TABS } from './ChatBoardPage.config';

export const mapStateToProps = (state) => ({
    isLoggedIn: state.AdminReducer.isLoggedIn,
    uid: state.AdminReducer.admin?.uid,
    admin: state.AdminReducer.admin,
});

export const mapDispatchToProps = (dispatch) => ({
    getQuestionsForTab: (tabId) => getQuestionsForTab(dispatch, tabId),
    setActiveNavigationTab: (tabId) => dispatch(setActiveNavigationTab(tabId)),
    openPopup: (popupId) => updateActivePopupId(dispatch, popupId),
});

export const ChatBoardPageContainer = (props) => {
    const {
        getQuestionsForTab,
        setActiveNavigationTab,
        openPopup,
    } = props;

    const [activeTabId, setActiveTabId] = useState(null);

    function onTabClick(tabId) {
        if (tabId === activeTabId) {
            return;
        }

        setActiveTabId(tabId);
        setActiveNavigationTab(tabId);
        getQuestionsForTab(tabId);
    }

    function onSelectTabClick() {
        openPopup(CHAT_BOARD_MOBILE_TABS);
    }

    const containerProps = () => ({
        activeTabId,
        setActiveTabId: onTabClick,
    });

    const containerFunctions = {
        setActiveTabId: onTabClick,
        onSelectTabClick,
    };

    return (
        <ChatBoardPage
            {...containerProps()}
            {...containerFunctions}
        />
    );
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect(),
)(ChatBoardPageContainer);
