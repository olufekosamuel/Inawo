import React, {Component} from 'react';
import {Link,} from 'react-router-dom';
import logo from '../assets/img/inawo.png';

class Sidebar extends Component{
    
  
    render(){
        return(
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            
                <a className="sidebar-brand d-flex align-items-center" href="#">
                    
                    <div className="sidebar-brand-text mx-3"><img style={{width:'70%',height: '50%'}} src={logo} alt="IMG-LOGO"/></div>
                </a>

                
                <hr className="sidebar-divider my-0"/>

                
                <li className="nav-item activer">
                <Link className="nav-link" to='/dashboard/'>
                    <i className="fas fa-fw fa-home"></i>
                    <span>Home</span>
                </Link>
                </li>

                
                <hr className="sidebar-divider"/>

                
                <div className="sidebar-heading">
                    features
                </div>

                
                <li className="nav-item">
                    <Link className="nav-link" to='/dashboard/transaction'>
                    <i className="fas fa-fw fa-table"></i>
                    <span>Transactions</span>
                    </Link>
                </li>
                
                <hr className="sidebar-divider"/>

            
                <div className="sidebar-heading">
                    Settings
                </div>


                <li className="nav-item">
                <Link className="nav-link" to='/dashboard/account'>
                    
                    <i className="fas fa-fw fa-user"></i>
                    <span>Account</span>
                </Link>
                </li>

                
                <li className="nav-item">
                    
                    <a onClick={this.props.logout} className="nav-link" href="/">
                    <i className="fas fa-fw fa-stop"></i>
                    <span>Logout</span></a>
        
                </li>

            </ul>

        );
    }
} 

export default Sidebar;