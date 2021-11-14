import { updateActivePopupId as updateActivePopupIdAction } from './Popup.action';

export const updateActivePopupId = (dispatch, activePopupId) => {
    setTimeout(() => dispatch(updateActivePopupIdAction(activePopupId)));
};
