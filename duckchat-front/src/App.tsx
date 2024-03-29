import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import { RoutesPath } from "./utils/routes-path";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { auth } = useAuth();

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route
            path={RoutesPath.ROOT}
            element={<Navigate to={RoutesPath.SIGNIN} />}
          />
          <Route
            path={RoutesPath.HOME}
            element={auth ? <Home /> : <Navigate to={RoutesPath.SIGNIN} />}
          />
          <Route
            path={RoutesPath.SIGNIN}
            element={!auth ? <Signin /> : <Navigate to={RoutesPath.HOME} />}
          />
          <Route
            path={RoutesPath.SIGNUP}
            element={!auth ? <Signup /> : <Navigate to={RoutesPath.HOME} />}
          />
          <Route path="*" element={<Navigate to={RoutesPath.HOME} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
