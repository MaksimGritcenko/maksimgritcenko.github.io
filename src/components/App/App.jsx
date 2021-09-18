import React, { useEffect } from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from 'Components/Nav';
import SideDrawerComponent from 'Components/SideDrawer';
import { setIsMobile } from 'Store/Device/Device.action';
import { throttle } from 'Utils/DebounceAndThrottle';
import { getPsychotypes } from 'Store/PsychoTypes/PsychoTypes.dispatcher';
import { getCustomizableContent } from 'Store/Settings/Settings.dispatcher';
import Header from 'Components/Header';

import Routes from './Routes';

export const mapStateToProps = (state) => ({
    isLoggedIn: state.AdminReducer.isLoggedIn,
    admin: state.AdminReducer.admin,
    isActiveMobileNavigation: state.PopupReducer.isActiveMobileNavigation,
    isMobile: state.DeviceReducer.isMobile,
});

export const mapDispatchToProps = (dispatch) => ({
    init: async () => {
        getPsychotypes(dispatch);
        getCustomizableContent(dispatch);
    },
    setIsMobile: (isMobile) => dispatch(setIsMobile(isMobile)),
});

export const App = (props) => {
    const {
        setIsMobile,
        isLoggedIn,
        admin,
        isActiveMobileNavigation,
        init,
        isMobile,
    } = props;

    useEffect(() => {
        window.addEventListener('resize', throttle(onResize, 200));
        init();

        return () => {
            window.addEventListener('resize', throttle(onResize, 200));
        };
    }, []);

    function onResize(e) {
        const windowWidth = e.target.innerWidth;
        const newIsMobile = windowWidth < 769;
        setIsMobile(newIsMobile);
    }

    function renderMobileHeader() {
        return (
            <Header />
        );
    }

    function renderNavigation() {
        if (!isLoggedIn) {
            return null;
        }

        return (
            <>
                { isMobile && renderMobileHeader() }
                <Nav admin={admin} />
                <SideDrawerComponent />
            </>
        );
    }

    return (
        <Router>
            <div className={`Container-Wrapper-${isLoggedIn === true ? 'isOpen' : 'isClosed'}`}>
                { renderNavigation() }
                <div className={`MainContent ${isActiveMobileNavigation ? 'isOpen' : ''}`}>
                    <Switch>
                        <Routes />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
