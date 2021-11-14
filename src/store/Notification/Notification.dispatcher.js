import {
    pushNotification as pushNotificationAction,
    removeNotification,
    unactivateNotification,
} from './Notification.action';

import store from '..';

export const NOTIFICATION_LIFE_TIME = 3000;

export const ERROR_TYPE = 'error';
export const WARNING_TYPE = 'warning';
export const SUCCESS_TYPE = 'success';

export const pushNotification = (dispatch, type, message) => {
    const { notifications } = store.getState().NotificationReducer;

    const notification = {
        type,
        message,
        isActive: true,
    };

    const isNotificationSet = notifications
        .some(({ message }) => message === notification.message);

    if (isNotificationSet) {
        return;
    }

    dispatch(pushNotificationAction(notification));

    setTimeout(() => {
        dispatch(unactivateNotification({
            ...notification,
            isActive: false,
        }));

        setTimeout(() => {
            dispatch(removeNotification(notification));
        }, 300);
    }, NOTIFICATION_LIFE_TIME);
};
