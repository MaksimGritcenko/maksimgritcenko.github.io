import React, { cloneElement } from 'react';
import { Route } from 'react-router-dom';

import AuthPage from 'Routes/AuthPage';
import ChatBoardPage from 'Routes/ChatBoardPage';
import CustomersPage from 'Routes/CustomersPage';
import MainPage from 'Routes/MainPage';
import StatisticsPage from 'Routes/StatisticsPage';
import GrandAdminPage from 'Routes/GrandAdminPage';
import NotificationList from 'Components/NotificationList';

export const Routes = () => {
    function getRenderComponentsMap() {
        return [
            {
                component: <NotificationList />,
                position: 0,
            },
        ];
    }

    function getRenderSwitchMap() {
        return [
            {
                component: <Route exact path="/" render={(props) => <MainPage {...props} />} />,
                position: 100,
            },
            {
                component: <Route path="/auth" render={(props) => <AuthPage {...props} />} />,
                position: 105,
            },
            {
                component: <Route path="/chat-board" render={(props) => <ChatBoardPage {...props} />} />,
                position: 110,
            },
            {
                component: <Route path="/customers" render={(props) => <CustomersPage {...props} />} />,
                position: 115,
            },
            {
                component: <Route path="/statistics" render={(props) => <StatisticsPage {...props} />} />,
                position: 120,
            },
            {
                component: <Route path="/grand-admin" render={(props) => <GrandAdminPage {...props} />} />,
                position: 125,
            },
        ];
    }

    function renderComponents() {
        return getRenderComponentsMap().map(({
            component,
            position,
        }) => cloneElement(component, { key: position }));
    }

    function renderRoutes() {
        return getRenderSwitchMap().map(({
            component,
            position,
        }) => cloneElement(component, { key: position }));
    }

    return (
        <>
            { renderComponents() }
            { renderRoutes() }
        </>
    );
};

export default Routes;
