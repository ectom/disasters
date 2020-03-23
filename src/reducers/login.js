const initialState = {
  user_id: '',
  api_key: '',
  user_name: '',
  email: '',
  isLoggedIn: false
}

export const loginReducer = function (state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      const user = action.payload;
      state = user;
      console.log(state)
      return state;
    case 'LOGOUT':
      return state = {...state, initialState};
    default:
      return state;
  }
};
