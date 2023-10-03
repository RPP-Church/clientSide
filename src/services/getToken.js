export function getToken() {
  let user = window.localStorage.getItem('user');
  let token;
  if (user) {
    token = JSON.parse(user);
  }

  return token;
}
