import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from 'Components/Nav';
import Routes from './Routes';

export const mapStateToProps = (state) => ({
  isLoggedIn: state.AdminReducer.isLoggedIn,
});

export const mapDispatchToProps = () => ({});

export const App = (props) => {
  const { isLoggedIn } = props;

  function renderNavigation() {
    if (!isLoggedIn) {
      return null;
    }

    return (
      <div className="Navigation" style={isLoggedIn ? { display: 'block' } : { display: 'none' }}>
        <Nav />
      </div>
    );
  }

  return (
    <Router>
      <div className="Container-Wrapper" style={isLoggedIn ? { display: 'grid' } : { display: 'block' }}>
        { renderNavigation() }
        <div className="MainContent">
          <Switch>
            <Routes />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);