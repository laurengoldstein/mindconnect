import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import ProgressView from './views/ProgressView';
import ProfileView from './views/ProfileView';
import EditProfileView from './views/EditProfileView';

import TrackingFormView from './views/TrackingFormView';
import Error404View from './views/Error404View';

let currMonth = new Date().toISOString().slice(0, 7);


function App() {
let [user, setUser] = useState([]);
let [selectedUser] = useState({id: 1});
let [data, setData] = useState([]);
let [indicators, setIndicators] = useState([]);
let [month, setMonth] =useState(currMonth)
let navigate=useNavigate();



useEffect(() => {
  fetch(`/user/${selectedUser.id}`)
    .then(res => res.json())
    .then(json => {setUser(json);})
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

useEffect(() => {
  fetch(`/data/?user=${selectedUser.id}&month=${month}`)
  .then(res => res.json())
  .then(json => {setData(json);})
  .catch(error => {
    console.log(`Server error: ${error.message}`)
  });
}, [month])

function updateProfile(input) {
  console.log(input)
  fetch(`/user/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  })
  .then((res) => {
    res.json()
    .then((json)=> {
      setUser(json)
    })})
  .catch(error => {
    console.log(`Server error: ${error.message}`)
  })
  navigate("user/:id");
}



//Set default values for input

  return (
    <div className="App container">

    
     <Navbar/>
   

     <Routes>
        <Route path="user/:id" element={<ProfileView user={user} indicators={indicators} />} />
        <Route path="edit" element={<EditProfileView user={user} indicators={indicators} setIndicators={indicators => setIndicators(indicators)} updateProfile={input => updateProfile(input)}/>} />
        <Route path="progress" element={<ProgressView user={user} data={data} indicators={indicators} setMonth={selectedMonth => setMonth(selectedMonth)}/>} />
        <Route path="track" element={<TrackingFormView setData={data => setData(data)} user={user} indicators={indicators}/>} />
        <Route path="*" element={<Error404View />} />
     </Routes>
    </div>
  );
}

export default App;
