import React, { memo, useState, useEffect } from 'react';

import './Notification.style.scss';

export const Notification = (props) => {
    const {
        type,
        message,
        isActive,
        notificationRef,
    } = props;

    const [isActiveState, setIsActiveState] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsActiveState(isActive));
    }, [isActive]);

    const className = `Notification Notification-${type} ${isActiveState && 'Notification_isActive'}`;

    return (
        <div
            className={className}
            ref={notificationRef}
        >
            { message }
        </div>
    );
};

export default memo(Notification);
