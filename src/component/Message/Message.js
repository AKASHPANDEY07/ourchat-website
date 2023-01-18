import React from 'react';

import './Message.scss';

const Message = (props) => {
  const {user, message, classs} = props;
  return (
    <>
      {props?.user ? (
        <div className={`messagecontainer ${classs}`}>
          {user}: {message}
        </div>
      ) : (
        <div className={`messagecontainer ${classs}`}>{user}: {message}</div>
      )}
    </>
  );
};

export default Message;
