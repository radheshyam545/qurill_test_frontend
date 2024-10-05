import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCall, postCall } from '../../app/axiosConfig';

export const getProfileData = createAsyncThunk('/get/profile', async () => {
	const response = await getCall('/profile')
	return response;
})

export const analyticsData = createAsyncThunk('/get/analytics', async () => {
	const response = await getCall('/profile/analytics')
	return response;
})

export const postProfileData = createAsyncThunk('/post/profile', async (payload) => {
	const response = await postCall('/profile', payload)
	return response;
})

export const profileSlice = createSlice({
	name: 'profileData',
	initialState: {
		isLoading: false,
		isDeleteLoading: false,
		profilePagesData: {},
		profileAnalyticsData: {}

	},
	// reducers: {
	//     updateNewProfileData: (state, action) => {
	//       console.log('action.payload', action.payload)
	//         // state.profilePagesData = action.payload
	//     },
	// },

	extraReducers: {
		[getProfileData.pending]: state => {
			state.isLoading = true
		},
		[getProfileData.fulfilled]: (state, action) => {
			state.profilePagesData = action.payload?.data
			state.isLoading = false
		},
		[getProfileData.rejected]: state => {
			state.isLoading = false
		},

		[analyticsData.pending]: state => {
			state.isLoading = true
		},
		[analyticsData.fulfilled]: (state, action) => {
			state.profileAnalyticsData = action.payload?.data
			state.isLoading = false
		},
		[analyticsData.rejected]: state => {
			state.isLoading = false
		},

		[postProfileData.pending]: state => {
			state.isLoading = true
		},
		[postProfileData.fulfilled]: (state, action) => {
			state.profilePagesData = action.payload?.data
			state.isLoading = false
		},
		[postProfileData.rejected]: state => {
			state.isLoading = false
		},

	}
})

// export const { updateNewProfileData } = profileSlice.actions

export default profileSlice.reducer