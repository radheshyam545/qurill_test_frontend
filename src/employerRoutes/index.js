// All components mapping with path for internal routes

import { lazy } from 'react'
import JobPost from '../pages/employerProtected/JobPost'
// import ProfilePreview from '../pages/protected/ProfilePreview'
// const News = lazy(() => import('../pages/employerProtected/News'))
// const PostJobs = lazy(() => import('../pages/employerProtected/PostJobs'))
const Dashboard = lazy(() => import('../pages/employerProtected/Dashboardtwo'))
const MyNetworks = lazy(() => import('../pages/employerProtected/MyNetwork'))
const CompanyProfile = lazy(() => import('../pages/employerProtected/CompanyProfile'))
const MyResume = lazy(() => import('../pages/employerProtected/MyResume'))
const Analytics = lazy(() => import('../pages/employerProtected/Analytics'))
const JobDetail= lazy(() => import('../pages/employerProtected/Job-Details'))
// const ProfilePreview = lazy(() => import('../pages/employerProtected/ProfilePreview'))
const JobListing = lazy(() => import('../features/job-listing'))
const JobSearchListing = lazy(() => import('../features/jobSearch'))
const JobAds = lazy(() => import('../pages/employerProtected/Jobs-Ads'))
const Profile = lazy(() => import('../pages/employerProtected/Profile'))
const Notification = lazy(() => import('../pages/employerProtected/NotificationEmployer'))
const Events = lazy(() => import('../pages/employerProtected/Events'))
const Page404 = lazy(() => import('../pages/employerProtected/404'))
const UnderVarification = lazy(() => import('../pages/employerProtected/UnderVarification'))
const ProfileSettings = lazy(() => import('../pages/employerProtected/ProfileSettings'))
const settingProfile = lazy(() => import('../pages/employerProtected/Settingpage'))



const routes = [
  // {
  //   path: '/LogOut', // the url
  //   component: LogOut, // view rendered
  // },
  {
    path: '/myresume', // the url
    component: MyResume, // view rendered
  },
  {
    path: '/MyNetwork', // the url
    component: MyNetworks, // view rendered
  },
  {
    path: '/legitimacy-checkpoint', // the url
    component: CompanyProfile, // view rendered
  },
  {
    path: '/under-varification', // the url
    component: UnderVarification, // view rendered
  },
  {
    path: '/analytics', // the url
    component: Analytics, // view rendered
  },
  {
    path: '/Job-Detail/:_ID', // the url
    component: JobDetail, // view rendered
  },
  {
    path: '/JobPost?', // the url
    component: JobPost, // view rendered
  },
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/job-applicants',
    component: JobListing,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/job-ads',
    component: JobAds,
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