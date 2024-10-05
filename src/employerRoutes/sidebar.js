/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import NewspaperIcon from "@heroicons/react/24/outline/NewspaperIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import ChartPieIcon from "@heroicons/react/24/outline/ChartPieIcon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import BriefcaseIcon from "@heroicons/react/24/outline/BriefcaseIcon";
import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import { TiUserDelete } from "react-icons/ti";
import { CiSettings } from "react-icons/ci";
const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/employer/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },

  //////////////////////////////////////NEW ROUTES////////////////////////////////////////

  {
    path: "/employer/job-ads", // url
    icon: <BriefcaseIcon className={iconClasses} />, // icon component
    name: "Job", // name that appear in Sidebar
  },
  // {
  //   path: '/employer/JobPost', // url
  //   icon: <BriefcaseIcon className={iconClasses}/>, // icon component
  //   name: 'Job Post', // name that appear in Sidebar
  // },
  // {
  //   path: '/employer/setting-profile', // url
  //   icon: <Cog6ToothIcon className={iconClasses}/>, // icon component
  //   name: 'Setting', // name that appear in Sidebar
  // },

  //////////////////////////////////////NEW ROUTES END////////////////////////////////////////

  // {
  //   path: '/employer/JobAdd+', // url
  //   icon: <BriefcaseIcon className={iconClasses}/>, // icon component
  //   name: 'Muzmil', // name that appear in Sidebar
  // },
  // {
  //   path: '/employer/CompanyProfile', // url
  //   icon: <BriefcaseIcon className={iconClasses}/>, // icon component
  //   name: 'Company Profile', // name that appear in Sidebar
  // },
  // {
  //   path: '/employer/JobPost', // url
  //   icon: <Cog6ToothIcon className={iconClasses}/>, // icon component
  //   name: 'JobPost', // name that appear in Sidebar
  // },

  // {
  //   path: '/employer/Job-Detail', // url
  //   icon: <BriefcaseIcon className={iconClasses}/>, // icon component
  //   name: 'Job-Detail', // name that appear in Sidebar
  // },

  // {
  //   path: '/employer/LogOut', // url
  //   icon: <BriefcaseIcon className={iconClasses}/>, // icon component
  //   name: 'Log Out', // name that appear in Sidebar
  // },

  // {
  //   path: '/profile', // url
  //   icon: <UserIcon className={iconClasses}/>, // icon component
  //   name: 'Profile', // name that appear in Sidebar
  // },

  // {
  //   path: '/job-search', // url
  //   icon: <MagnifyingGlassIcon className={iconClasses}/>, // icon component
  //   name: 'Job Search', // name that appear in Sidebar
  // },
  // {
  //   path: '/job-listing', // url
  //   icon: <BriefcaseIcon className={iconClasses}/>, // icon component
  //   name: 'Job board', // name that appear in Sidebar
  // },
  // {
  //   path: '/profilepreview',
  //   icon: <Squares2X2Icon className={iconClasses}/>,
  //   name: 'Profile Preview',
  // },
  // {
  //   path: '/job-search', // url
  //   icon: <MagnifyingGlassIcon className={iconClasses}/>, // icon component
  //   name: 'Job Search', // name that appear in Sidebar
  // },

  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Jobs', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/job-search', //url
  //       icon: <MagnifyingGlassIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Job Search', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/job-listing', //url
  //       icon: <BriefcaseIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Job board', // name that appear in Sidebar
  //     }
  //   ]
  // },

  // {
  //   path: '/myresume', // url
  //   icon: <ChartPieIcon className={iconClasses}/>, // icon component
  //   name: 'Resume Analytics', // name that appear in Sidebar
  // },

  // {
  //   path: '/analytics', // url
  //   icon: <ChartBarIcon className={iconClasses}/>, // icon component
  //   name: 'Insights', // name that appear in Sidebar
  // },

  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Analytics', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/myresume', //url
  //       icon: <MagnifyingGlassIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Resume', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/analytics', //url
  //       icon: <BriefcaseIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Insights', // name that appear in Sidebar
  //     }
  //   ]
  // },
  {
    path: "/employer/notifications", // url
    icon: <BellIcon className={iconClasses} />, // icon component
    name: "Notification", // name that appear in Sidebar
  },
  {
    path: "/employer/setting-profile", // url
    icon: <CiSettings className={iconClasses} />, // icon component
    name: "Setting", // name that appear in Sidebar
  },
  // {
  //   path: '/mynetwork',
  //   icon: <UserGroupIcon className={iconClasses}/>,
  //   name: 'My Networks',
  // },
  // {
  //   path: '/myresume',
  //   icon: <Squares2X2Icon className={iconClasses}/>,
  //   name: 'My Resume',
  // },
  // {
  //   path: '/analytics',
  //   icon: <Squares2X2Icon className={iconClasses}/>,
  //   name: 'Analytics',
  // },
  // {
  //   path: '/notifications',
  //   icon: <BellIcon className={iconClasses}/>,
  //   name: 'Notifications',
  // },
  // {
  //   path: '/news',
  //   icon: <NewspaperIcon className={iconClasses}/>,
  //   name: 'News',
  // },
  // {
  //   path: '/events', // url
  //   icon: <CalendarDaysIcon className={iconClasses}/>, // icon component
  //   name: 'Events', // name that appear in Sidebar
  // },

  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Pages', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/login',
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
  //       name: 'Login',
  //     },
  //     {
  //       path: '/register', //url
  //       icon: <UserIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Register', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/forgot-password',
  //       icon: <KeyIcon className={submenuIconClasses}/>,
  //       name: 'Forgot Password',
  //     },
  //     {
  //       path: '/blank',
  //       icon: <DocumentIcon className={submenuIconClasses}/>,
  //       name: 'Blank Page',
  //     },
  //     {
  //       path: '/404',
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
  //       path: '/settings-profile', //url
  //       icon: <UserIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Profile', // name that appear in Sidebar
  //     }
  //   ]
  // },
];

export default routes;
