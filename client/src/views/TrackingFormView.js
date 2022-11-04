import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Local from "../helpers/Local";
import Api from "../helpers/Api";
import "./TrackingFormView.css";

let defaultValues = {};

function TrackingFormView(props) {
  let [values, setValue] = useState({});
  let [todaysData, setTodaysData] = useState([]);
  let [userTrackedItems, setUserTrackedItems] = useState([]);
  let [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  function handleChange(event) {
    let { name, value } = event.target;
    setValue((defaultValues) => ({ ...defaultValues, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    //Put "values" into an array, add the id
    addData();
    setValue(defaultValues);
  }

  useEffect(() => {
    fetchUserTrackedItems();
  }, []);

  async function fetchUserTrackedItems() {
    // Get "Members Only" message for authenticated users
    let myresponse = await Api.getUser(`/${props.user.id}`);
    if (myresponse.ok) {
      setUserTrackedItems(myresponse.data.tracked_items);
      setErrorMsg("");
    } else {
      setUserTrackedItems([]);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  const addData = () => {
    //Transform data into desired format for post
    let tracked = [];
    // Object.keys returns an array of the keys in an object
    let inds = Object.keys(values);
    /* For each key in values, create an object with keys 'tracked_items_id' and 'value'
     where the values will be the indicator id and number from 1-10 on scale */
    for (let i in inds) {
      let obj = {
        tracked_items_id: props.indicators.find((e) => e.indicator === inds[i])
          .id, //find object that contains anxiety as an indicator
        value: +values[inds[i]],
      };
      tracked.push(obj);
    }

    // fetch(`/user/${props.user.id}`)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setUser(json);
    //   })
    //   .catch((error) => {
    //     console.log(`Server error: ${error.message}`);
    //   });

    //Post new data
    let currMonth = new Date().toISOString().slice(0, 7);
    fetch("/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tracked_obj: tracked,
        user_id: props.user.id,
        month: currMonth,
      }),
    })
      .then((res) => {
        res.json().then((json) => {
          props.setData(json);
        });
      })
      .catch((error) => {
        console.log(`Server error: ${error.message}`);
      });
    navigate("/progress");
  };

  console.log(userTrackedItems);
  //Add coditional here
  if (todaysData.length === 0) {
    return (
      <div className="mx-5 py-5">
        <h3 className="blue mb-1" id="title">
          Hello, {props.user.firstName}!
        </h3>
        <h2 className="blue mb-4" id="title">
          How are you feeling today?
        </h2>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          {userTrackedItems &&
            userTrackedItems.map((ti) => (
              <label
                key={ti.indicator}
                htmlFor="slider1"
                className="form-label"
              >
                <div>{ti.indicator}</div>
                <span className="me-1">0</span>
                <input
                  key={ti}
                  name={ti.indicator}
                  defaultValue="5"
                  type="range"
                  className="slider"
                  id="slider1"
                  min="0"
                  max="10"
                  onChange={handleChange}
                />
                <span className="ms-1">10</span>
                <span className="inter-label">
                  {values[ti.indicator] || "select value"}
                </span>
              </label>
            ))}
          <div>
            <button id="done-button" className="button" type="submit">
              Done!
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="text-center mb-5">
        <h2 className="blue my-5">You are all set for today!</h2>
        <Link to="/progress">
          <button type="button">See your progress</button>
        </Link>
      </div>
    );
  }
}

export default TrackingFormView;
