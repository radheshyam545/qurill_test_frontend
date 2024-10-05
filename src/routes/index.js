// All components mapping with path for internal routes

import { lazy } from 'react'
// import ProfilePreview from '../pages/protected/ProfilePreview'

const Dashboard = lazy(() => import('../pages/protected/Dashboardtwo'))
const MyNetworks = lazy(() => import('../pages/protected/MyNetwork'))
const MyResume = lazy(() => import('../pages/protected/MyResume'))
const Analytics = lazy(() => import('../pages/protected/Analytics'))
const News = lazy(() => import('../pages/protected/News'))
const ProfilePreview = lazy(() => import('../pages/protected/ProfilePreview'))
const JobListing = lazy(() => import('../features/job-listing'))
const JobSearchListing = lazy(() => import('../features/jobSearch'))
const Profile = lazy(() => import('../pages/protected/Profile'))
const Notification = lazy(() => import('../features/notifications'))
const Events = lazy(() => import('../pages/protected/Events'))
const Page404 = lazy(() => import('../pages/protected/404'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const settingProfile = lazy(() => import('../pages/protected/Settingpage'))



const routes = [
  
  {
    path: '/myresume', // the url
    component: MyResume, // view rendered
  },{
    path: '/MyNetwork', // the url
    component: MyNetworks, // view rendered
  },
  {
    path: '/analytics', // the url
    component: Analytics, // view rendered
  },
  {
    path: '/news', // the url
    component: News, // view rendered
  },
  {
    path: '/profilepreview', // the url
    component: ProfilePreview, // view rendered
  },
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/job-listing',
    component: JobListing,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/job-search',
    component: JobSearchListing,
  },
  {
    path: '/notifications',
    component: Notification,
  },
  {
    path: '/events',
    component: Events,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/setting-profile',
    component: settingProfile,
  },
  
]

export default routes
