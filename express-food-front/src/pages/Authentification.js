import "../style/Authentification.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getErrorFromBackend } from "./../utils";
import { toast } from "react-toastify";

export default function Authentification({ setTest }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  const [userdata, setUserdata] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserdata((values) => ({ ...values, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log(userdata);

      const data = await axios.post(
        `http://localhost:5000/api/user/register`,
        userdata
      );
      // console.log(data.data);
      if (data.data.user !== undefined) {
        let userInfo = {
          token: data.data.token,
          username: data.data.username,
          email: data.data.email,
          firstname: data.data.firstname,
          name: data.data.name,
          id: data.data.id,
          is_admin: data.data.is_admin,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setTest(localStorage.getItem("userInfo"));
        navigate(redirect || "/");
      }
    } catch (error) {
      toast.error(getErrorFromBackend(error));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(userdata);
      const data = await axios.post(
        `http://localhost:5000/api/user/signin/${userdata.mail}`,
        userdata
      );
      // console.log(data.data);
      let userInfo = {
        token: data.data.token,
        username: data.data.username,
        mail: data.data.email,
        firstname: data.data.firstname,
        name: data.data.name,
        id: data.data.id,
        is_admin: data.data.is_admin,
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setTest(localStorage.getItem("userInfo"));
      navigate(redirect || "/");
    } catch (error) {
      toast.error(getErrorFromBackend(error));
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      navigate(redirect);
    }
  }, [navigate, redirect]);

  return (
    <div id="authentification" className="login-signup-body">
      <div className="login-signup-main">
        <input
          className="signup-input"
          type="checkbox"
          id="chk"
          aria-hidden="true"
        />
        <div className="signup">
          <form onSubmit={handleSignup}>
            <label className="signup-label" htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className="signup-input"
              type="text"
              name="username"
              placeholder="User name"
              required={true}
              onChange={handleChange}
            />
            <input
              className="signup-input"
              type="text"
              name="firstname"
              placeholder="First name"
              required={true}
              onChange={handleChange}
            />
            <input
              className="signup-input"
              type="text"
              name="name"
              placeholder="Last name"
              required={true}
              onChange={handleChange}
            />
            <input
              className="signup-input"
              type="email"
              name="mail"
              placeholder="Email"
              required={true}
              onChange={handleChange}
            />
            <input
              className="signup-input"
              type="password"
              name="password"
              placeholder="Password"
              required={true}
              onChange={handleChange}
            />
            <button className="signup-button">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogin}>
            <label className="login-label" htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              className="login-input"
              type="email"
              name="mail"
              placeholder="mail"
              required={true}
              onChange={handleChange}
            />
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="Password"
              required={true}
              onChange={handleChange}
            />
            <button className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
