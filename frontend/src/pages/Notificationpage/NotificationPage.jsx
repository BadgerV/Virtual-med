import "./notificationPage.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const NotificationPage = () => {
  const user = useSelector((state) => state.userSlice?.user);
  const [notificationID, setNotificationID] = useState("");

  const socket = io("http://localhost:8000"); // Replace with the actual server URL
  useEffect(() => {
    // Listen for appointment status changes
    socket.on("isWorking", (data) => {
      console.log(data.useid);
    });

    socket.on("notifcation-success", (data) => {
      if (data.userId === user._id) {
        setNotificationID(data.notifcationId);
      } else {
        return;
      }
    });
    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    console.log(notificationID);
  }, [notificationID]);

  return <div>{notificationID}</div>;
};

export default NotificationPage;
