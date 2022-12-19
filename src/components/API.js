import axios from "axios";
import React, { useEffect, useState } from "react";

const API = () => {
  const [sname, setSname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading]=useState(false)

  useEffect(() => {
    getData();
  }, []);

  const data = {
    stu_id: "",
    user_id: "",
    stu_name: sname,
    email: email,
    password: password,
  };

  const a = JSON.stringify(data);

  const submitData = () => {
    axios
      .post("https://anbulbule.000webhostapp.com/api-insert.php", a)
      .then((res) => {
        console.log(res);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = () => {
    setLoading(true)
    axios
      .get("https://anbulbule.000webhostapp.com/index.php")
      .then((res) => {
        setResponseData(res.data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input
        type="text"
        name="sname"
        value={sname}
        placeholder="Name"
        onChange={(e) => setSname(e.target.value)}
      />
      <input
        type="text"
        name="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="button" value="Submit" onClick={submitData} />
      {console.log(responseData)}
      <table>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
        {responseData.map((data) => (
          <tr>
            <td>{data?.user_id}</td>
            <td>{data?.stu_name}</td>
            <td>{data?.email}</td>
          </tr>
        ))}
      </table>
      {loading ? "Loading please wait..!" : <></>}
    </div>
  );
};

export default API;
