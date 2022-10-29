import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import ProgressView from './views/ProgressView';
import ProfileView from './views/ProfileView';
import TrackingFormView from './views/TrackingFormView';
import Error404View from './views/Error404View';


function App() {
let [user, setUser] = useState([]);
let [selectedUser] = useState({id: 1});
let [data, setData] = useState([]);
let [indicators, setIndicators] = useState([]);




useEffect(() => {
  fetch(`/user/${selectedUser.id}`)
    .then(res => res.json())
    .then(json => {setUser(json);})
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



//Set default values for input

  return (
    <div className="App container">

    
     <Navbar/>
   

     <Routes>
        <Route path="user/:id" element={<ProfileView user={user}/>} />
        <Route path="progress" element={<ProgressView user={user} data={data} indicators={indicators}/>} />
        <Route path="track" element={<TrackingFormView setData={data => setData(data)} user={user} indicators={indicators}/>} />
        <Route path="*" element={<Error404View />} />
     </Routes>
    </div>
  );
}

export default App;
