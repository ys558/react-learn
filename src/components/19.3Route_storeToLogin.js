import { createStore, combineReducers } from "redux";

const initialLogin = {
  isLogin: false,
  name: null,
};

const loginReducer = (state = {...initialLogin}, action) => {
  switch (action.type) {
    case "getUserInfo":
      return { ...state, isLogin: false, name: null };
    case "LoginSuccess":
      return { ...state, isLogin: true, name: "xiaoming" };
    case "LoginFailure":
      return { ...state, isLogin: false, name: null };
    default:
      return state
  }
};

const store = createStore(combineReducers({ user: loginReducer }));

export default store;