import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    updateQuestion: (state, action) =>{
        state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {  updateQuestion } = questionSlice.actions

export default questionSlice.reducer