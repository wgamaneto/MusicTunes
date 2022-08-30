import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';

class Login extends React.Component {
  state = {
    nome: '',
    loading: false,
    click: false,
  };

  handleClick = () => {
    this.setState({ click: true });
    const { nome } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: nome });
      this.setState({ loading: false });
    });
  };

  render() {
    const { nome, loading, click } = this.state;
    const minimo = 3;
    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          onChange={ ({ target: { value } }) => this.setState({ nome: value }) }

        />

        <button
          data-testid="login-submit-button"
          type="button"
          onClick={ this.handleClick }
          disabled={ nome.length < minimo }

        >
          Entrar
        </button>
        {loading === true && (
          <Loading />
        )}
        {(!loading && click) && (
          <Redirect to="/search" />
        )}

      </div>
    );
  }
}

export default Login;
