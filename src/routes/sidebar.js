/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import NewspaperIcon from '@heroicons/react/24/outline/NewspaperIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import ChartPieIcon from '@heroicons/react/24/outline/ChartPieIcon'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import BriefcaseIcon from '@heroicons/react/24/outline/BriefcaseIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'
import { TiUserDelete } from 'react-icons/ti'
import { CiSettings } from "react-icons/ci";
const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/seeker/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  
  
  // {
  //   path: '/seeker/job-listing', // url
  //   icon: <BriefcaseIcon className={iconClasses}/>, // icon component
  //   name: 'Job board', // name that appear in Sidebar
  // },
  
  {
    path: '/seeker/profile', // url
    icon: <UserIcon className={iconClasses}/>, // icon component
    name: 'Application', // name that appear in Sidebar
  },

  {
    path: '/seeker/job-search', // url
    icon: <MagnifyingGlassIcon className={iconClasses}/>, // icon component
    name: 'Job Search', // name that appear in Sidebar
  },
  {
    path: '/seeker/job-listing', // url
    icon: <BriefcaseIcon className={iconClasses}/>, // icon component
    name: 'Job board', // name that appear in Sidebar
  },
  // {
  //   path: '/seeker/profilepreview',
  //   icon: <Squares2X2Icon className={iconClasses}/>, 
  //   name: 'Profile Preview',
  // },
  // {
  //   path: '/seeker/job-search', // url
  //   icon: <MagnifyingGlassIcon className={iconClasses}/>, // icon component
  //   name: 'Job Search', // name that appear in Sidebar
  // },

  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Jobs', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/seeker/job-search', //url
  //       icon: <MagnifyingGlassIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Job Search', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/seeker/job-listing', //url
  //       icon: <BriefcaseIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Job board', // name that appear in Sidebar
  //     }
  //   ]
  // },

{
    path: '/seeker/myresume', // url
    icon: <ChartPieIcon className={iconClasses}/>, // icon component
    name: 'Analytics', // name that appear in Sidebar
  },

//   {
//     path: '/seeker/analytics', // url
//     icon: <ChartBarIcon className={iconClasses}/>, // icon component
//     name: '  Insights', // name that appear in Sidebar
//   },

  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Analytics', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/seeker/myresume', //url
  //       icon: <MagnifyingGlassIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Resume', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/seeker/analytics', //url
  //       icon: <BriefcaseIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Insights', // name that appear in Sidebar
  //     }
  //   ]
  // },
  {
    path: '/seeker/notifications', // url
    icon: <BellIcon className={iconClasses}/>, // icon component
    name: 'Notification', // name that appear in Sidebar
  },
  // {
  //   path: '/', // url
  //   icon: <TiUserDelete className={iconClasses}/>, // icon component
  //   name: 'Delete Account', // name that appear in Sidebar
  // },
  {
    path: '/seeker/setting-profile', // url
    icon: <CiSettings  className={iconClasses}/>, // icon component
    name: 'Setting', // name that appear in Sidebar
  },
  // {
  //   path: '/seeker/mynetwork',
  //   icon: <UserGroupIcon className={iconClasses}/>, 
  //   name: 'My Network',
  // },
  // {
  //   path: '/seeker/myresume',
  //   icon: <Squares2X2Icon className={iconClasses}/>, 
  //   name: 'My Resume',
  // },
  // {
  //   path: '/seeker/analytics',
  //   icon: <Squares2X2Icon className={iconClasses}/>, 
  //   name: 'Analytics',
  // },
  // {
  //   path: '/seeker/notifications',
  //   icon: <BellIcon className={iconClasses}/>, 
  //   name: 'Notifications',
  // },
  // // {
  // //   path: '/seeker/news',
  // //   icon: <NewspaperIcon className={iconClasses}/>, 
  // //   name: 'News',
  // // },
  // {
  //   path: '/seeker/events', // url
  //   icon: <CalendarDaysIcon className={iconClasses}/>, // icon component
  //   name: 'Events', // name that appear in Sidebar
  // },

  // {
  //   path: '/seeker/setting-profile', // url
  //   icon: <Cog6ToothIcon className={iconClasses}/>, // icon component
  //   name: 'Settings', // name that appear in Sidebar
  // },

  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Pages', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/seeker/login',
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
  //       name: 'Login',
  //     },
  //     {
  //       path: '/seeker/register', //url
  //       icon: <UserIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Register', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/seeker/forgot-password',
  //       icon: <KeyIcon className={submenuIconClasses}/>,
  //       name: 'Forgot Password',
  //     },
  //     {
  //       path: '/seeker/blank',
  //       icon: <DocumentIcon className={submenuIconClasses}/>,
  //       name: 'Blank Page',
  //     },
  //     {
  //       path: '/seeker/404',
  //       icon: <ExclamationTriangleIcon className={submenuIconClasses}/>,
  //       name: '404',
  //     },
  //   ]
  // },
  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Settings', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/seeker/settings-profile', //url
  //       icon: <UserIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Profile', // name that appear in Sidebar
  //     }
  //   ]
  // }
]

export default routes

