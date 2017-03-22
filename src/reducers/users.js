export function login(state = false, action) {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS':
      return true;
    case 'USER_LOGIN_ERROR':
      return false;
    case 'USER_LOGOUT_SUCCESS':
      return false;
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
    default:
      return {};
  }
}
