import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoView = (props) => {
  
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`http://localhost:3001/notes`)
      .then((res) => {
        console.log(res);
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3001/notes/${id}`)
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="col-md-12">
        <div className="row">
          {userInfo.map((user) => (
            <div className="col-md-4">
              <div className="card" style={{ width: "400px" }}>
                <div className="card-body">
                  <h4 className="card-title">{user.userName}</h4>
                  <p>{user.userEmail}</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          <br />
        </div>
      </div>
    </div>
  );
};

export default TodoView;
