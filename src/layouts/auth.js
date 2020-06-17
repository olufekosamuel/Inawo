import React from 'react';
import "../assets/formcss/main.css";
import "../assets/formcss/util.css";
import "../assets/formcss/vendor/animate/animate.css";
import "../assets/formcss/vendor/css-hamburgers/hamburgers.min.css";
import "../assets/formcss/vendor/select2/select2.min.css";
import step from "../assets/formcss/images/step1.png";

function Auth({children,login}) {
    return(
        <div className="auth">
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src={step} alt="IMG"/>
                            <span className="inawoformtext">
                                {login ? "Welcome back to Inawo app" : "Welcome to Inawo app" }
                        
                            </span>
                        </div>
                       

                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;