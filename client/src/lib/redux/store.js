import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice' 
import  postSlice  from './slice/postSlice'

const reducer = combineReducers({
    user: userSlice,
    post: postSlice,
})

export const store = configureStore({
    reducer,

})