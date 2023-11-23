import React from "react";
import { Link } from "react-router-dom";
import '../../styles/form.css'

const LoginForm = () => {
  return (
    <div className="formContainer">
      <div className="container">
      <form method="post">
        <div className="center">
          <h2 className="headerFont">Đăng nhập</h2>
        </div>
        <div className="mb-3">
          <label className="labelForm">
            Tên đăng nhập
          </label>
          <input type="text" class="form-control" />
        </div>
        <div className="mb-3">
          <label className="labelForm">
            Mật khẩu
          </label>
          <input type="password" class="form-control" />
        </div>
        <div className="center addMargin forgetPass">
          <p>
            <Link to="/forget-password" className="forgetPass">
              Quên mật khẩu?
            </Link>
          </p>
        </div>
        <div className="center addMargin">
          <button type="submit" class="btn-custom">
            Đăng nhập
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default LoginForm;
