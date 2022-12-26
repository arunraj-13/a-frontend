import { configureStore } from '@reduxjs/toolkit'
import questionReducer from "./questionSlice"
const store = configureStore({
  reducer: {
    questionUpdate: questionReducer
  },
})

export default store