import PageContent from "./PageContent"
import LeftSidebar from "./LeftSidebar"
import { useSelector, useDispatch } from 'react-redux'
import RightSidebar from './RightSidebar'
import { useEffect } from "react"
import { removeNotificationMessage } from "../features/common/headerSlice"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ModalLayout from "./ModalLayout"
import { getCountryList } from "../features/leads/leadSlice"
// messaging
import { messaging } from "../app/firebaseConfig"
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { postCall } from "../app/axiosConfig"

function Layout() {
  const dispatch = useDispatch()
  const { newNotificationMessage, newNotificationStatus } = useSelector(state => state.header)

  useEffect(() => { requestNotificationPermission() }, [])
  useEffect(() => {
    dispatch(getCountryList())
    if (newNotificationMessage !== "") {
      if (newNotificationStatus === 1) NotificationManager.success(newNotificationMessage, 'Success')
      if (newNotificationStatus === 0) NotificationManager.error(newNotificationMessage, 'Error')
      dispatch(removeNotificationMessage())
    }
  }, [newNotificationMessage])

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Get the token
        const currentToken = await getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY });

        if (currentToken) {
          await postCall('/profile/push-notification-token', { token: currentToken })
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      } else {
        console.log('Unable to get permission to notify.');
      }
    } catch (e) {
      console.log('Error =>', e);
    }
  };

  return (
    <>
      { /* Left drawer - containing page content and side bar (always open) */}
      <div className="bg-[#232b2b] w-[100%]">

        <div className="drawer  lg:drawer-open -max-w-[1700px] m-auto">
          <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
          <PageContent />
          <LeftSidebar />
        </div>
      </div>

      { /* Right drawer - containing secondary content like notifications list etc.. */}
      <RightSidebar />


      {/** Notification layout container */}
      <NotificationContainer />

      {/* Modal layout container */}
      <ModalLayout />

    </>
  )
}

export default Layout