import React, {useState} from 'react';
import Auth from '../layouts/auth';
import {Link} from 'react-router-dom';
import AuthService from '../services/AuthService';
import Message from './message';
import Loader from 'react-loader-spinner';
import customToast from './customToast.js';

const Login = (props) => {
    const [user,setUser] = useState({email: "",password: ""});
    const [error, setError] = useState(null);
    const [message,setMessage] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const onChange = e => {
        e.preventDefault();
        setUser({...user,[e.target.name]: e.target.value})
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validateForm(){
        var status = true;
        
        if(!validateEmail(user.email)){
            setEmailError(true);
            status = false;
        }
        else if(user.password.length < 5){
            setPasswordError(true);
            status = false
        }
        return status;
    }

    const onSubmit = e => {
        setEmailError(false);
        setPasswordError(false);
        e.preventDefault();
        if(!validateForm()){
        }
        else{
            setLoading(true);
            AuthService.login(user).then(data=>{
                console.log(data);
                const { status } = data;
            
                if(status === 200){
                    
                    localStorage.setItem('userData',JSON.stringify(data.data));
                    props.history.push('/dashboard');
                    setError(false);
                }else{
                    customToast.error("You entered a wrong email or password");
                    setLoading(false);
                }
            })
        }
    }
  
        return(
            <>
            <Auth login={true}>
            <form className="login100-form validate-form" onSubmit={onSubmit}>
                            <span className="login100-form-title">
                                Login
                            </span>

                            <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" name="email"  onChange={onChange} placeholder="Email" required/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            { emailError && <p style={{color:'red'}}>Valid email is required: ex@abc.xyz</p> }

                            <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                <input className="input100" type="password" onChange={onChange} name="password" placeholder="Password" required/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>
                            { passwordError && <p style={{color:'red'}}>Password length must be minimum of 5</p> }
                            
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    {isLoading ?
                                        
                                            <Loader
                                                type="Oval"
                                                color="#FFFFFF"
                                                height={30}
                                                width={30}
                                                 //3 secs
                                            />
                                                                        
                                    :"Login"}
                                </button>
                            </div>

                            <div className="text-center p-t-12">
                                <span className="txt1">
                                 <Link to="/register" className="nav-link">Create your Account
                                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i></Link>
                                </span>
                                
                            </div>
                            {message ? <Message status={error}>{message}</Message>:null}
                           
                        </form>
            </Auth>
            </>
        )
 
}

export default Login;