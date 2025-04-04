import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetails: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserDetails:(state, action)=>{
      console.log("🧠 reducer got:", action.payload)
        state.userDetails = action.payload

    },
    logoutUser : (state)=>{
        state.userDetails = {}
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUserDetails, logoutUser } = userSlice.actions

export default userSlice.reducer