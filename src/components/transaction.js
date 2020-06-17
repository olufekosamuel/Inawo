import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import NumberFormat from 'react-number-format';
import customToast from './customToast.js';


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
function Transaction(){
    var subtitle;
    var wallets = JSON.parse(localStorage.getItem('current_wallet'))
    const [message,setMessage] = React.useState('');
    const [Ismessage,setIsMessage] = React.useState(false);
    const [error,setError] = React.useState(false);
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [wallet,setWallet] = React.useState(null);
    const [allWallet,setAllWallet] = React.useState([]);
    const [allTransaction,setAllTransaction] = React.useState([]);
    const [amountError, setAmountError] = useState(null)
    const [payeeError, setPayeeError] = useState(null)
    const [user,setUser] = React.useState(JSON.parse(localStorage.getItem("userData")));
    const { value:amount, bind:bindamount, reset:resetamount } = useInput('');
    const { value:payee, bind:bindpayee, reset:resetpayee } = useInput('');
    const { value:category, bind:bindcategory, reset:resetcategory } = useInput('bank');
    const { value:account, bind:bindaccount, reset:resetaccount } = useInput(wallets.id);
    const { value:transaction_type, bind:bindtransaction_type, reset:resettransaction_type } = useInput('income');
    const [startDate,setStartDate] = React.useState(new Date());
  


    function openModal() {
        setIsOpen(true);
      }

      
  useEffect(() =>{
    setWallet(JSON.parse(localStorage.getItem('current_wallet')));
    var wallets = JSON.parse(localStorage.getItem('current_wallet'))
    wallets = wallets['id']
    axios.get('https://inawoapi.herokuapp.com/api/v1/dashboard/home',{ headers: {"Authorization" : `Bearer ${user.token}`} }).then((response) => {
      
      setAllWallet(response.data.wallets);
    },
    (error) => {
      console.log(error);
    });
    
    axios.get(`https://inawoapi.herokuapp.com/api/transaction/list/${wallets}`, { headers: {"Authorization" : `Bearer ${user.token}`} }).then((response) => {
      setAllTransaction(response.data.transaction);
    },
    (error) => {
      console.log(error);
    });

    
  }, []);

  function deleteTransaction(trans_id){
    
    axios.post(`https://inawoapi.herokuapp.com/api/transaction/deleted/${trans_id}`,{ headers: {"Authorization" : `Bearer ${user.token}`} }).then((response) => {
      console.log(response);
      customToast.success("Transaction deleted successfully");
      
    }, (error) => {
        console.log(error);
    });
        
  }

 
     
      function afterOpenModal() {
        subtitle.style.color = '#f00';
      }
     
      function closeModal(){
        setIsOpen(false);
      }

      function handleChange (date){
        setStartDate(date)
      };

     
      const handleSubmit = (evt) => {
        evt.preventDefault();
        
        closeModal()
          axios.post('https://inawoapi.herokuapp.com/api/transaction/create/', {account,category,payee,startDate,amount,transaction_type}, { headers: {"Authorization" : `Bearer ${user.token}`} }).then((response) => {
            console.log(response);
            setAllTransaction([...allTransaction,response.data.data]);
            customToast.success("Transaction changed successfully");
            
          }, (error) => {
           
            customToast.error("An error occured while making Transaction");
           
          }); 
        
    }

    
     
    
        return(
            
            <div className="container-fluid">
            
              
                 <div className="d-sm-flex align-items-center justify-content-between mb-4" id="modaller">
                <h1 className="h3 mb-0 text-gray-800">Transactions</h1>
                <a   href="#" onClick={openModal} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"> Add Transaction</a>
            </div>
             
              
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Transactions</h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                      <thead>
                        <tr>
                          <th>Wallet</th>
                          <th>Amount</th>
                          <th>Payee</th>
                          <th>Category</th>
                          <th>Created</th>
                          <th>Updated</th>
                          
                        </tr>
                      </thead>
                      
                      <tbody>
                        
                      {allTransaction.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td>{wallet.name}</td>
                            <td><NumberFormat value={value.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                            <td>{value.payee}</td>
                            <td>{value.transaction_type}</td>
                            <td>{value.created_at}</td>
                            <td>{value.updated_at}</td>
                          </tr>
                        )
                      })}
                        
                       
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

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
                <h1 className="h4 text-gray-900 mb-4">Create a Transaction</h1>
              </div>
              <form className="user" onSubmit={handleSubmit}>
                <div className="form-group row">
                  
                  <div className="col-sm-6 mb-3 mb-sm-0">
                  
                  <select name="category" {...bindcategory} className="form-control form-control-user2">
                  <option value="bank" >Bank</option>
                  <option value="cash" >Cash</option>
                  
                </select>
                  </div>
                  <div className="col-sm-6">
                    <input type="text" type="number" className="form-control form-control-user" {...bindamount}  placeholder="Amount"/>
                  </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                    
                    <select name="account" {...bindaccount}  className="form-control form-control-user2">
                    {allWallet.map((value, index) => {
                      return <option value={value.id} key={index}> {value.name} </option>
                     })}
                    
                    
                    </select>
                    </div>
                  
                  <div className="col-sm-6 mb-3 mb-sm-0">
                  <DatePicker  selected={startDate} onChange={handleChange} className="form-control form-control-user"/>
                  </div>
                  
                </div>
                
                  <div className="form-group">
                  <input type="text"  className="form-control form-control-user" {...bindpayee}  placeholder="Payee"/>
                  </div>

                  <div className="form-group">
                  <select name="transaction_type" {...bindtransaction_type} className="form-control form-control-user2">
                  <option value="income" >Income</option>
                  <option value="expense" >Expense</option>
                  
                </select>
                  </div>
                  
                <button type="submit" className="btn btn-primary btn-user btn-block">
                  Create Wallet
                </button>
                { amountError && <p style={{color:'red'}}>Amount field is required</p> }
                { payeeError && <p style={{color:'red'}}>Payee field is required</p> }
              </form>
              
            </div>
          </div>
            
        </Modal>
    
            </div>
           
    
        )
}

export default Transaction;