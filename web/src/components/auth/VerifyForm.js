import React from 'react'
import '../../styles/form.css'

const VerifyForm = () => {
  return (
    <div className="formContainer">
      <div className="container">
      <form method="post">
        <div className="center">
          <h2 className="headerFont">Quên mật khẩu</h2>
        </div>
        <p className="normalFont">Vui lòng nhập mã xác thực chúng tôi đã gửi đến bạn</p>
        <div className="mb-3">
          <label className="labelForm">
            Mã xác thực
          </label>
          <input type="text" class="form-control" />
        </div>                
        <div className="center addMargin">
          <button type="submit" class="btn-custom">
            Nhập
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default VerifyForm