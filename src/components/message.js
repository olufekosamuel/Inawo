import React from 'react';
import FlashMessage from 'react-flash-message'
 
const Message = (props) => { return(
<>
  <FlashMessage>
    {props.status?
    <div className="alert alert-danger" role="alert">
        {props.children}
    </div>:
    <div className="alert alert-success" role="alert">
        {props.children}
    </div>
    }
  </FlashMessage>
</>
)}

export default Message;