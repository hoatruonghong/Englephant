import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/form.css";
import { AuthContext } from "./../../contexts/AuthContext";
import AlertMessage from './../layout/AlertMessage';

const LoginForm = () => {
  const [alert, setAlert] = useState(null)

  //context
  const { loginUser } = useContext(AuthContext);

  //local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginForm;

  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };
  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        console.log("login successfully");        
      }
      else {
        console.log("login failed");
        setAlert({ type: 'danger', message: loginData.message })
				setTimeout(() => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formContainer">
      <div className="container">      
        <form method="post" onSubmit={login}>
          <div className="center">
            <h2 className="headerFont">Đăng nhập</h2>
          </div>
          <AlertMessage info={alert} />
          <div className="mb-3">
            <label className="labelForm">Tên đăng nhập</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={onChangeLoginForm}
              required
            />
          </div>
          <div className="mb-3">
            <label className="labelForm">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={onChangeLoginForm}
              required
            />
          </div>
          <div className="center addMargin forgetPass">
            <p>
              <Link to="/forget-password" className="forgetPass">
                Quên mật khẩu?
              </Link>
            </p>
          </div>
          <div className="center addMargin">
            <button type="submit" className="btn-custom">
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
