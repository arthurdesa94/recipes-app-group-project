const SIGN_IN = 'SING_IN';

export const signIn = (email) => ({
  type: SIGN_IN,
  email,
});

export const signOut = (name, email) => ({
  type: SIGN_IN,
  name,
  email,
});
