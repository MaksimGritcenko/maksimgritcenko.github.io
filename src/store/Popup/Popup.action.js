export const UPDATE_ACTIVE_POPUP_ID = 'UPDATE_ACTIVE_POPUP_ID';
export const SET_ACTIVE_MOBILE_NAVIGATION = 'SET_ACTIVE_MOBILE_NAVIGATION';

export const updateActivePopupId = (activePopupId) => ({
    type: UPDATE_ACTIVE_POPUP_ID,
    activePopupId,
});

export const setActiveMobileNavigation = (status) => ({
    type: SET_ACTIVE_MOBILE_NAVIGATION,
    status,
});
