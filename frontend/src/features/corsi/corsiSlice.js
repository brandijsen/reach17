//corsiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// 👉 Thunk per recuperare i corsi dal backend
export const fetchCourses = createAsyncThunk(
  'corsi/fetchCourses',
  async () => {
    const response = await axios.get('http://localhost:3001/api/corsi')
    return response.data
  }
)

const corsiSlice = createSlice({
  name: 'corsi',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    // puoi aggiungere funzioni sincrone qui
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default corsiSlice.reducer
