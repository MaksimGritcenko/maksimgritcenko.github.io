import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from 'Components/Nav';
import SideDrawerComponent from 'Components/SideDrawer/SideDrawer.component';
import { setIsMobile } from 'Store/Device/Device.action';
import { throttle } from 'Utils/DebounceAndThrottle';

import Routes from './Routes';

export const mapStateToProps = (state) => ({
  isLoggedIn: state.AdminReducer.isLoggedIn,
  admin: state.AdminReducer.admin,
  isActiveMobileNavigation: state.PopupReducer.isActiveMobileNavigation,
});

export const mapDispatchToProps = (dispatch) => ({
  setIsMobile: (isMobile) => dispatch(setIsMobile(isMobile)),
});

export const App = (props) => {
  const {
    setIsMobile,
    isLoggedIn,
    admin,
  } = props;

  useEffect(() => {
    window.addEventListener('resize', throttle(onResize, 200));

    return () => {
      window.addEventListener('resize', throttle(onResize, 200));
    };
  });

  function onResize(e) {
    const windowWidth = e.target.innerWidth;
    const newIsMobile = windowWidth < 769;
    setIsMobile(newIsMobile);
  }

  function renderNavigation() {
    if (!isLoggedIn) {
      return null;
    }

    return (
      <>
        <Nav admin={admin} />
        <SideDrawerComponent />
      </>
    );
  }

  return (
    <Router>
      <div className={`Container-Wrapper-${isLoggedIn === true ? 'isOpen' : 'isClosed'}`}>
        { renderNavigation() }
        <div className="MainContent">
          <Routes />
        </div>
      </div>
    </Router>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
