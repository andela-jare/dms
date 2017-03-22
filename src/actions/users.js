import request from 'superagent';

export function userLogin() {
  return {
    type: 'USER_LOGIN_SUCCESS'
  };
}

export function userLoginError(message) {
  return {
    type: 'USER_LOGIN_ERROR', message
  };
}

export function userLogout() {
  return {
    type: 'USER_LOGOUT_SUCCESS'
  };
}

export function login(credential) {
  return function(dispatch) {
    return request.post('http://localhost:3000/login')
      .send(credential)
      .end((err, res) => {
        if (err) {
          return dispatch(userLoginError(res.body.message));
        }
        localStorage.setItem('token', res.body.token);
        dispatch(userLogin());
      });
  }
}

export function logout() {
  return function(dispatch) {
    return request.post('http://localhost:3000/logout')
      .set({ 'x-access-token': localStorage.token })
      .end((err, res) => {
        if (err) {
          console.log(res);
          return false;
        }
        localStorage.removeItem('token');
        dispatch(userLogout());
      });
  }
}
