import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Message from './message';
import {Line, Doughnut} from 'react-chartjs-2';
import NumberFormat from 'react-number-format';
import customToast from './customToast.js';
import Loader from 'react-loader-spinner';
import '../assets/css/modal.css';



const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};


export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
};



function Body(){

    var subtitle;
  const [user,setUser] = React.useState(JSON.parse(localStorage.getItem("userData")));
  const [message,setMessage] = React.useState('');
  const [Ismessage,setIsMessage] = React.useState(false);
  const [error,setError] = React.useState(false);
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const [modalIsOpen2,setIsOpen2] = React.useState(false);
  const [data,setData] = React.useState(false);
  const [no_of_wallet, setNoWallet] = React.useState(0);
  const [wallet,setWallet] = React.useState([]);
  const [allWallet,setAllWallet] = React.useState([]);
  const [amountError, setAmountError] = useState(null)
  const [nameError, setNameError] = useState(null)
  const [isLoading, setLoading] = useState(false);
  const dater = new Date();
  const month = dater.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  
  const { value:name, bind:bindname, reset:resetname } = useInput('');
  const { value:amount, bind:bindamount, reset:resetamount } = useInput('');
  const { value:category, bind:bindcategory, reset:resetcategory } = useInput('savings');
  const [chartData, setChartData] = useState({});
  const [pieData, setPieData] = useState({});
  function openModal() {
    setIsOpen(true);
  }

  const chart = (income,expense) => {

    income = JSON.parse(income)
    expense = JSON.parse(expense)
    setChartData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets:[{
        label: 'Income',
        data: [income.January,income.February,income.March,income.April,income.May,income.June,income.August,income.September,income.October,income.November,income.December],
        borderColor: '#1cc88a',
        borderWidth: 4,
        order: 1
      }, {
        label: 'Expense',
        data: [expense.January,expense.February,expense.March,expense.April,expense.May,expense.June,expense.August,expense.September,expense.October,expense.November,expense.December],
        borderColor: '#FF0000	',
        borderWidth: 4,
        order: 2
      }]
    })
  }

  const piechart = (income,expense) => {
    setPieData({
      labels: ["income", "expense"],
      datasets:[{
        label: 'current wallet',
        data: [income, expense],
        backgroundColor: [
          '#1cc88a',
          '#FF0000'
        ],
        borderWidth: 4,
        order: 1
      }]
    })
  }
 


  useEffect(() =>{
    setMessage('');
    setIsMessage(false);
    setLoading(true);

  axios.get('https://inawoapi.herokuapp.com/api/v1/dashboard/home', { headers: {"Authorization" : `Bearer ${user.token}`} }).then((response) => {
    setLoading(false);
      chart(response.data.year_income,response.data.year_expense)
      setData(response.data);
      setNoWallet(response.data.no_of_wallet);
      if(localStorage.getItem("current_wallet")){
        setWallet(JSON.parse(localStorage.getItem("current_wallet")));
      }
      else{
        if(response.data.wallets[0]){
          localStorage.setItem("current_wallet", JSON.stringify(response.data.wallets[0]));
          setWallet(response.data.wallets[0]);
        }
        else{
          localStorage.setItem("current_wallet", JSON.stringify([]));
          setWallet([]);
        }
        
      }

      setAllWallet(response.data.wallets);
    },
    (error) => {
      //logout();
    });



    setTimeout(()=>{
      let wallet = JSON.parse(localStorage.getItem("current_wallet"));
      if(wallet == null){
        piechart(0,0);
      }
      else{
          axios.get(`https://inawoapi.herokuapp.com/api/account/month/${wallet['id']}`, { headers: {"Authorization" : `Bearer ${user.token}`} }).then((response) => {
            piechart(response.data.income,response.data.expense);
          },
          (error) => {
            console.log(error)
          });
      }
      
    }, 1000);
    
  }, []);

    function openModal() {
    setIsOpen(true);
  }

  function openModal2() {
    setIsOpen2(true);
  }
 
  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function afterOpenModal2() {
    subtitle.style.color = '#f00';
  }
 
  function closeModal(){
    setIsOpen(false);
  }

  function closeModal2(){
    setIsOpen2(false);
  }

  function changeWallet(wallet){
    for (const [index, value] of allWallet.entries()) {
      if(index === wallet){
        setWallet(value);
        localStorage.setItem("current_wallet",JSON.stringify(value));
        closeModal2();
        customToast.success("Wallet changed successfully");
        let walleta = JSON.parse(localStorage.getItem("current_wallet"));
        axios.get(`https://inawoapi.herokuapp.com/api/account/month/${walleta['id']}`, { headers: {"Authorization" : `Bearer ${user.token}`} }).then((response) => {
          piechart(response.data.income,response.data.expense);
        },
        (error) => {
          console.log(error)
        });
      }
    }
  }

  function deleteWallet(wallet){
    for (const [index, value] of allWallet.entries()) {
      if(index === wallet){
        allWallet.pop(wallet)
      }
    }
  }


  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    
    

   
    closeModal()
    axios.post('https://inawoapi.herokuapp.com/api/account/create/', {name,amount,category}, { headers: {"Authorization" : `Bearer ${user.token}`} }).then((response) => {
      console.log(response.data.data);
      setNoWallet(no_of_wallet+1)
      setAllWallet([...allWallet,response.data.data])
      setIsOpen(true);
      setIsOpen(false);
      setError(false);
      customToast.success("Wallet created successfully");
      
      setTimeout(()=>{
        setMessage('');
        setIsMessage(false);
      }, 5000);
    },(error) => {
      console.log(error);
      customToast.error("An error occured while creating wallet, we're looking into it shortly");

     
    });
    
}


 
    
        return(
            <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4" id="modaller">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <a  onClick={openModal} href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-select fa-sm text-white-50"></i> Add Wallet</a>
            </div>
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card  shadow h-100 py-2">
                        <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">All Wallet Earnings ({monthNames[month]})</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {isLoading ?
                                    <Loader
                                        type="Oval"
                                        color="#4e73df"
                                        height={30}
                                        width={30}
                                        //3 secs
                                    />                                 
                                    :<NumberFormat value={data.current_month_earning} displayType={'text'} thousandSeparator={true} prefix={'$'} />}
                              </div>
                            </div>
                            <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>


                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card  shadow h-100 py-2">
                        <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">All Wallet Earnings (Annual)</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {isLoading ?
                                    <Loader
                                        type="Oval"
                                        color="#4e73df"
                                        height={30}
                                        width={30}
                                        //3 secs
                                    /> :     
                              <NumberFormat value={data.annual_earnings} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</div>
                            </div>
                            <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div onClick={openModal2} className="col-xl-3 col-md-6 mb-4">
                <div className="card shadow h-100 py-2">
                    <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Current Wallet (choose)</div>
                        <div className="row no-gutters align-items-center">
                            <div className="col-auto">
                              <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                              {isLoading ?
                                    <Loader
                                        type="Oval"
                                        color="#4e73df"
                                        height={30}
                                        width={30}
                                        //3 secs
                                    />          :
                                
                                wallet.name? wallet.name : "None"} </div>
                            </div>
                           
                        </div>
                        </div>
                        <div className="col-auto">
                        <i className="fas fa-university fa-2x text-gray-300"></i>
                        </div>
                    </div>
                    </div>
                </div>
                </div>


                <div className="col-xl-3 col-md-6 mb-4">
                <div className="card  shadow h-100 py-2">
                    <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Wallets</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {isLoading ?
                                    <Loader
                                        type="Oval"
                                        color="#4e73df"
                                        height={30}
                                        width={30}
                                        //3 secs
                                    />          :
                          no_of_wallet }</div>
                        </div>
                        <div className="col-auto">
                        <i className="fas fa-list fa-2x text-gray-300"></i>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>

                <div className="row">

