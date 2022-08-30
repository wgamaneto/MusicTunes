import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    user: {},
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const response = await getUser();
      this.setState({ loading: false, user: response });
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading
          ? (
            <Loading />
          ) : (
            <p data-testid="header-user-name">{user.name}</p>
          )}
        <Link data-testid="link-to-search" to="/search">
          Search
        </Link>

        <Link data-testid="link-to-favorites" to="/favorites">
          Favorites
        </Link>

        <Link data-testid="link-to-profile" to="/profile">
          Profile
        </Link>
      </header>
    );
  }
}

export default Header;
