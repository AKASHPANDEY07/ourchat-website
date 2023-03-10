import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Join from './component/Join/Join';
import Chat from './component/Chat/Chat';
import {user} from './component/Join/Join'

import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Join />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
