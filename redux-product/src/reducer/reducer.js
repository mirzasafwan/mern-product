// Define a reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_FIELD:
      return {
        ...state,
        form: {
          ...state.form,
          [action.fieldName]: action.fieldValue,
        },
      };
    case actionTypes.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case actionTypes.TOGGLE_PASSWORD_VISIBILITY: // Handle the new action type
      return {
        ...state,
        isPasswordVisible: !state.isPasswordVisible,
      };
    default:
      return state;
  }
};
// Define reducer action types
const actionTypes = {
  SET_FIELD: "SET_FIELD",
  SET_ERROR_MESSAGE: "SET_ERROR_MESSAGE",
  TOGGLE_PASSWORD_VISIBILITY: "TOGGLE_PASSWORD_VISIBILITY", // Add a new action type
};
// Define an initial state
const initialState = {
  form: {
    name: "",
    email: "",
    password: "",
  },
  errorMessage: "",
  isPasswordVisible: false,
};

export { actionTypes, initialState, reducer };
