import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import BookList from './BookList';

import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';




function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<BookList></BookList>}></Route>
   </Routes>
   </BrowserRouter>

  );
}

export default App;
