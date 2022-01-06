import {createSlice } from '@reduxjs/toolkit'; 
// import { entries } from 'lodash';
import todoServices from "../services/todos.service"
import { setErrors } from './errors';

const initialState = {tasks: [], isLoading: false};
const taskSlice = createSlice({
  name:"tasks",
  initialState,
  reducers:{
    taskRequested(state, action){
      state.isLoading = true;
    },
    load(state, action){
      state.tasks = action.payload
      return state
    },
    taskRecieved(state, action){
      state.isLoading = false;
    },
    updated(state, action){
      const elementIndex = state.tasks.findIndex((el) => el.id === action.payload.id);
      state.tasks[elementIndex] = {
                ...state.tasks[elementIndex],
                ...action.payload,
            };
    },
    add(state, action){
      state.tasks.push(action.payload)
    },
    remove(state, action){
      state.tasks = state.tasks.filter(task => task.id !== action.payload.id)
      return state
    },
  },
});

const {actions, reducer} = taskSlice;
const {updated, remove,add, load, taskRequested, taskRecieved } = actions;

export function loadTasks(){
  return async (dispatch) => {
    dispatch(taskRequested())
    try {
      const data = await todoServices.fetch();
      dispatch(taskRecieved())
      dispatch(load(data))
    } catch (error) {
      dispatch(setErrors(error.message))
    }
    
  }
}
export function taskCompleted(id){
  return updated({ id, completed: true })
}
export function titleChanged(id) {
    return updated({ id, title: `New title for ${id}` })
}

export function removeTask(id){
  return remove({id})
}

export function createTask(task){
  return  async(dispatch) => {
    try {
      const data = await todoServices.add(task)
      dispatch(add(data))
    } catch (error) {
      dispatch(setErrors(error.message))
    }
    
  }
}

export const getTasks = () => (state) => state.tasks.tasks
export const isLoading = () => (state) => state.tasks.isLoading

export default  reducer
