import React, { memo } from 'react';

import ClickOutside from 'Components/ClickOutside';
import CloseBtn from 'Components/CloseBtn';
import { classesToClassName } from 'Utils/ClassName';

import './Popup.style.scss';

export const Popup = (props) => {
    const {
        popupId,
        activePopupId,
        children,
        hookClasses,
        closePopup,
    } = props;

    const isActive = popupId === activePopupId;

    function renderCloseBtn() {
        return <CloseBtn onClick={closePopup} className="Popup-Close" />;
    }

    const activeWrapperClassName = isActive ? 'Popup-Wrapper_isActive' : '';
    const activeContentClassName = isActive ? 'Popup-Content_isActive' : '';

    return (
        <div className={`Popup-Wrapper ${activeWrapperClassName}`}>
            <ClickOutside onClick={closePopup}>
                <div className={`Popup-Content ${classesToClassName(hookClasses)} ${activeContentClassName}`}>
                    { children }
                    { renderCloseBtn() }
                </div>
            </ClickOutside>
        </div>
    );
};

export default memo(Popup);
