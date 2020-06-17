import React, {component} from 'react';
import Modal from 'react-modal';

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

const Modala = (props) => {
    
    var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(true);
  function openModal() {
    setIsOpen(true);
  }
  

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
    

    return(
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
 
          <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
          <button onClick={closeModal}></button>
        {props.children}
        </Modal>
    )
}

export default Modala;