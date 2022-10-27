import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import ProgressView from './views/ProgressView';
import ProfileView from './views/ProfileView';
import Error404View from './views/Error404View';


function App() {
let [users, setUsers] = useState([]);
let [selectedUser] = useState({id: 1});
let [data, setData] = useState([]);
let [indicators, setIndicators] = useState([]);




useEffect(() => {
  fetch(`/user/${selectedUser.id}`)
    .then(res => res.json())
    .then(json => {setUsers(json);})
    .catch(error => {
      console.log(`Server error: ${error.message}`)
    });
    fetch(`/data/?user=${selectedUser.id}`)
    .then(res => res.json())
    .then(json => {setData(json);})
    .catch(error => {
      console.log(`Server error: ${error.message}`)
    });
    fetch("/tracked_items")
    .then(res => res.json())
    .then(json => {setIndicators(json);})
    .catch(error => {
      console.log(`Server error: ${error.message}`)
    });
}, []);


  return (
    <div className="App">

     <Navbar/>

     <Routes>
        <Route path="user/:id" element={<ProfileView users={users}/>} />
        <Route path="progress" element={<ProgressView data={data}/>} />
        <Route path="*" element={<Error404View />} />
     </Routes>
    </div>
  );
}

export default App;
