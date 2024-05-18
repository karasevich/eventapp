import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './elements/Home'
import Register from './elements/Register'
import View from './elements/View'

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register/:id' element={<Register />} />
        <Route path='/view/:id' element={<View />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;