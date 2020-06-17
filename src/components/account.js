import React, {useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Message from './message';
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

function Account(){
  var subtitle;
  const [firstNameError, setFirstNameError] = useState(null)
  const [lastNameError, setLastNameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [error,setError] = React.useState(false);
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const [user,setUser] = React.useState(JSON.parse(localStorage.getItem("userData")));
  const { value:firstName, bind:bindFirstName, reset:resetFirstName } = useInput(user.firstname);
  const { value:lastName, bind:bindLastName, reset:resetLastName } = useInput(user.lastname);
  const { value:email, bind:bindEmail, reset:resetEmail} = useInput(user.email);

  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
 
  function closeModal(){
    setIsOpen(false);
  }

 

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    
    closeModal()
    axios.post('https://inawoapi.herokuapp.com/api/users/edit/', {firstName,lastName,email}, { headers: {"Authorization" : `Bearer ${user.token}`} }).then((response) => {
      const userData= {'id':user.id,'firstname':firstName,'lastname':lastName,'email':email,'token':user.token}
      localStorage.setItem('userData',JSON.stringify(userData));
      setUser(JSON.parse(localStorage.getItem("userData")));
      customToast.success("Your profile has been updated successfully");
      
    }, (error) => {
      customToast.error("An error occured while submitting form.");
    });

     
}
 
 
   
        return(
          <>
            <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">

            
              <div className="card shadow mb-4">
               
                <a href="#collapseCardExample" className="d-block card-header py-3" data-toggle="collapse" aria-expanded="true" aria-controls="collapseCardExample">
                  <h6 className="m-0 font-weight-bold text-primary">Profile Information</h6>
                </a>
                
                <div className="collapse show" id="collapseCardExample">
                  <div className="card-body">
                    <strong>Name:</strong> {user.firstname} {user.lastname}<br/><br/>
                    <strong>Email:</strong> {user.email}<br/><br/>
                    <a href="#" onClick={openModal} className="btn btn-primary btn-icon-split">
                      <span className="text">Change</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-lg-3"></div>
          </div>
          
          <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
        >

          <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
          <button onClick={closeModal}></button>

          <div className="col-lg-12">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Change Profile</h1>
              </div>
              <form className="user" onSubmit={handleSubmit}>
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input type="text" value={user.firstname} {...bindFirstName}  class="form-control form-control-user" id="exampleFirstName" placeholder="Full Name" required/>
                  </div>
                  <div className="col-sm-6">
                    <input type="text" value={user.lastname} {...bindLastName} class="form-control form-control-user" id="exampleLastName" placeholder="Last Name" required/>
                  </div>
                </div>
                <div className="form-group">
                  <input type="email" value={user.email} {...bindEmail} class="form-control form-control-user" id="exampleInputEmail" placeholder="Payee Name" required/>
                </div>
                
                <button type="submit" class="btn btn-primary btn-user btn-block">
                  Submit
                </button>
                

                    { emailError && <p style={{color:'red'}}>Valid email is required: ex@abc.xyz</p> }
                    { firstNameError && <p style={{color:'red'}}>First name field is required</p> }
                    { lastNameError && <p style={{color:'red'}}>Last name field is required</p> }
              </form>
            </div>
          </div>
        </Modal>
          
          </>
        )
}

export default Account;