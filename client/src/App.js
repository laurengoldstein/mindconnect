import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import Local from "./helpers/Local";
import Api from "./helpers/Api";

import Navbar from "./components/Navbar";
import HomeView from "./views/HomeView";

import AccountAccessView from "./views/AccountAccessView";

import ProgressView from "./views/ProgressView";
import ProfileView from "./views/ProfileView";
import EditProfileView from "./views/EditProfileView";

import TrackingFormView from "./views/TrackingFormView";
import Error404View from "./views/Error404View";

let currMonth = new Date().toISOString().slice(0, 7);
let currDay = new Date().toISOString().slice(0, 10);

function App() {
  let [data, setData] = useState([]);
  let [indicators, setIndicators] = useState([]);
  let [month, setMonth] = useState(currMonth);
  let [start, setStart] = useState("");
  let [end, setEnd] = useState("");
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  // let [todaysData, setTodaysData] = useState([]);
  let navigate = useNavigate();

  //Gets desired user info & tracked_items -- TRACKING FORM VIEW
  // useEffect(() => {
  //   fetch(`/user/1`)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setUser(json);
  //     })
  //     .catch((error) => {
  //       console.log(`Server error: ${error.message}`);
  //     });
  //   fetch("/tracked_items")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setIndicators(json);
  //     })
  //     .catch((error) => {
  //       console.log(`Server error: ${error.message}`);
  //     });
  // }, []);

  //Gets user's data for a specified month -- PROGRESS VIEW
  // useEffect(() => {
  //   fetch(`/data/?user=${user.id}&month=${month}`)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setData(json);
  //     })
  //     .catch((error) => {
  //       console.log(`Server error: ${error.message}`);
  //     });
  // }, [month]);

  // Gets user's data for specified day -- PROGRESS VIEW, but accesses todaysData from TrackingFormView
  // useEffect(() => {
  //   fetch(`/data/?user=${user.id}&date=${currDay}`)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setTodaysData(json);
  //     })
  //     .catch((error) => {
  //       console.log(`Server error: ${error.message}`);
  //     });
  // }, [data]);

  // Gets user's data for custom time range -- PROGRESS VIEW
  useEffect(() => {
    if (start.length !== 0 && end.length !== 0)
      fetch(
        `http://localhost:5000/data/custom?user=${user.id}&start=${start}&end=${end}`
      )
        .then((res) => res.json())
        .then((json) => {
          setData(json);
        })
        .catch((error) => {
          console.log(`Server error: ${error.message}`);
        });
  }, [start, end]);

  async function login(email, password) {
    let myresponse = await Api.loginUser(email, password);
    if (myresponse.ok) {
      // console.log(myresponse.data.user); RETRIEVED user obj
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      navigate(`/user/${myresponse.data.user.id}`);
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  function logout() {
    Local.removeUserInfo();
    setUser(null);
    // (NavBar will send user to home page)
  }

  // updates user's profile info -- EDIT PROFILE VIEW
  function updateProfile(input) {
    console.log(input);
    fetch(`/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => {
        res.json().then((json) => {
          setUser(json);
        });
      })
      .catch((error) => {
        console.log(`Server error: ${error.message}`);
      });
    navigate(`/user/${user.id}`);
  }

  return (
    <div className="App container">
      <img className="Logo" src="Logo.png" alt="Mind Connect Logo" />

      <Navbar user={user} logoutCb={logout} />

      <div className=".container-sd d-flex justify-content-center bg-light align-middle mb-3">
        <Routes>
          <Route path="/" element={<HomeView />} />

          <Route
            path="/account"
            element={
              <AccountAccessView loginCb={(email, pw) => login(email, pw)} />
            }
          />

          <Route
            path="user/:id"
            element={<ProfileView user={user} indicators={indicators} />}
          />
          <Route
            path="edit"
            element={
              <EditProfileView
                user={user}
                indicators={indicators}
                setIndicators={(indicators) => setIndicators(indicators)}
                updateProfile={(input) => updateProfile(input)}
              />
            }
          />
          <Route
            path="progress"
            element={
              <ProgressView
                user={user}
                data={data}
                indicators={indicators}
                // setMonth={(selectedMonth) => setMonth(selectedMonth)}
                // setStart={(start) => setStart(start)}
                // setEnd={(end) => setEnd(end)}
              />
            }
          />
          <Route
            path="track"
            element={
              <TrackingFormView
                setData={(data) => setData(data)}
                user={user}
                indicators={indicators}
                // todaysData={todaysData}
              />
            }
          />
          <Route path="*" element={<Error404View />} />
        </Routes>
      </div>

      <footer>
        <p></p>
      </footer>
    </div>
  );
}

export default App;
