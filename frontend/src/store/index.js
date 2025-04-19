import { configureStore } from '@reduxjs/toolkit'
import corsiReducer from '../features/corsi/corsiSlice'

const store = configureStore({
  reducer: {
    corsi: corsiReducer
  }
})

export default store