import React, { Component } from 'react';

import { Route} from 'react-router-dom';
import Header from './header/header';
import Sidebar from './sidebar';
import Body from './body';
import Transaction from './transaction';
import Account from './account';


class Dashboard extends Component{

    componentDidMount() {
    }

    logout(){
        localStorage.removeItem('current_wallet');
        localStorage.removeItem('userData');
        window.location.href = '/';
    }

    render(){
        
        return(
            <>
            <div id="wrapper">
                <Sidebar logout={this.logout}/>
                 
                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">
                    <Header/>
                    <div className="container-fluid">
                        
                            <Route exact path="/dashboard/" component={Body}/>
                            <Route path="/dashboard/transaction" component={Transaction}/>
                            <Route path="/dashboard/account" component={Account}/>
                        
                    </div>
                </div>
                </div>
            </div>
            </>
        )
    }
}

export default Dashboard;