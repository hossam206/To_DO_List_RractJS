import { configureStore } from "@reduxjs/toolkit";
import ToDoListSlice from "./ToDoSlice";
const store = configureStore({
  reducer: {
    ToDos: ToDoListSlice,
  },
});
export default store;
