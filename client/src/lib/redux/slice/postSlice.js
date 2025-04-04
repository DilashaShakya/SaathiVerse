import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  previews: [],

}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPreviews:(state, action)=>{
      return {
        ...state,
        previews: [...state.previews, action.payload]
      }
    },

  
  },
})

// Action creators are generated for each case reducer function
export const { addPreviews } = postSlice.actions

export default postSlice.reducer