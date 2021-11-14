import { getCollectionDocs } from 'Utils/Query';
import { PSYCHOTYPES_COLLECTION } from 'Utils/Constants/dbPathnames';
import { ERROR_TYPE, pushNotification } from 'Store/Notification/Notification.dispatcher';

import { updatePsychotypes } from './PsychoTypes.action';

export const getPsychotypes = async (dispatch) => {
    try {
        const psychotypes = await getCollectionDocs(PSYCHOTYPES_COLLECTION);
        dispatch(updatePsychotypes(psychotypes));
    } catch (e) {
        pushNotification(
            dispatch,
            ERROR_TYPE,
            e,
        );
    }
};
