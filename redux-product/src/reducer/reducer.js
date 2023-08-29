// authReducer.js
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  token: null,
};

export { initialState, reducer };
