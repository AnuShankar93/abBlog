import { combineReducers } from '@reduxjs/toolkit';
import categoriesSlice from './slices/categoriesSlice';
import tagSlice  from './slices/tagSlice';
import blogListSlice from 'pages/landingPage/slice/blogListSlice';
import mainSlice from './slices/mainSlice';

const combinedReducer = combineReducers({
    Tags: tagSlice,
    Categories: categoriesSlice,
    BlogList: blogListSlice,
    Main: mainSlice
})

const rootReducer = (state :any, action:any) => {
    return combinedReducer(state,action)
}

export default rootReducer;