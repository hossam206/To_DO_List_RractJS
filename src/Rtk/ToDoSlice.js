import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  ToDoList: JSON.parse(localStorage.getItem("Tasks")) || [],
};

const ToDoListSlice = createSlice({
  name: "ToDos",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.ToDoList.push(action.payload);
      localStorage.setItem("Tasks", JSON.stringify(state.ToDoList));
    },
    checkTask: (state, action) => {
      state.ToDoList.map((todo) => {
        if (action.payload == todo.id) {
          todo.status ? (todo.status = false) : (todo.status = true);
        }
      });
    },
  },
});

export const { addTask, checkTask } = ToDoListSlice.actions;
export default ToDoListSlice.reducer;
