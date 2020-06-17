import React,  {useState,useRef,useEffect} from 'react';
import Auth from '../layouts/auth';
import {Link} from 'react-router-dom';
import AuthService from '../services/AuthService';
import Loader from 'react-loader-spinner';
import customToast from './customToast.js';


const Register = props=>{
    const [user,setUser] = useState({fullname: "",password: "", email: ""});
    const [isLoading, setLoading] = useState(false);
    let timerID = useRef(null);

    useEffect(()=>{
       
        return()=>{
            clearTimeout(timerID);
        }
    }, [user.fullname])


    const onSubmit = e => {
        
        e.preventDefault();
       
            setLoading(true);
            AuthService.register(user).then(data=>{
                const { message } = data;
                const { error } = data;
                
                
                resetForm();
                if(!error){
                    customToast.success('Account created successfully');
                    timerID = setTimeout(()=>{
                        props.history.push('/login');
                    }, 5000)
                }
                else{
                    setLoading(false);
                    customToast.error('An error occured while trying to register');
                }
            });
    }

    const onChange = e => {
        setUser({...user,[e.target.name]: e.target.value})
    }

    const resetForm = ()=> {
        setUser({fullname:"",password:"",email:""})
    }

    
        return(
            <>
            <Auth login={false}>
            <form className="login100-form validate-form" onSubmit={onSubmit}>
                            <span className="login100-form-title">
                                Register
                            </span>
                            <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                <input className="input100" onChange={onChange} type="text" name="email" placeholder="Email" required/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            

                            <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                <input className="input100"  onChange={onChange} type="text" name="fullname" placeholder="Fullname" required/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </span>
                            </div>
                           

                            <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                <input className="input100" onChange={onChange} type="password" name="password" placeholder="Password" required/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>
                            
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    {isLoading ?
                                            
                                            <Loader
                                                type="Oval"
                                                color="#FFFFFF"
                                                height={30}
                                                width={30}
                                                timeout={3000} //3 secs
                                            />
                                                                        
                                    :"Register"}
                                </button>
                            </div>

                            <div className="text-center p-t-12">
                                <span className="txt1">
                                <Link to="/login" className="nav-link">
                                    Signin to your Account
                                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </Link>
                                </span>
                               
                            </div>

                            
                        </form>
                        
            </Auth>
            </>
        )

}

export default Register;