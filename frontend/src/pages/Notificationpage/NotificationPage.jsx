import "./notificationPage.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { getNotificationFromId } from "../../redux/notification/NotifcationSlice";
import { useDispatch } from "react-redux";

const NotificationPage = () => {
  // const user = useSelector((state) => state.userSlice?.user);
  // const [notificationID, setNotificationID] = useState("");

  const notificationID = useSelector(
    (state) => state.notificationSlice.notificationID
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getNotifcation = async () => {
      await dispatch(getNotificationFromId(notificationID));
    };

    if (notificationID !== null) {
      getNotifcation();
    }
  }, [notificationID]);

  // const socket = io("http://localhost:8000"); // Replace with the actual server URL

  // useEffect(() => {
  //   // Listen for appointment status changes

  //   socket.on("isWorking", (data) => {
  //     console.log(data);
  //   });

  //   socket.on("notifcation-success", (data) => {
  //     if (data.userId === user._id) {
  //       setNotificationID(data.notificationID);
  //     } else {
  //       return;
  //     }
  //   });
  //   return () => {
  //     // Clean up the socket connection when the component unmounts
  //     socket.disconnect();
  //   };
  // }, [user]);

  // useEffect(() => {
  //   const getNotifcationFucntion = async () => {
  //     await dispatch(getNotifcationFucntion(notificationID));
  //   };

  //   if (notificationID !== "") {
  //     getNotifcationFucntion();
  //   }
  // }, [notificationID]);

  return <div>{notificationID}</div>;
};

export default NotificationPage;
