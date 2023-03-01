import "../../App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Landing from "../Landing";
import Login from "../Login";
import Welcome from "../Welcome";
import SignUp from "../SignUp";
import Error from "../ErrorPage";
import ForgetPassword from "../ForgetPassword";
import { IconContext } from "react-icons";

function App() {
  return (
    <div>
      <Router>
        {/* --vertical align appliquer a tout les icons */}
        <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </IconContext.Provider>
      </Router>
    </div>
  );
}

export default App;
