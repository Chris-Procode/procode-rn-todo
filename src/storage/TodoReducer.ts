import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Todo } from '../models/Todo';

/**
 * The shape of the slice of Redux state managed by `todoSlice`.
 */
interface TodoState {
  /** The flat list of all todos (active and archived). */
  todos: Todo[];
}

/** The initial state used when the store is first created or reset. */
const initialState: TodoState = {
  todos: [],
};

/**
 * Redux Toolkit slice that manages the `todos` portion of the state tree.
 * Exposes three reducers: `addTodo`, `updateTodo`, and `deleteTodo`.
 */
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    /**
     * Appends a new todo to the end of the todos array.
     *
     * @param action - Payload containing the full {@link Todo} to add.
     */
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
    /**
     * Merges updated fields (title, description, completedAt, archivedAt)
     * into an existing todo matched by `id`. Does nothing if the id is not
     * found.
     *
     * @param action - Payload containing the updated {@link Todo}.
     */
    updateTodo(state, action: PayloadAction<Todo>) {
      const { description, title, completedAt, archivedAt } = action.payload;
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index >= 0) {
        state.todos[index] = {
          ...state.todos[index],
          title,
          description,
          completedAt,
          archivedAt,
        };
      }
    },
    /**
     * Removes the todo whose `id` matches the payload from the todos array.
     *
     * @param action - Payload containing the {@link Todo} to remove.
     */
    deleteTodo(state, action: PayloadAction<Todo>) {
      state.todos = state.todos.filter((t) => t.id !== action.payload.id);
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
