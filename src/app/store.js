import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import customerApi from "./services";

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customerApi.middleware)
});

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
}

console.log(store);

export default store;
