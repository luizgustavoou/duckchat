import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import { RoutesPath } from "./utils/routes_path";
import Signin from "./pages/Signin/Signin";
import Signout from "./pages/Signout/Signout";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-current m-0 p-6 ">
        <div className="flex-1 flex bg-gray-900">
          <Routes>
            <Route path={RoutesPath.ROOT} element={<Home />} />
            <Route path={RoutesPath.SIGNIN} element={<Signin />} />
            <Route path={RoutesPath.SIGNOUT} element={<Signout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
