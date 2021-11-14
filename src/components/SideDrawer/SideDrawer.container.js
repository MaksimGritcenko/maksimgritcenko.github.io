import React, { useState } from 'react';
import { connect } from 'react-redux';

import SideDrawer from 'Components/SideDrawer/SideDrawer.component';
import { setActiveMobileNavigation, updateActivePopupId } from 'Store/Popup/Popup.action';
import BrowserDatabase from 'Utils/BrowserDatabase/BrowserDatabase';
import { ACTIVE_TAB_ID } from 'Components/Nav/Nav.config';
import { logout } from 'Store/Admin/Admin.dispatcher';

export const mapDispatchToProps = (dispatch) => ({
    updateActivePopupId: (activePopupId) => dispatch(updateActivePopupId(activePopupId)),
    setActiveMobileNavigation: (status) => dispatch(setActiveMobileNavigation(status)),
    logout: () => logout(dispatch),
});

const SideDrawerContainer = (props) => {
    const { updateActivePopupId, setActiveMobileNavigation, logout } = props;
    const [activeTab, setActiveTab] = useState(BrowserDatabase.getItem('activeTabId'));

    const onCloseNavigation = (tabId) => {
        setActiveTab(tabId);
        BrowserDatabase.setItem(ACTIVE_TAB_ID, tabId);
        updateActivePopupId('');
        setActiveMobileNavigation(false);
    };

    function signOut() {
        updateActivePopupId('');
        setActiveMobileNavigation(false);
        setActiveTab(1);
        logout();
    }

    return (
        <SideDrawer onClick={onCloseNavigation} activeTab={activeTab} signOut={signOut} />
    );
};

export default connect(null, mapDispatchToProps)(SideDrawerContainer);
