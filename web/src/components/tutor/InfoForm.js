import React, { useContext, useState } from 'react'
import "./../../styles/formTutor.css";
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from './../layout/AlertMessage';

const InfoForm = () => {
    const {
        authState: { 
          user
        },
    } = useContext(AuthContext);
    
    console.log("userrr", user);
    const [alert, setAlert] = useState(null)

    //context
    const { updateUser } = useContext(AuthContext);

    //local state
    const [updateForm, setUpdateForm] = useState({
        fullname: user.fullname,
        bornyear: user.bornyear,
        nationality: user.nationality,
        phone: user.phone,
        introduction: user.introduction
    });
    const { fullname, bornyear, nationality, phone, introduction } = updateForm;

    const onChangeUpdateForm = (event) => {
        setUpdateForm({ ...updateForm, [event.target.name]: event.target.value });
    };
    const update = async (event) => {
        event.preventDefault();
        try {
            console.log("updateform", updateForm);
        const updateData = await updateUser(updateForm);
        if (updateData.success) {
            console.log("update successfully");
            setAlert({ type: 'success', message: updateData.message })
                    setTimeout(() => setAlert(null), 2000)
        }
        else {
            console.log("update failed");
            setAlert({ type: 'danger', message: updateData.message })
                    setTimeout(() => setAlert(null), 2000)
        }
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <form method="post" onSubmit={update}>
          <div className="mb-3">
            <label className="labelForm">Fullname</label>
            <input
              type="text"
              className="form-control"
              name="fullname"
              placeholder="Fullname"
              value={fullname}
              onChange={onChangeUpdateForm}
              required
            />
          </div>
          <div className='row'>
            <div className="col-6 mb-3">
                <label className="labelForm">Year of Birth</label>
                <input
                type="text"
                className="form-control"
                name="bornyear"
                placeholder="BornYearn"
                value={bornyear}
                onChange={onChangeUpdateForm}
                required
                />
            </div>
            <div className="col-6 mb-3">
                <label className="labelForm">Nationality</label>
                <input
                type="text"
                className="form-control"
                name="nationality"
                placeholder="Nationality"
                value={nationality}
                onChange={onChangeUpdateForm}
                required
                />
            </div>

          </div>
          <div className="mb-3">
            <label className="labelForm">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={onChangeUpdateForm}
              required
            />
          </div>
          <div className="mb-3">
            <label className="labelForm">Introduction</label>
            <textarea
              type="text"
              className="form-control"
              name="introduction"
              placeholder="Introduction"
              value={introduction}
              onChange={onChangeUpdateForm}
            />
          </div>
          
          <div className="center addMargin">
            <button type="submit" className="btn-custom">
              Update
            </button>
          </div>
          <AlertMessage info={alert} />
        </form>
    );
}

export default InfoForm