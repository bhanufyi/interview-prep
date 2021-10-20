import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';

const Forgot  = ({history,match})=>{

    const [values,setValues] = useState({
        email: '',
        buttonText : 'Request password reset Link'
    })

    const { email,buttonText} = values;


    const handleChange = name => e =>{
        setValues({...values,[name]:e.target.value});
    }

    const clickSubmit = e =>{
        e.preventDefault();

        setValues({...values,buttonText:'submiting'});

        axios({
            method: 'POST',
            url:"/api/users/forgot-password",
            data: {email}
        },{withCredentials:true})
            .then(res=>{
                toast.success(res.data.message);
                setValues({...values,buttonText:'requested'});
            })
            .catch(err=>{
                toast.error(err.response.data.error);
                setValues({...values,buttonText:'Requested password reset link'});
            })
    }


    const passwordForgotForm = ()=>(
        <form>
            <div className="form-group">
                <label htmlFor="Email" className="text-muted">Email</label>
                <input type="email" value={email} onChange={handleChange('email')} placeholder="Email" className="form-control"/>
            </div>
            <div>
                <button onClick={clickSubmit} className="btn btn-outline-primary">
                    {buttonText}
                </button>
            </div>
        </form>
    )

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="p-5 text-center">Forgot Password</h1>
                    {passwordForgotForm()}
                </div>
            </div>
        </div>
    );
}

export default Forgot;
