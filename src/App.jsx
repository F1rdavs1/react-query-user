import { Route, Routes, NavLink } from "react-router-dom";
import "./App.css";
import { AddUser, User } from "./pages";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";

function App() {
  return (
    <>
      <ul className="text-center bg-[green] text-white py-[20px] text-[20px] font-mono space-x-4">
        <NavLink to={"/"} className={"px-[15px] py-[7px] rounded-md space-x-2"}>
          {" "}
          <span>
            <UserAddOutlined />
          </span>
          <span>AddUser </span>
        </NavLink>
        <NavLink to={"/add"} className={"px-[15px] py-[7px] rounded-md space-x-2"}>
          <span>
            <UserOutlined />
          </span>
          <span>User</span>
        </NavLink>
      </ul>
      <Routes>
        <Route path="/" element={<AddUser />} />
        <Route path="/add" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
