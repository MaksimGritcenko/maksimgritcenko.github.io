export const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const UNACTIVATE_NOTIFICATION = 'UNACTIVATE_NOTIFICATION';

export const pushNotification = (notification) => ({
    type: PUSH_NOTIFICATION,
    notification,
});

export const removeNotification = (notification) => ({
    type: REMOVE_NOTIFICATION,
    notification,
});

export const unactivateNotification = (notification) => ({
    type: UNACTIVATE_NOTIFICATION,
    notification,
});
