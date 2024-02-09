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
import { useAppSelector } from "./hooks/useAppSelector";
import { authSelector } from "./slices/auth-slice";

function App() {
  const { user } = useAppSelector(authSelector);

  return (
    <Router>
      <div className="flex min-h-screen m-0 p-6 ">
        <div className="w-screen max-h-screen flex bg-muted/60  text-card-foreground rounded-xl border">
          <Routes>
            <Route
              path={RoutesPath.ROOT}
              element={<Navigate to={RoutesPath.SIGNIN} />}
            />
            <Route
              path={RoutesPath.HOME}
              element={user ? <Home /> : <Navigate to={RoutesPath.SIGNIN} />}
            />
            <Route
              path={RoutesPath.SIGNIN}
              element={!user ? <Signin /> : <Navigate to={RoutesPath.HOME} />}
            />
            <Route
              path={RoutesPath.SIGNUP}
              element={!user ? <Signup /> : <Navigate to={RoutesPath.HOME} />}
            />
            <Route path="*" element={<Navigate to={RoutesPath.HOME} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
