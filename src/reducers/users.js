export function login(state = false, action) {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS':
      return true;
    case 'USER_LOGIN_ERROR':
      return false;
    case 'USER_LOGOUT_SUCCESS':
      return false;
    case 'USER_SIGNUP_SUCCESS':
      return true;
    default:
      return state;
  }
}

export function error(state = {}, action) {
  switch (action.type) {
    case 'USER_LOGIN_ERROR':
      return {
        status: true,
        type: 'USER_LOGIN_ERROR',
        message: action.message
      };
    case 'USER_SIGNUP_ERROR':
      return {
        status: true,
        type: 'USER_SIGNUP_ERROR',
        message: action.message
      };
    default:
      return {};
  }
}
