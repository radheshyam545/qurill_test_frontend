import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import leadsSlice from '../features/leads/leadSlice'
import profileSlice from '../features/profile/profileSlice'
import jobSearchSlice from '../features/jobSearch/jobSearchSlice'

const combinedReducer = {
  header : headerSlice,
  rightDrawer : rightDrawerSlice,
  modal : modalSlice,
  lead : leadsSlice,
  profile : profileSlice,
  jobSearch : jobSearchSlice
}

export default configureStore({
    reducer: combinedReducer
})