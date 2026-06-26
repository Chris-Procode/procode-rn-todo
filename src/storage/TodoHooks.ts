import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from './Store';
import { addTodo, deleteTodo, updateTodo } from './TodoReducer';
import { Todo } from '../models/Todo';

/**
 * The set of CRUD and lifecycle action dispatchers available to consumers
 * of the todo hooks.
 */
type TodoMethods = {
  /** Dispatches an action to add a new todo to the store. */
  createTodo: (todo: Todo) => void;
  /** Dispatches an action to update an existing todo in the store. */
  updateTodo: (todo: Todo) => void;
  /** Dispatches an action to permanently remove a todo from the store. */
  deleteTodo: (todo: Todo) => void;
  /** Marks a todo as completed by setting its `completedAt` timestamp. */
  completeTodo: (todo: Todo) => void;
  /** Clears the `completedAt` timestamp, marking the todo as incomplete. */
  incompleteTodo: (todo: Todo) => void;
  /** Archives a todo by setting its `archivedAt` timestamp. */
  archiveTodo: (todo: Todo) => void;
  /** Restores an archived todo by clearing its `archivedAt` timestamp. */
  unarchiveTodo: (todo: Todo) => void;
};

/**
 * Returns a stable object of dispatchers for all todo lifecycle actions
 * (create, update, delete, complete, archive, etc.).
 *
 * @returns An object implementing {@link TodoMethods}.
 */
export const useTodoMethods = (): TodoMethods => {
  const dispatch = useDispatch();
  return {
    createTodo: (todo: Todo) => dispatch(addTodo(todo)),
    updateTodo: (todo: Todo) => dispatch(updateTodo(todo)),
    deleteTodo: (todo: Todo) => dispatch(deleteTodo(todo)),
    completeTodo: (todo: Todo) =>
      dispatch(
        updateTodo({
          ...todo,
          completedAt: Date.now(),
        })
      ),
    incompleteTodo: (todo: Todo) =>
      dispatch(updateTodo({ ...todo, completedAt: undefined })),
    archiveTodo: (todo: Todo) =>
      dispatch(updateTodo({ ...todo, archivedAt: Date.now() })),
    unarchiveTodo: (todo: Todo) =>
      dispatch(updateTodo({ ...todo, archivedAt: undefined })),
  };
};

/**
 * Selects all non-archived todos from the store and exposes todo action
 * dispatchers.
 *
 * @returns The list of active (non-archived) todos along with {@link TodoMethods}.
 */
export const useTodos = (): { todos: Todo[] } & TodoMethods => {
  const todos: Todo[] = useSelector((state: RootState) => state.todos.todos);
  const methods = useTodoMethods();

  return {
    todos: todos?.filter((t) => t.archivedAt === undefined),
    ...methods,
  };
};

/**
 * Selects only archived todos from the store and exposes todo action
 * dispatchers.
 *
 * @returns The list of archived todos along with {@link TodoMethods}.
 */
export const useArchivedTodos = (): { todos: Todo[] } & TodoMethods => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const methods = useTodoMethods();

  return {
    todos: todos.filter((t) => t.archivedAt !== undefined),
    ...methods,
  };
};

/**
 * Looks up a single todo by its unique identifier and exposes todo action
 * dispatchers.
 *
 * @param id - The unique identifier of the todo to find. When `undefined`
 *             the returned `todo` will also be `undefined`.
 * @returns The matched todo (or `undefined`) along with {@link TodoMethods}.
 */
export const useTodo = (id?: string): { todo?: Todo } & TodoMethods => {
  const todo = useSelector((state: RootState) =>
    state.todos.todos.find((t) => t.id === id)
  );
  const methods = useTodoMethods();

  return {
    todo,
    ...methods,
  };
};
