import React from 'react';
import { Link } from 'react-router-dom';

import Loading from '../Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: false,
    people: {},
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const usuario = await getUser();
      this.setState({ loading: false, people: usuario });
    });
  }

  render() {
    const { loading, people } = this.state;
    return (
      <div data-testid="page-profile">
        { loading ? <Loading /> : (
          <>
            <p>{people.name}</p>
            <p>{people.email}</p>
            <p>{people.description}</p>
            <img
              data-testid="profile-image"
              src={ people.image }
              alt="adamastor"
            />
            <Link to="/profile/edit">
              Editar perfil
            </Link>
          </>
        )}
        Profile
      </div>
    );
  }
}

export default Profile;
