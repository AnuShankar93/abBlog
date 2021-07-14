import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TagState } from 'interface/filter.interface';
import endPoints from 'api/endPoints';
import { getBlogList } from '../services/getblogList.service';
import { get } from 'services/get.service';

const intialState: any = {
    list: [],
    loading: false,
    totalNumOfBlogs: null,
    searchKeyWord: '',
    selectedTags: null,
    selectedCategories: [],
    currentSelectedData: {}
}

export const getBlogLists: any = createAsyncThunk(
    'blogsList/getBloglist', async (payload: any) => {
        const { perPageCards, pageNumber } = payload;
        const dataUrl = endPoints.getBlogList
            .replace('${perPageCards}', perPageCards)
            .replace('${pageNumber}', pageNumber)
        const response: any = await getBlogList(dataUrl);
        if (response.statusText === 'OK') {
            return {data: response.data, total: response.totalNumberOfPost};
        }
    }
)

export const getBlog: any = createAsyncThunk(
    'blogList/getBlog', async(payload:any) => {
        const response: any = await get(`${endPoints.getBlogWithId}/${payload}`);
        if (response.statusText === 'OK') {
            return response.data;
        }
    }
)

export const getAuthor: any = createAsyncThunk(
    'blogList/getAuthor', async(payload) => {
        const response: any = await get (`${endPoints.getBlogWithId}/${payload}`);
        if (response.statusText === 'OK') {
            return response.data;
        }
    }
)

export const blogListSlice = createSlice({
    name: 'blogsList',
    initialState: intialState,
    reducers: {
        inputSearchKeyword: (state, action) => {
            state.searchKeyWord = action.payload;
        },
        selectedTags: (state, action) => {
            if (action.payload.type === 'tag') {
                state.selectedTags = action.payload.id === state.selectedTags ? null : action.payload.id;
            } else {
                const findIndex = state.selectedCategories.indexOf(action.payload.id);
                findIndex !== -1 ? state.selectedCategories.splice(findIndex, 1) : state.selectedCategories.push(action.payload.id);
            }

        }
    },
    extraReducers: {
        [getBlogLists.pending]: (state, { payload }) => {
            state.loading = true
        },
        [getBlogLists.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.list = [...state.list, ...payload.data];
            state.totalNumOfBlogs = Number(payload.total);
        },
        [getBlog.pending]: (state, {payload}) => {
            state.loading = true
        },
        [getBlog.fulfilled]: (state, {payload}) => {
            state.currentSelectedData = payload;
        }
    }
})

export const { inputSearchKeyword, selectedTags } = blogListSlice.actions;
export default blogListSlice.reducer;