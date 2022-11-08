import React, { useState } from "react";
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

function App() {
  let [data, setData] = useState([]);
  let [indicators, setIndicators] = useState([]);
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // let [todaysData, setTodaysData] = useState([]);
  let navigate = useNavigate();

  // Gets user's data for current day -- ***possibly not needed*** PROGRESS VIEW, but accesses todaysData from TrackingFormView
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
  async function updateProfile(input) {
    let myresponse = await Api.updateUserProfile(input);
    if (myresponse.ok) {
      setUser(myresponse.data);
      setErrorMsg("");
      navigate(`/user/${myresponse.data.id}`);
    } else {
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  async function addUserData(dailyData) {
    let myresponse = await Api.addUserData(dailyData);
    if (myresponse.ok) {
      console.log("myresponse", myresponse);
      setData(myresponse.data);
      setLoginErrorMsg("");
      navigate(`/progress/${user.id}`);
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  async function registerAccount(accountInfo) {
    let myresponse = await Api.registerUser(accountInfo);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.data[0]);
      console.log("myresponse", myresponse);
      setUser(myresponse.data.data[0]);
      setLoginErrorMsg("");
      navigate(`/user/${myresponse.data.data[0].id}`);
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  return (
    <div className="App container">
      <img className="Logo" src="../Logo.png" alt="Mind Connect Logo" />

      <Navbar user={user} logoutCb={logout} />

      <div className=".container-sd d-flex justify-content-center bg-light align-middle mb-3">
        <Routes>
          <Route path="/" element={<HomeView />} />

          <Route
            path="/account"
            element={
              <AccountAccessView
                loginCb={(email, pw) => login(email, pw)}
                registerAccountCb={(accountInfo) =>
                  registerAccount(accountInfo)
                }
              />
            }
          />

          <Route
            path="user/:id"
            element={<ProfileView user={user} indicators={indicators} />}
          />
          <Route
            path="edit/:id"
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
            path="progress/:id"
            element={<ProgressView user={user} data={data} />}
          />
          <Route
            path="track/:id"
            element={
              <TrackingFormView
                setData={(data) => setData(data)}
                user={user}
                addUserDataCb={(dailyData) => addUserData(dailyData)}
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
