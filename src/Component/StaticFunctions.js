const TOKEN = "token";
const USERNAME = "username";
export const saveToken = async (token) => {
  localStorage.setItem(TOKEN, token);
};
export const saveUsername = async (username) => {
  localStorage.setItem(USERNAME, username);
};
export const getToken = () => {
  return localStorage.getItem(TOKEN);
};
export const getUsername = () => {
  return localStorage.getItem(USERNAME);
};
export const removeToken = () => {
  localStorage.clear();
}