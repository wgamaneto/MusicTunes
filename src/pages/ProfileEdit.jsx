import React from 'react';
// import { Link } from 'react-router-dom';

// import Loading from '../Loading';
// import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    // loading: false,
    // ximboca: {},
  };

  componentDidMount() {
    // this.setState({ loading: true }, async () => {
    //   const usuario = await getUser();
    //   this.setState({ loading: false, people: usuario });
    // });
  }

  render() {
    // const { loading, people } = this.state;
    return (
      <div data-testid="page-profile-edit">
        ProfileEdit
      </div>
    );
  }
}

export default ProfileEdit;