<div className="col-xl-8 col-lg-7">


  <div className="card shadow mb-4">
    <div className="card-header py-3">
      <h6 className="m-0 font-weight-bold text-primary">Yearly Transactions</h6>
    </div>
    <div className="card-body">
      <div className="chart-area" style={{height: 500, width:1020}}>
        <Line data={chartData} options={{
            legend: {
              display: false
          },
          responsive: true,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
            }],
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
        }
        }}/>
      </div>
      
     
    </div>
  </div>

  <div className="mb-4">
    
  </div>

</div>


<div className="col-xl-4 col-lg-5">
  <div className="card shadow mb-4">
    
    <div className="card-header py-3">
      <h6 className="m-0 font-weight-bold text-primary">{wallet.name} Wallet Information ({monthNames[month]})</h6>
    </div>
  
    <div className="card-body">
      <div className="chart-pie pt-4">
      <Doughnut data={pieData} options={{
          
        }}/>
      </div>
    </div>
  </div>
</div>
</div>
        <Modal
            isOpen={modalIsOpen2}
            onAfterOpen={afterOpenModal2}
            onRequestClose={closeModal2}
            style={customStyles}
            contentLabel="Example Modal"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
          <a   onClick={closeModal2} href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-select fa-sm text-white-50"></i> Close</a>
          <div className="row">
          <div className="card shadow mb-4"></div>
          <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">List of Wallets</h6>
                </div>
                <div className="card-body">
                  <div className="row">
                  {allWallet.map((value, index) => {
                      return <div key={index} onClick={changeWallet.bind(this, index)} className="col-xl-3 col-md-6 mb-4">
                      <div className="card shadow  py-2">
                          <div className="card-body">
                          <div className="row no-gutters align-items-center">
                              <div  className="col mr-2">
                              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{value.name}</div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">${value.current_balance}</div>
                              
                              </div>
                              <div className="col-auto">
                                  <div className="h5 mb-0 font-weight-bold text-gray-800">Select</div>
                              </div>
                          </div>
                          </div>
                      </div>
                  </div>
                })}
                  
                

                  </div>
                </div>
              </div>
              <div className="card shadow mb-4"></div>
              </div>
          </Modal>
          
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
 
          <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
          <button onClick={closeModal}></button>
         
          
              
          <div className="col-lg-12">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Create a Wallet</h1>
              </div>
              <form className="user" onSubmit={handleSubmit}>
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input type="text" className="form-control form-control-user"  {...bindname} placeholder="Name" required/>
                  </div>
                  <div className="col-sm-6">
                    <input type="number" className="form-control form-control-user" {...bindamount}  placeholder="Amount" required/>
                  </div>
                </div>
                <div className="form-group">
                  
                  <select name="category" {...bindcategory} className="form-control form-control-user2">
                  <option value="savings" >Savings</option>
                  <option value="current" >Current</option>
                  
                </select>
                  </div>
                <button type="submit" class="btn btn-primary btn-user btn-block">
                  Create Wallet
                </button>
              </form>
              
            </div>
          </div>
            
        </Modal>

        <div class="modal show-modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h1>Hello, I am a modal!</h1>
        </div>
    </div>
            </>
        )
    
}

export default Body;