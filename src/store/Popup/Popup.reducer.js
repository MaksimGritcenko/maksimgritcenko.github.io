import {
    UPDATE_ACTIVE_POPUP_ID,
    SET_ACTIVE_MOBILE_NAVIGATION,
} from './Popup.action';

const getInitialState = () => ({
    activePopupId: '',
    isActiveMobileNavigation: false,
});

export const PopupReducer = (
    state = getInitialState(),
    action,
) => {
    switch (action.type) {
    case UPDATE_ACTIVE_POPUP_ID:
        const { activePopupId } = action;

        return {
            ...state,
            activePopupId,
        };

    case SET_ACTIVE_MOBILE_NAVIGATION:
        const { status } = action;

        return {
            ...state,
            isActiveMobileNavigation: status,
        };

    default:
        return state;
    }
};

export default PopupReducer;
