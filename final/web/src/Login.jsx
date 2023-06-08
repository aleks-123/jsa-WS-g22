import React, { useState, useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";

const Login = () => {
  // 1. Кје креираме објект каде сто кје ги зацуваме податоците во форма

  const initdata = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(initdata);

  const [loggedIn, setLoggedIn] = useState(false);

  const dataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(isLoggedIn);
  }, []);

  const login = async () => {
    console.log(data);
    try {
      let res = await fetch("http://localhost:9002/api/v1/auth/login", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let out = await res.json();
      if (res.ok) {
        setLoggedIn(true);
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("token", out.token);
      }
      alert(out.token);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("token");
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <ProtectedRoute />
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <label>
            <span>Email</span>
            <br />
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={dataChange}
            />
            <br />
          </label>
          <label>
            <span>Password</span>
            <br />
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={dataChange}
            />
            <br />
          </label>
          <br />
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
