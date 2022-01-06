import {createSlice } from '@reduxjs/toolkit'; 

const initialState = {entries: []}

const errorsSlice = createSlice({
  name:'errors',
  initialState,
  reducers:{
    set(state, action){
      state.entries.push(action.payload)
    }
  }
})

const {actions, reducer:errorReducer} = errorsSlice;
const {set} = actions;

export const setErrors = (message) => (dispatch) => {
  dispatch(set(message))
}

export default errorReducer;