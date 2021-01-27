import React from 'react';

function Login() {
  return (
    <form>
      <label htmlFor="email">
        <input
          data-testid="email-input"
          placeHolder="Insira o e-mail"
          type="text"
          name="email"
        />
      </label>
      <label htmlFor="senha">
        <input
          data-testid="password-input"
          placeHolder="Insira a senha"
          type="email"
          name="senha"
        />
      </label>
      <button data-testid="login-submit-btn" type="button">
        Entrar
      </button>
    </form>
  );
}

export default Login;
