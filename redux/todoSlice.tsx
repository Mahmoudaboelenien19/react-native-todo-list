import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Filter, TODO} from '../types/todos';
interface initialStateInterface {
  todos: TODO[];
  activedFilter: Filter;
  filteredTodos: TODO[];
}

const initialState: initialStateInterface = {
  todos: [],
  activedFilter: 'all',
  filteredTodos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TODO>) {
      state.todos = [...state.todos, action.payload];
      updateFilteredTodos(state);
      // if (state.activedFilter === 'all') {
      //   state.filteredTodos = state.todos;
      // } else if (state.activedFilter === 'pending') {
      //   state.filteredTodos = state.todos.filter((d: TODO) => !d.isCompleted);
      // }
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((d: TODO) => d?.id != action.payload);
      updateFilteredTodos(state);
    },
    toggleCheck(state, action: PayloadAction<number>) {
      state.todos = state.todos.map((d: TODO) =>
        d?.id === action.payload ? {...d, isCompleted: !d.isCompleted} : d,
      );
      updateFilteredTodos(state);
    },
    changeFilter(state, action: PayloadAction<Filter>) {
      state.activedFilter = action.payload;
      updateFilteredTodos(state);
    },
  },
});

function updateFilteredTodos(state: initialStateInterface) {
  if (state.activedFilter === 'pending') {
    state.filteredTodos = state.todos.filter((d: TODO) => !d.isCompleted);
  } else if (state.activedFilter === 'completed') {
    state.filteredTodos = state.todos.filter((d: TODO) => d.isCompleted);
  } else {
    state.filteredTodos = state.todos;
  }
}

export const {toggleCheck, deleteTodo, addTodo, changeFilter} =
  todoSlice.actions;
export default todoSlice.reducer;
