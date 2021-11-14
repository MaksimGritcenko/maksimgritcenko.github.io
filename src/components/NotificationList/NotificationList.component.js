import React, { memo } from 'react';

import Notification from 'Components/Notification';

export const NotificationList = (props) => {
    const { notifications } = props;

    const renderNotificationList = () => {
        if (!notifications.length) {
            return null;
        }

        return notifications
            .map((notification) => (
                <Notification
                    key={notification.message}
                    {...notification}
                />
            ));
    };

    return (
        <div className="NotificationList">
            { renderNotificationList() }
        </div>
    );
};

export default memo(NotificationList);
