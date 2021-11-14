import { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import NotificationList from './NotificationList.component';

export const mapStateToProps = (state) => ({
    notifications: state.NotificationReducer.notifications,
});

export const mapDispatchToProps = () => ({});

export default compose(
    memo,
    connect(mapStateToProps, mapDispatchToProps),
)(NotificationList);
