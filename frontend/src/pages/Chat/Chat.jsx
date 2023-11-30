// import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import "./chat.css";
import SideDrawer from "../../components/miscellaneous/SideDrawer";

const Chat = () => {
  // const user = useSelector((state) => state.userlice?.user);
  // const isLoading = useSelector((state) => state.userSlice.isLoading);

  return (
    <div className="chat-page">
      {<SideDrawer />}

      <Box>
        {/* {user && <MyChats />} */}
        {/* {user && <ChatBox />} */}
      </Box>
    </div>
  );
};

export default Chat;
