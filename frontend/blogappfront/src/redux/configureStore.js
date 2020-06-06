import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./index";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";
import { setAuthorizationHeader } from "../apiCalls/userApiCalls";

const secureLs = new SecureLS();

const getStateFromStorage = () => {
  const auth = secureLs.get("blog-auth");

  let stateInLocalStage = {
    auth: {
      isLoggedIn: false,
      id: null,
      email: null,
      firstName: null,
      lastName: null,
      image: null,
      password: null,
    },
  };

  if (auth) {
    try {
      return auth;
    } catch (error) {}
  }
  return stateInLocalStage;
};

const updateStateInStorage = (newState) => {
  secureLs.set("blog-auth", newState);
};

const configureStore = () => {
  const initalState = getStateFromStorage();

  setAuthorizationHeader(initalState.auth);

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    initalState,
    composeEnhancers(applyMiddleware(thunk))
  );
  store.subscribe(() => {
    updateStateInStorage(store.getState());
    setAuthorizationHeader(store.getState().auth);
  });

  return store;
};

export default configureStore;
