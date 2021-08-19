import { combineReducers } from "redux";
//import notificationsSlice from '@local/features/notifications/notificationsSlice';
import customersApi from "./services";
import appointmentSlice from "./reducerSlice";

const rootReducer = combineReducers({
  [customersApi.reducerPath]: customersApi.reducer,
  [appointmentSlice.name]: appointmentSlice.reducer
});

export default rootReducer;
