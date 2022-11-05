import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Api from "../helpers/Api";
import "./ProgressView.css";

function ProgressView(props) {
  let currMonth = new Date().toISOString().slice(0, 7);

  let [selectedView, setView] = useState(currMonth);
  let [month, setMonth] = useState(currMonth);
  let [start, setStart] = useState("");
  let [end, setEnd] = useState("");
  let [userData, setUserData] = useState([]);
  let [errorMsg, setErrorMsg] = useState("");
  let [userTrackedItems, setUserTrackedItems] = useState([]);

  const data = props.data;

  let colors = [
    "red",
    "blue",
    "purple",
    "darkgreen",
    "teal",
    "magenta",
    "orange",
    "brown",
    "black",
    "lightblue",
  ];

  // Gets user's data for custom time range -- PROGRESS VIEW
  useEffect(() => {
    fetchUserData();
    fetchUserTrackedItems();
  }, []);

  useEffect(() => {
    fetchCustomDates();
  }, [start, end]);

  async function fetchUserData() {
    // Get user's basic data
    let myresponse = await Api.getUserData(`${props.user.id}`);
    if (myresponse.ok) {
      setUserData(myresponse.data);
      setErrorMsg("");
    } else {
      setUserData([]);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  async function fetchUserTrackedItems() {
    // Get tracked items tied to the authenticated user
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

  async function fetchCustomDates() {
    if (start.length !== 0 && end.length !== 0) {
      fetch(
        `http://localhost:5000/data/custom?user=${props.user.id}&start=${start}&end=${end}`
      )
        .then((res) => res.json())
        .then((json) => {
          setUserData(json);
        })
        .catch((error) => {
          console.log(`Server error: ${error.message}`);
        });
    }
  }

  //   useEffect(() => {
  //     if (start.length !== 0 && end.length !== 0)
  //     fetch(
  //       `http://localhost:5000/data/custom?user=${props.user.id}&start=${start}&end=${end}`
  //     )
  //       .then((res) => res.json())
  //       .then((json) => {
  //         setUserData(json);
  //       })
  //       .catch((error) => {
  //         console.log(`Server error: ${error.message}`);
  //       });
  // }, [start, end]);

  const renderLineChar = (
    <ResponsiveContainer width="100%" height="90%">
      <LineChart
        width="90%"
        height="90%"
        data={userData}
        margin={{
          top: 5,
          right: 15,
          left: 0,
          bottom: 5,
        }}
      >
        {userTrackedItems &&
          userTrackedItems.map((t) => (
            <Line
              key={t.id}
              type="monotone"
              dataKey={t.indicator}
              stroke={colors[t.id]}
            />
          ))}
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );

  function handleChange(event) {
    if (event.target.name === "selected-month") {
      let selectedMonth = event.target.value;
      setMonth(selectedMonth);
    } else if (event.target.name === "start-date") {
      setStart(event.target.value);
    } else if (event.target.name === "end-date") {
      let endDate = DateTime.fromISO(event.target.value);
      endDate = endDate.plus({ days: 1 }).toSQLDate();
      setEnd(endDate);
    }
  }

  function handleClick(event) {
    let button = event.target.name;
    if (button === "monthButton") {
      setView("month");
    } else {
      setView("custom");
    }
  }

  return (
    <div className="d-flex flex-column mx-5 mb-4" id="flexCont">
      <div className="btn-group" role="group">
        <button
          type="button"
          name="monthButton"
          className={"btn my-3" + (selectedView === "month" ? " active" : "")}
          onClick={handleClick}
        >
          Month
        </button>
        <button
          type="button"
          name="customButton"
          className={"btn my-3" + (selectedView !== "month" ? " active" : "")}
          onClick={handleClick}
        >
          Custom time frame
        </button>
      </div>

      {selectedView === "month" ? (
        <form>
          <input
            className="mb-3"
            id="selected-month"
            name="selected-month"
            type="month"
            defaultValue={month}
            onChange={handleChange}
          />
        </form>
      ) : (
        <form className="d-flex flex-row justify-content-center mb-3">
          <label className="blue">
            From:
            <input
              id="start-date"
              name="start-date"
              type="date"
              defaultValue={month}
              onChange={handleChange}
            />
          </label>
          <label className="blue ms-2">
            To:
            <input
              id="end-date"
              className=""
              name="end-date"
              type="date"
              defaultValue={month}
              onChange={handleChange}
            />
          </label>
        </form>
      )}
      {userData && renderLineChar}
    </div>
  );
}

export default ProgressView;
