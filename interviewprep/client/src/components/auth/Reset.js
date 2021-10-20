import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";


const Reset = ({match,history})=>{

    const [values,setValues]= useState({
        name:'',
        token:'',
        newPassword:'',
        buttonText: 'Reset Password'
    })

    useEffect(()=>{
        let token = match.params.token;
        let {name} = jwt_decode(token);
        if(token){
            setValues({...values,name,token});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const { name,token,newPassword,buttonText} = values;

    const handleChange = e =>{
        setValues({...values,newPassword: e.target.value});
    };


    const clickSubmit = e =>{
        e.preventDefault();
        setValues({...values,buttonText:'Submitting'});
        axios({
            method:'POST',
            url:"/api/users/reset-password",
            data: { newPassword,resetPasswordLink:token}
        },{withCredentials:true})
        .then(res=>{
            toast.success(res.data.message);
            setValues({...values,buttonText:'Done'});
            history.push('/login');
        })
        .catch(err=>{
            toast.error(err.response.data.error);
            setValues({...values,buttonText:"Reset Password"});
        })
    }

    const passwordResetForm = () =>(

          <form>
            <div className="form-group">
              <label className="text-muted">New Password</label>
              <input
                onChange={handleChange}
                value={newPassword}
                type="password"
                className="form-control"
                placeholder="Type new password"
                required
              />
            </div>

            <div>
              <button className="btn btn-outline-primary" onClick={clickSubmit}>
                {buttonText}
              </button>
            </div>
          </form>
        
    )

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="p-5 text-center">
              Hey {name}, Type your new password
            </h1>
            {passwordResetForm()}
          </div>
        </div>
      </div>
    );
}
export default Reset;