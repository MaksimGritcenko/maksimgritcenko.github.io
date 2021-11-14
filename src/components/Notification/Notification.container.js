import React, { memo, useEffect, useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Notification from './Notification.component';

export const mapStateToProps = (state) => ({
    notifications: state.NotificationReducer.notifications,
});

export const mapDispatchToProps = () => ({});

const MARGIN_TOP = 20;

export const NotificationContainer = (props) => {
    const { notifications, message, isActive } = props;
    const notificationRef = useRef();

    useEffect(() => {
        translateNotification();
    });

    function getFullNotificationHeight() {
        return notificationRef.current.offsetHeight
        + parseInt(window.getComputedStyle(notificationRef.current).marginBottom, 10);
    }

    function translateNotification() {
        if (!isActive) {
            notificationRef.current.style.transform = 'translateY(-200%)';
            return;
        }

        const fullNotificationHeight = getFullNotificationHeight();
        const notificationIndex = notifications
            .filter(({ isActive }) => isActive)
            .reduce((acc, { message: notificationMsg }, i) => {
                if (notificationMsg === message) {
                    acc = i;
                }

                return acc;
            },
            0);

        notificationRef.current.style.transform = `translateY(${fullNotificationHeight * notificationIndex + MARGIN_TOP}px)`;
    }

    const containerProps = {
        ...props,
        notificationRef,
    };

    return (
        <>
            <Notification {...containerProps} />
        </>
    );
};

export default compose(
    memo,
    connect(mapStateToProps, mapDispatchToProps),
)(NotificationContainer);
