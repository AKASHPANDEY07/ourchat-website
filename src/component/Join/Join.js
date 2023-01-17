import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './join.scss';

let user;

const Join = () => {
  const [name, setName] = useState('');

  const setUsername = () => {
    user = name;
    setName('');
  };
  
  return (
    <>
      <div className='joinpagecontainer'>
        <h1>Welcome to Our Chat App</h1>
        <div className='joinpageusernamecontainer'>
          <h3>Enter Username</h3>
          <input
            id='input-username'
            type='text'
            placeholder='Enter your name'
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Link
            to='/chat'
            onClick={(event) => (!name ? event.preventDefault() : null)}
          >
            <button className='loginbutton' onClick={setUsername}>
              Login
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Join;
export { user };
