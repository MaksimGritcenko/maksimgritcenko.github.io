import { ERROR_TYPE, pushNotification } from 'Store/Notification/Notification.dispatcher';
import { updateOnboardingContent } from 'Store/Settings/Settings.action';

import { CUSTOMIZABLE_CONTENT, CUSTOMIZABLE_ONBOARDING } from 'Utils/Constants/dbPathnames';
import {
    addOrUpdateDoc,
    getCollectionDocs,
} from 'Utils/Query';

export const updateOnboardingSlidesContent = async (dispatch, data, prevData, setLoading) => {
    const path = `${CUSTOMIZABLE_CONTENT}/${CUSTOMIZABLE_ONBOARDING}`;

    const newContent = prevData.map((contentItem) => {
        const { data: prevDocData, id } = contentItem;

        if (id !== CUSTOMIZABLE_ONBOARDING) {
            return contentItem;
        }

        const newContentItemData = {
            ...prevDocData,
            ...data,
        };

        return {
            data: newContentItemData,
            id,
        };
    });

    try {
        setLoading(true);
        await addOrUpdateDoc(path, data);
        dispatch(updateOnboardingContent(newContent));
        setLoading(false);
    } catch (e) {
        pushNotification(dispatch, ERROR_TYPE, e);
    }
};

export const getCustomizableContent = async (dispatch) => {
    const path = `${CUSTOMIZABLE_CONTENT}`;

    try {
        const content = await getCollectionDocs(path);
        dispatch(updateOnboardingContent(content));
    } catch (e) {
        pushNotification(dispatch, ERROR_TYPE, e);
    }
};
