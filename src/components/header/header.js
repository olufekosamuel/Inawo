import React, { Component } from 'react';
import { Dropdown} from 'react-bootstrap';
import customToast from '../customToast.js';
class Header extends Component{
    constructor(props){
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
        };
    }

    componentDidMount(){
        customToast.success("Welcome back, "+ this.state.user.firstname);
        this.setState({user: JSON.parse(localStorage.getItem("userData"))});
    }

    

    render(){
        return(
 
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    
                    <ul className="navbar-nav ml-auto">

                    

                    

                      


                    
                        <li className="nav-item dropdown no-arrow">
                        <Dropdown>
                            <a className="nav-link dropdown-toggle" onClick={this.toggle}  data-toggle="dropdown">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small"> Welcome, {this.state.user.firstname} {this.state.user.lastname}</span>
                                <i className="fas fa-user"></i>
                            </a>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1"><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Profile</Dropdown.Item>
                                <Dropdown.Item href="#/action-2"><i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Activity Log</Dropdown.Item>
                                <Dropdown.Item href="#/action-3"><i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </li>

                    </ul>

                    </nav>
                
           
        )
    }
}

export default Header;