import { createSlice } from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState:{
    count:0,
    todos: ["qq", "Qweqwe", "qweqweq", "rvrvrv"]
  },
  reducers: {
    increment: (state) => {
      state.count = state.count + 1
    },
    decrement: (state) => {
      state.count = state.count - 1
    },
    addTodos: (state, action) => {
      state.todos.push(action.payload)
    },
    removeTodos: (state, action) => {
      state.todos = state.todos.filter((todo) => todo !== action.payload)
    }
  },
});
export default toolkitSlice.reducer
export const { increment, decrement, addTodos, removeTodos } = toolkitSlice.actions