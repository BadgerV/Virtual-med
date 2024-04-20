import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";

//CHAKRA UI
import { ChakraBaseProvider} from "@chakra-ui/react";
// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`



import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <ChakraBaseProvider>
        <App />
      </ChakraBaseProvider>
    </Provider>
  // </React.StrictMode>
);
