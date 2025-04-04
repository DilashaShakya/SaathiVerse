import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice' 

const reducer = combineReducers({
    user: userSlice
})

export const store = configureStore({
    reducer,

})