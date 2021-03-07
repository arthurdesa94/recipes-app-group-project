import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
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
    <button
      className="transition-all animate-pulse duration-500 text-center mt-4 border-b-2 border-green-300 w-20 h-20 rounded-full"
      data-testid="login-submit-btn"
      type="button"
      onClick={ handleClick }
    >
      <FontAwesomeIcon
        size="4x"
        className="fill-current text-green-300"
        icon={ faArrowAltCircleRight }
      />
    </button>
  );

  const buttonDisabled = () => (
    <button
      className="transition-all duration-500 text-center opacity-40 w-20 h-20 rounded-full"
      data-testid="login-submit-btn"
      type="button"
      disabled
    >
      <FontAwesomeIcon
        size="4x"
        className="fill-current text-white"
        icon={ faArrowAltCircleRight }
      />
    </button>
  );

  return (
    <div className="overflow-hidden">
      <div className="absolute text-shadow bg-left bg-login-image  bg-cover z-30 h-screen flex overflow-hidden justify-center flex-column items-center w-screen">
        <h1 className="subpixel-antialiased text-shadow text-center rounded-lg mx-auto font-pacifico text-white z-50 w-auto text-6xl">
          TrybeLicious!
        </h1>
        <form className="flex blur mt-8 bg-clip-padding flex-column border-b-4 border-t-4 z-50 rounded-xl border-white justify-center items-center p-4 shadow-xl w-10/12 h-60">
          <label className="w-11/12 h-1/3" htmlFor="email">
            <input
              className="focus:outline-none w-full h-full opacity-80 focus:opacity-100  text-center border-b-2 border-white focus:border-green-300 rounded-lg"
              data-testid="email-input"
              placeholder="Insira o e-mail"
              type="text"
              name="email"
              onChange={ handleChange }
              value={ state.email }
            />
          </label>
          <label className="w-11/12 h-1/3" htmlFor="senha">
            <input
              className="focus:outline-none w-full h-full opacity-80 focus:opacity-100 text-center  border-b-2 border-white focus:border-green-300 rounded-lg"
              data-testid="password-input"
              placeholder="Insira a senha"
              type="password"
              name="senha"
              onChange={ handleChange }
              value={ state.senha }
            />
          </label>
        </form>
        {verifyEmailAndPassword() ? buttonEnabled() : buttonDisabled()}
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
