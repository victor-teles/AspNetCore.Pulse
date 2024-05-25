import "./globals.css";

import { HashRouter, Route, Routes } from "react-router-dom";
import Healthchecks from "./healthchecks";
import Webhooks from "./webhooks";
import { Provider } from "@/components/provider";

export function App() {
	return (
		<HashRouter>
			<Provider>
				<Routes>
					<Route path="/" Component={Healthchecks} />
					<Route path="webhooks" Component={Webhooks} />
				</Routes>
			</Provider>
		</HashRouter>
	);
}
