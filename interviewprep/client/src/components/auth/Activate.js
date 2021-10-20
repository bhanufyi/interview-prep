import React,{useState,useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios  from 'axios';
import {toast} from 'react-toastify';


const Activate = ({match,history})=>{
    const [values,setValues] = useState({
        name:'',
        token:'',
        show : true
    })

    useEffect(()=>{
        let token = match.params.token;
        let { name} = jwt_decode(token);
        if(token){
            setValues({...values,name,token})
        }
    },[]);

    const {name,token,show} = values;

    const clickSubmit = e =>{
        e.preventDefault();

        axios({
            method:'POST',
            url:"/api/users/account-activation",
            data: {token}
        },{withCredentials: true})
        .then(res=>{
            setValues({...values,show:false});
            toast.success(res.data.message);
            history.push('/login');
        })
        .catch(err=>{
            console.log(err);
            toast.error(err.response.data.error);
        })
    }


    const activationLink = ()=>(
        <div className='text-center'>
            <h1 className="p-5">Hey {name}, Ready to Activate your Account</h1>
            <button className="btn btn-outline-primary" onClick={clickSubmit}>
                Activate Account
            </button>
        </div>
    );


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {activationLink()}
                </div>
            </div>
        </div>
    )
}


export default Activate;