import React from 'react';
import { Redirect } from 'react-router-dom';

import Loading from '../Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    click: false,
    ximboca: false,
    pessoa: {},
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const usuario = await getUser();
      this.setState({ loading: false, pessoa: usuario });
    });
    this.handleHandle();
  }

  handleHandle = async () => {
    const item = await getUser();
    this.setState({
      name: item.name,
      email: item.email,
      image: item.image,
      description: item.description,
    }, () => {
      const { name, email, image, description } = this.state;
      const array = [name, email, image, description];
      const handleArray = array.every((element) => element.length > 0);
      this.setState({ ximboca: handleArray });
    });
  };

  handleHandleHAndle = ({ target }) => {
    const { type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({ [target.name]: value }, () => {
      const { name, email, description, image } = this.state;
      const array = [name, email, description, image];
      const handleArray = array.every((element) => element.length > 0);
      this.setState({ ximboca: handleArray });
    });
  };

  handleUpdate = async () => {
    this.setState({ loading: true }, async () => {
      const { name, email, description, image } = this.state;
      await updateUser({ name, email, description, image });
      this.setState({ loading: false, click: true });
    });
  };

  render() {
    const { loading, click, ximboca,
      pessoa, name, email, description, image } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {loading ? <Loading /> : (
          <>
            <input
              data-testid="edit-input-name"
              name="name"
              type="text"
              value={ name }
              id={ pessoa.name }
              onChange={ this.handleHandleHAndle }
            />
            <input
              data-testid="edit-input-email"
              name="email"
              type="text"
              value={ email }
              id=""
              onChange={ this.handleHandleHAndle }
            />
            <textarea
              data-testid="edit-input-description"
              name="description"
              value={ description }
              onChange={ this.handleHandleHAndle }
            />
            <input
              data-testid="edit-input-image"
              name="image"
              type="text"
              value={ image }
              onChange={ this.handleHandleHAndle }
            />
            <button
              data-testid="edit-button-save"
              type="button"
              disabled={ !ximboca }
              onClick={ this.handleUpdate }
            >
              Salvar
            </button>
            {(!loading && click) && <Redirect to="/profile" />}
          </>
        )}
        ProfileEdit
      </div>
    );
  }
}

export default ProfileEdit;
