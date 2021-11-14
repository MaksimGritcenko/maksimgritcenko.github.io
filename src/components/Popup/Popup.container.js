import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { updateActivePopupId, setActiveMobileNavigation } from 'Store/Popup/Popup.action';

import { ESCAPE_CODE } from './Popup.config';

import Popup from './Popup.component';

export const mapStateToProps = (state) => ({
    activePopupId: state.PopupReducer.activePopupId,
});

export const mapDispatchToProps = (dispatch) => ({
    updateActivePopupId: (activePopupId) => dispatch(updateActivePopupId(activePopupId)),
    setActiveMobileNavigation: (status) => dispatch(setActiveMobileNavigation(status)),
});

export const PopupContainer = (props) => {
    const {
        updateActivePopupId, popupId, activePopupId, setActiveMobileNavigation,
    } = props;

    useEffect(() => {
        document.addEventListener('keyup', onEscUp);
    });

    const containerFunctions = {
        closePopup,
    };

    function onEscUp(e) {
        const { keyCode } = e;

        if (keyCode === ESCAPE_CODE) {
            closePopup();
        }
    }

    function closePopup() {
        if (popupId !== activePopupId) {
            return;
        }

        updateActivePopupId('');
        setActiveMobileNavigation(false);
    }

    return (
        <Popup
            {...props}
            {...containerFunctions}
        />
    );
};

export default compose(
    memo,
    connect(mapStateToProps, mapDispatchToProps),
)(PopupContainer);
