import { createStore } from "redux"
import MenuReducer from "./reducers/MenuReducer"

const Store = createStore(MenuReducer)

export default Store