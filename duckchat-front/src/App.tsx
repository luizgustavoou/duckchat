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

function App() {
  return (
    <Router>
      <div className="flex min-h-screen m-0 p-6 ">
        <div className="w-screen flex bg-muted/60  text-card-foreground rounded-xl border">
          <Routes>
            <Route path={RoutesPath.ROOT} element={<Home />} />
            <Route path={RoutesPath.SIGNIN} element={<Signin />} />
            <Route path={RoutesPath.SIGNUP} element={<Signup />} />
          </Routes>
        </div>
      </div>

      {/* <div id="div1">
        <div id="div2">aaaaaaaaaa bbbbbbbbbbbbbbbbbbbbbbbbbb</div>
        <div id="div3">oooo</div>
      </div> */}
    </Router>
  );
}

export default App;
