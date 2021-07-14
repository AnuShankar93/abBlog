import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    isMobile: false,
}

export const mainSlice = createSlice({
    name: 'main',
    initialState: intialState,
    reducers: {
        setIsMobile: (state, action) => {
            state.isMobile =  action.payload;
        },
    }
});

export const {setIsMobile} = mainSlice.actions;
export default mainSlice.reducer;