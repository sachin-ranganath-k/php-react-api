import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyProfile from "./components/todo/MyProfile";
import TodoEntryNormal from "./components/todo/TodoEntryNormal";
import UserLogin from "./components/user-management/UserLogin";
import UserLogout from "./components/user-management/UserLogout";
import UserRegister from "./components/user-management/UserRegister";
import { UserRegisterLogin } from "./components/user-management/UserRegisterLogin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/home" element={<TodoEntryNormal />} />
          <Route path="/logout" element={<UserLogout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
