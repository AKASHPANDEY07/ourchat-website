import React, { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import ReactScrollToBottom from 'react-scroll-to-bottom';

import { user } from '../Join/Join';
import Message from '../Message/Message';

import './Chat.scss';

const ENDPOINT =
  'https://ourchat-server.onrender.com/' || 'http://localhost:4500/';
let socket;

const Chat = () => {
  const [id, setId] = useState();
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById('chatinputbtn').value;
    socket.emit('message', { message, id });
    document.getElementById('chatinputbtn').value = '';
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      // console.log('connected',socket.id);
      setId(socket.id);
    });

    socket.emit('joined', { user });

    socket.on('welcome', (data) => {
      setMessages([...messages, data]);
      // console.log(data);
    });

    socket.on('userJoined', (data) => {
      setMessages([...messages, data]);
      // console.log(data);
    });

    socket.on('leave', (data) => {
      setMessages([...messages, data]);
      // console.log(data);
    });

    return () => {
      socket.emit('disconnected');
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('sendmessage', (data) => {
      setMessages([...messages, data]);
      // console.log(data);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <>
      <div className='chatpage'>
        <div className='chatcontainer'>
          <div className='header'>Welcome {user}!</div>
          <ReactScrollToBottom className='chatbox'>
            {messages?.map((item, index) => {
              return (
                <Message
                  message={item?.message}
                  classs={item.id === id ? 'right' : 'left'}
                  user={item.id === id ? '' : item.user}
                />
              );
            })}
          </ReactScrollToBottom>
          <div className='inputbox'>
            <input
              type='text'
              placeholder='Enter your message'
              id='chatinputbtn'
            />
            <button onClick={send} className='sendbtn'>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
