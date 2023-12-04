import React from 'react'
import '../../styles/form.css'

const ChangePassForm = () => {
    return (
        <div className="formContainer">
          <div className="container">
          <form method="post">
            <div className="center">
              <h2 className="headerFont">Đổi mật khẩu</h2>
            </div>
            <div className="mb-3">
              <label className="labelForm">
                Mật khẩu mới
              </label>
              <input type="password" class="form-control" />
            </div>
            <div className="mb-3">
              <label className="labelForm">
                Nhập lại mật khẩu
              </label>
              <input type="password" class="form-control" />
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

export default ChangePassForm