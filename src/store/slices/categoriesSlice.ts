import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from 'services/get.service';
import { TagState } from 'interface/filter.interface';
import endPoints from 'api/endPoints';


const intialState: TagState = {
    categories: null,
    loading: false
}


export const getCategories: any = createAsyncThunk(
    'categories/getCategories', async () => {
        const response: any = await get(endPoints.getCategories);
        if (response.statusText === 'OK') {
            return response.data;
        }
    }
)

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: intialState,
    reducers: {},
    extraReducers: {
        [getCategories.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getCategories.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.categories = payload
        },
    }
})

export default categoriesSlice.reducer;