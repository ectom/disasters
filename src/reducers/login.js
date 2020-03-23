export const loginReducer = function (state = {}, action) {
  switch (action.type) {
    case 'LOGIN':
      state = action.payload
      return state;
    case 'LOGOUT':
      return state = {};
    default:
      return state;
  }
};
