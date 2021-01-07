import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from "./reducers"

const saveToLocalStorage = state => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const initialState = {

}

const middleware = [thunk]

const store = createStore(rootReducer, loadFromLocalStorage(), composeWithDevTools(applyMiddleware(...middleware)))

/*window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
