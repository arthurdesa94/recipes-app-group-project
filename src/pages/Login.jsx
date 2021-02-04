import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as Actions from '../actions/index';

function Login(props) {
  const [state, setState] = useState({
    email: '',
    senha: '',
  });
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleClick = () => {
    const { history } = props;

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: state.email }));

    dispatch(Actions.signIn(state.email));

    history.push('/comidas');
  };

  const verifyEmailAndPassword = () => {
    const regexEmail = new RegExp('.+@[A-z]+[.]com');
    const regexPassword = new RegExp('.{7}');

    if (regexEmail.test(state.email) && regexPassword.test(state.senha)) {
      return true;
    }
  };

  const buttonEnabled = () => (
    <button data-testid="login-submit-btn" type="button" onClick={ handleClick }>
      Entrar
    </button>
  );

  const buttonDisabled = () => (
    <button data-testid="login-submit-btn" type="button" disabled>
      Entrar
    </button>
  );

  return (
    <form>
      <label htmlFor="email">
        <input
          data-testid="email-input"
          placeholder="Insira o e-mail"
          type="text"
          name="email"
          onChange={ handleChange }
          value={ state.email }
        />
      </label>
      <label htmlFor="senha">
        <input
          data-testid="password-input"
          placeholder="Insira a senha"
          type="password"
          name="senha"
          onChange={ handleChange }
          value={ state.senha }
        />
      </label>
      {verifyEmailAndPassword() ? buttonEnabled() : buttonDisabled()}
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
