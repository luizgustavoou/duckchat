import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { RoutesPath } from "./utils/routes-path";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <Router>
      {/* <div className="flex flex-col w-20 h-20 bg-red-300">
        <div>
          <div className="bg-blue-300">aaaa</div>
          <div className="bg-blue-300">aaaa</div>
          <div className="bg-blue-300">aaaa</div>
        </div>
      </div> */}

      <div className="flex min-h-screen m-0 p-6 ">
        <div className="w-screen max-h-screen flex bg-muted/60  text-card-foreground rounded-xl border">
          <Routes>
            <Route path={RoutesPath.ROOT} element={<Home />} />
            <Route path={RoutesPath.SIGNIN} element={<Signin />} />
            <Route path={RoutesPath.SIGNUP} element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
