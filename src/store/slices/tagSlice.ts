import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from 'services/get.service';
import { TagState } from 'interface/filter.interface';
import endPoints from 'api/endPoints';


const intialState:TagState = {
    tags:  null,
    loading: false
}


export const getTags: any = createAsyncThunk(
    'tags/getTags', async () => {
        const response: any = await get(endPoints.getTags);
        if (response.statusText === 'OK') {
            return response.data;
        }
    }
)

export const tagSlice = createSlice({
    name: 'tags',
    initialState: intialState,
    reducers: {},
    extraReducers: {
        [getTags.pending] : (state, {payload}) => {
            state.loading = true
        },
        [getTags.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.tags = payload
        },
    }
})
export default tagSlice.reducer;