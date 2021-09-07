import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  useEffect(() => {
    localStorage.setItem("Email", process.env.React_App_EMAIL);
    localStorage.setItem("Password", process.env.React_App_PASSWORD);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (
      email === process.env.React_App_EMAIL &&
      password === process.env.React_App_PASSWORD
    ) {
      sessionStorage.setItem("token", process.env.React_App_TOKEN);
      history.push("/adminpanel");
    } else {
      alert("Invalid Credentials");
    }
  };
  return (
    <>
      <h1 className="p-2 text-lg font-medium text-center text-white bg-gradient-to-br from-blue-600 to-blue-400">
        Welcome to Smartcollege
      </h1>
      <div className="flex justify-between flex-end">
        <div>
          <img src="images/login2.png" alt="image" id="mainImage" />
        </div>
        <div className="shadow-2xl p-10 " id="formDiv">
          <form className="mt-20" onSubmit={onFormSubmit}>
            <h1 className="w-full text-white rounded-md bg-gradient-to-tl from-yellow-400 to-yellow-300 p-2 mb-5 -mt-10 font-medium">
              Announcements Admin Panel
            </h1>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="w-96 allInputs"
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />
            <br />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              className="w-96 allInputs"
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <br />
            <button className="login_button w-96 text-white text-md font-medium bg-gray-900 p-2 rounded-lg">
              Log In
            </button>
            <div className="w-96 border-4 mt-10 p-5 text-center note">
              <p className="text-gray-600">
                Note:- Normal users not allowed to attempt login or to perform
                any other mal practices.
              </p>
              <p className="text-gray-600 text-center">
                In case if you are admin and you are facing any problem in login
                or found any thing not working properly then please feel free to
                contact smartcollege head admin
              </p>
            </div>
          </form>
        </div>
      </div>
      <h1 className="footer text-center text-md text-white bg-gray-700 p-2 font-medium">
        &copy; Copyright Reserved - Smartcollege
      </h1>
    </>
  );
};

export default Login;
