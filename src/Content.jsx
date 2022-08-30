import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Album from './pages/Album';
import Search from './pages/Search';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" Component={ Login } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/profile" component={ Profile } />
        <Route path="/profileEdit" component={ ProfileEdit } />
        <Route path="/profile" component={ Profile } />
        <Route path="/search" component={ Search } />
        <Route path=" " component={ NotFound } />
      </Switch>
    );
  }
}

export default Content;
