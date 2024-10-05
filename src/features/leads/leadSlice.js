import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const getLeadsContent = createAsyncThunk('/leads/content', async () => {
	const response = await axios.get('https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code', {})
	return response.data;
})

export const getCountryList = createAsyncThunk('/leads/content/country', async () => {
    const response = await fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code")
    .then((response) => response.json())
    .then((data) => {
        return data.countries;
    })
	return response;

})

export const leadsSlice = createSlice({
    name: 'leads',
    initialState: {
        isLoading: false,
        countryList:[],
        leads : []
    },
    reducers: {


        addNewLead: (state, action) => {
            let {newLeadObj} = action.payload
            state.leads = [...state.leads, newLeadObj]
        },

        deleteLead: (state, action) => {
            let {index} = action.payload
            state.leads.splice(index, 1)
        }
    },

    extraReducers: {
		[getLeadsContent.pending]: state => {
			state.isLoading = true
		},
		[getLeadsContent.fulfilled]: (state, action) => {
			state.leads = action.payload.data
			state.isLoading = false
		},
		[getLeadsContent.rejected]: state => {
			state.isLoading = false
		},

        // country list
        [getCountryList.pending]: state => {
            state.isLoading = true
        },
        [getCountryList.fulfilled]: (state, action) => {
            state.countryList = action.payload?.map(item => 
            {
                let obj = {
                    value:item.value,
                    label:item.label.split(' ').slice(1).join(' ')
                }
                return obj
            }
                )
            state.isLoading = false
        },
        [getCountryList.rejected]: state => {
            state.isLoading = false
        }

    }
})

export const { addNewLead, deleteLead } = leadsSlice.actions

export default leadsSlice.reducer