import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import DrawerToggleButton from 'Components/DrawerToggleButton';

import './Header.styles.scss';
import Button from '@mui/material/Button';
import { CHAT_BOARD_MOBILE_TABS } from 'Routes/ChatBoardPage/ChatBoardPage.config';
import { updateActivePopupId } from 'Store/Popup/Popup.dispatcher';

export const mapDispatchToProps = (dispatch) => ({
    openPopup: (popupId) => updateActivePopupId(dispatch, popupId),
});

export const HeaderComponent = ({ openPopup }) => {
    function onSelectTabClick() {
        openPopup(CHAT_BOARD_MOBILE_TABS);
    }

    function renderCBTabButton() {
        if (window.location.pathname !== '/chat-board') {
            return null;
        }

        return (
            <Button
                variant="outlined"
                onClick={onSelectTabClick}
                className="Tab-Button"
            >
                Select Tab
            </Button>
        );
    }

    return (
        <header className="Header">
            { renderCBTabButton() }
            <DrawerToggleButton />
        </header>
    );
};

export default compose(
    connect(null, mapDispatchToProps),
    withRouter,
)(HeaderComponent);
