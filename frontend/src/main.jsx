import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {ChakraProvider, defaultSystem} from "@chakra-ui/react";
import {ColorModeProvider} from "./components/ui/color-mode.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraProvider value={defaultSystem}>
			<ColorModeProvider>
				<App />
			</ColorModeProvider>
		</ChakraProvider>
	</React.StrictMode>,
);