import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCall, postCall } from '../../app/axiosConfig';

export const getJobListData = createAsyncThunk('/get/job', async (parms) => {
	const response = await getCall('/jobs', parms)
	return response;
})

export const getSearchData = createAsyncThunk('/get/search', async (parms) => {
	const response = await getCall('/jobs/search', parms)
	return response;
})

export const getJobBoardData = createAsyncThunk('/get/board', async (parms) => {
	const response = await getCall('/jobs/board', parms)
	console.log("jobdetail",response.data)
	return response;
})

export const postApplyJob = createAsyncThunk('/post/apply', async (body) => {
	const response = await postCall('/jobs/apply', body)
	return response;
})

// export const postProfileData = createAsyncThunk('/post/profile', async (payload) => {
// 	const response = await postCall('/profile', payload)
// 	return response;
// })

export const jobSearchSlice = createSlice({
	name: 'jobListData',
	initialState: {
		isLoading: false,
		jobListPageData: {},
		jobSearchData: {},
		jobBoardData: []
	},
	// reducers: {

	//     updateNewProfileData: (state, action) => {
	//       console.log('action.payload', action.payload)
	//         // state.profilePagesData = action.payload
	//     },
	// },

	extraReducers: {
		[getJobListData.pending]: state => {
			state.isLoading = true
		},
		[getJobListData.fulfilled]: (state, action) => {
			state.jobListPageData = action.payload.data
			state.isLoading = false
		},
		[getJobListData.rejected]: state => {
			state.isLoading = false
		},

		[getSearchData.pending]: state => {
			state.isLoading = true
		},
		[getSearchData.fulfilled]: (state, action) => {
			state.jobSearchData = action.payload.data
			state.isLoading = false
		},
		[getSearchData.rejected]: state => {
			state.isLoading = false
		},

		[getJobBoardData.pending]: state => {
			state.isLoading = true
		},
		[getJobBoardData.fulfilled]: (state, action) => {
			state.jobBoardData = action.payload.data
			state.isLoading = false
		},
		[getJobBoardData.rejected]: state => {
			state.isLoading = false
		},
	}
})

// export const { updateNewProfileData } = jobSearch.actions

export default jobSearchSlice.reducer