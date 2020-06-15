const initialState = {
  user_id: '',
  api_key: '',
  user_name: '',
  email: '',
  isLoggedIn: false
}

export const loginReducer = function (state = initialState, action) {
  console.log('action ', action);
  switch (action.type) {
    case 'LOGIN':
      state = action.payload;
      return state;
    case 'LOGOUT':
      return state = initialState;
    default:
      return state;
  }
};
