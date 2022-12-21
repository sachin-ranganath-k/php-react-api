import NavBarUser from "../../navbar/NavbarUser";

const MyProfile = () => {
  let info = sessionStorage.getItem("userInfo");
  let parsedInfo = JSON.parse(info);

  let { userId, userName, userEmail, userPassword } = parsedInfo;

  return (
    <div>
      <NavBarUser />
      <div className="container">
        <div className="panel panel-success">
          <div className="panel-heading" style={{ fontSize: "20px" }}>
            My Profile
          </div>
          <div className="panel-body">
            <div className="form-group">
                Name:
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name="userName"
                value={userName}
                // ref={userName}
              />
              <br />
              Email:
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                name="userEmail"
                value={userEmail}
                // ref={userEmail}
              />
              <br />
              Password:
              <input
                type="password"
                className="form-control"
                placeholder="Set Password"
                name="userPassword"
                value={userPassword}
                // ref={userPassword}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              //   onClick={validateField}
              disabled
            >
              Update
            </button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
