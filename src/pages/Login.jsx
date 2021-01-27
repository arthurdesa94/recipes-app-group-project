import React, { useState } from 'react';

function Login() {
  const [state, setState] = useState({
    email: '',
    senha: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <form>
      <label htmlFor="email">
        <input
          data-testid="email-input"
          placeHolder="Insira o e-mail"
          type="text"
          name="email"
          onChange={ handleChange }
          value={ state.email }
        />
      </label>
      <label htmlFor="senha">
        <input
          data-testid="password-input"
          placeHolder="Insira a senha"
          type="email"
          name="senha"
          onChange={ handleChange }
          value={ state.senha }
        />
      </label>
      <button data-testid="login-submit-btn" type="button">
        Entrar
      </button>
    </form>
  );
}

export default Login;
