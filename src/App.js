import Home from "./views/home";
import Login from "./views/login";
import Signup from "./views/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Notification from "./views/notifications";
import Answers from "./views/Answers";
import Space from "./views/Space";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/answer" element={<Answers/>}/>
          <Route path="/spaces" element={<Space/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
