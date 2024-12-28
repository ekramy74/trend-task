import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./Tasks/TasksSlice.ts";
import { combineReducers } from "redux";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: {
    tasks: TaskReducer,

  },
});

const rootReducer = combineReducers({
  tasks: TaskReducer,

});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export default store;
