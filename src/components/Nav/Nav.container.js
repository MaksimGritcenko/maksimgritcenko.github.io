import React from 'react';
import { connect } from 'react-redux';
import NavComponent from 'Components/Nav/Nav.component';
import { setActiveNavigationTab } from 'Store/ChatBoard/ChatBoard.action';
import BrowserDatabase from 'Utils/BrowserDatabase';
import { ACTIVE_TAB_ID } from 'Components/Nav/Nav.config';
import { logout } from 'Store/Admin/Admin.dispatcher';

export const mapStateToProps = (state) => ({
    activeTab: state.ChatBoardReducer.activeTab,
    admin: state.AdminReducer.admin,
});

export const mapDispatchToProps = (dispatch) => ({
    setActiveNavigationTab: (tabId) => dispatch(setActiveNavigationTab(tabId)),
    logout: () => logout(dispatch),
});

export const NavContainer = (props) => {
    const {
        setActiveNavigationTab,
        activeTab,
        logout,
    } = props;

    const handleClickActiveTab = (tabId) => {
        setActiveNavigationTab(tabId);
        BrowserDatabase.setItem(ACTIVE_TAB_ID, tabId);
    };

    function signOut() {
        logout();
    }

    return (
        <NavComponent
            {...props}
            onClick={handleClickActiveTab}
            activeTab={activeTab}
            signOut={signOut}
        />
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
