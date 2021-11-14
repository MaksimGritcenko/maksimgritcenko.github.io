import {
    PUSH_NOTIFICATION,
    REMOVE_NOTIFICATION,
    UNACTIVATE_NOTIFICATION,
} from './Notification.action';

export const pushNotification = (state, action) => {
    const { notifications: prevNotifications } = state;
    const { notification } = action;

    const notifications = [notification, ...prevNotifications];

    return {
        ...state,
        notifications,
    };
};

export const removeNotification = (state, action) => {
    const { notifications: prevNotifications } = state;
    const { notification } = action;

    const notifications = prevNotifications
        .filter(({ message }) => message !== notification.message);

    return {
        ...state,
        notifications,
    };
};

export const unactivateNotification = (state, action) => {
    const { notifications: prevNotifications } = state;
    const { notification } = action;

    const oldNotifications = prevNotifications
        .filter(({ message }) => message !== notification.message);

    const notifications = [...oldNotifications, notification];

    return {
        ...state,
        notifications,
    };
};

const getInitialState = () => ({
    notifications: [],
});

export const NotificationReducer = (
    state = getInitialState(),
    action,
) => {
    switch (action.type) {
    case PUSH_NOTIFICATION:
        return pushNotification(state, action);

    case REMOVE_NOTIFICATION:
        return removeNotification(state, action);

    case UNACTIVATE_NOTIFICATION:
        return unactivateNotification(state, action);

    default:
        return state;
    }
};

export default NotificationReducer;
