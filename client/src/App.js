import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import HomeView from './views/HomeView';

import ProgressView from './views/ProgressView';
import ProfileView from './views/ProfileView';
import EditProfileView from './views/EditProfileView';

import TrackingFormView from './views/TrackingFormView';
import Error404View from './views/Error404View';

let currMonth = new Date().toISOString().slice(0, 7);
let currDay = new Date().toISOString().slice(0, 10);



function App() {

let [user, setUser] = useState({});
let [data, setData] = useState([]);
let [indicators, setIndicators] = useState([]);
let [month, setMonth] =useState(currMonth);
let [todaysData, setTodaysData] = useState([])
let navigate=useNavigate();



useEffect(() => {
  fetch(`/user/1`)
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
  fetch(`/data/?user=1&month=${month}`)
  .then(res => res.json())
  .then(json => {setData(json);})
  .catch(error => {
    console.log(`Server error: ${error.message}`)
  });
}, [])

useEffect(() => {
  fetch(`/data/?user=1&date=${currDay}`)
  .then(res => res.json())
  .then(json => {setTodaysData(json);})
  .catch(error => {
    console.log(`Server error: ${error.message}`)
  });
}, [])

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
        <Route path="/" element={<HomeView />} />
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
