import React from 'react';

import './DrawerToggleButton.style.scss';
import { setActiveMobileNavigation } from 'Store/Popup/Popup.action';
import { updateActivePopupId } from 'Store/Popup/Popup.dispatcher';
import { connect } from 'react-redux';

import { SIDE_DRAWER_POPUP_ID } from 'Components/SideDrawer/SideDrawer.config';

export const mapDispatchToProps = (dispatch) => ({
    openPopup: (popupId) => updateActivePopupId(dispatch, popupId),
    setActiveMobileNavigation: (status) => dispatch(setActiveMobileNavigation(status)),
});

const DrawerToggleButton = (props) => {
    const { openPopup, setActiveMobileNavigation } = props;

    function openSideBarNavigation() {
        openPopup(SIDE_DRAWER_POPUP_ID);

        // Without setTimeout works only from second click.
        // Little hack from Scandiweb )))
        setTimeout(() => {
            setActiveMobileNavigation(true);
        }, 1);
    }

    return (
        <button type="button" className="toggle_button" onClick={openSideBarNavigation}>
            <span className="toggle_button__line" />
            <span className="toggle_button__line" />
            <span className="toggle_button__line" />
        </button>
    );
};

export default connect(null, mapDispatchToProps)(DrawerToggleButton);
