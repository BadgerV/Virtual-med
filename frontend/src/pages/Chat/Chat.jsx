// import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import "./chat.css";
import SideDrawer from "../../components/miscellaneous/SideDrawer";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchChats } from "../../redux/chat/chatSlice";

const Chat = () => {
  // const user = useSelector((state) => state.userlice?.user);
  // const isLoading = useSelector((state) => state.userSlice.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserChats = async () => {
      const response = await dispatch(fetchChats());

      console.log(response);
    };

    fetchUserChats();
  });

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

// import { useState } from "react";
// import {
//   Box,
//   Flex,
//   ChakraProvider,
//   extendTheme,
//   VStack,
//   HStack,
//   Avatar,
//   Text,
  
// } from "@chakra-ui/react";
// import { ChatIcon } from "@chakra-ui/icons";

// const theme = extendTheme({
//   styles: {
//     global: {
//       "html, body": {
//         height: "100%",
//       },
//     },
//   },
// });

// const ChatApp = () => {
//   const [selectedUser, setSelectedUser] = useState(null);

//   const users = [
//     { id: 1, name: "User 1" },
//     { id: 2, name: "User 2" },
//     { id: 3, name: "User 3" },
//     // Add more users as needed
//   ];

//   const handleUserSelect = (user) => {
//     setSelectedUser(user);
//   };

//   return (
//     <ChakraProvider theme={theme}>
//       <Flex h="100vh">
//         {/* Sidebar */}
//         <VStack bg="gray.100" w="20%" p={4} align="stretch">
//           <Text fontSize="xl" fontWeight="bold" mb={4}>
//             Users
//           </Text>
//           {users.map((user) => (
//             <HStack
//               key={user.id}
//               p={2}
//               _hover={{ bg: "gray.200", cursor: "pointer" }}
//               onClick={() => handleUserSelect(user)}
//             >
//               <Avatar size="sm" name={user.name} />
//               <Text>{user.name}</Text>
//             </HStack>
//           ))}
//         </VStack>

//         {/* Chat Area */}
//         <Flex flex="1" direction="column">
//           <Box bg="gray.200" p={4} boxShadow="lg">
//             <Text fontSize="2xl">{selectedUser ? selectedUser.name : "Chat App"}</Text>
//           </Box>

//           <Flex flex="1" p={4} overflowY="auto">
//             {/* Message Modal */}
//             {selectedUser ? (
//               <Box flex="1" bg="white" boxShadow="lg" p={4}>
//                 {/* Messages go here */}
//                 <Text mb={2}>Chat with {selectedUser.name}</Text>
//                 {/* Add your message components here */}
//               </Box>
//             ) : (
//               <div className="chat-info">
//                 Select a chat to start chatting
//               </div>
//             )}
//           </Flex>
//         </Flex>
//       </Flex>
//     </ChakraProvider>
//   );
// };


// const ChatPage = () => {
//   return(
//     <div className="chat-page">
//       <div className="chat-left">
//         <div className="chat-left_header">Chats</div>

//         <div className="chat-left_chats">

//         </div>
//       </div>
//       <div className="chat-right"></div>
//     </div>
//   )
// }



// export default ChatPage;
