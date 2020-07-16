export const isBrowser = () => typeof window !== 'undefined';

export const getToken = () =>
  isBrowser() && localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null;

const setToken = (token) => localStorage.setItem('token', token);

export const isLoggedIn = () => {
  const token = getToken();

  return !!token;
};

export const logout = (callback) => {
  setToken(null);
  callback();
};
