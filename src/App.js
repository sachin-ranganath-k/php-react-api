import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoEntryRedux from "./components/todo/TodoEntryRedux";
import TodoEntryReduxRegister from "./components/todo/TodoEntryReduxRegister";
import TodoEntryReduxLogin from "./components/todo/TodoEntryReduxLogin";
import Logout from "./components/todo/Logout";
import MyProfile from "./components/todo/MyProfile";
import TodoEntryNormal from "./components/todo/TodoEntryNormal";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TodoEntryNormal />} />
          {/* <Route path="/login" element={<TodoEntryReduxLogin />} /> */}
          {/* <Route path="/userHome" element={<TodoEntryRedux />} /> */}
          {/* <Route path="/myProfile" element={<MyProfile />} /> */}
          {/* <Route path="/logout" element={<Logout />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
