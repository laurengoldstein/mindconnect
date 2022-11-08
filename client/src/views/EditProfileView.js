import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error404View from "./Error404View";
import Api from "../helpers/Api";
import "./EditProfileView.css";

function EditProfileView(props) {
  let [input, setInput] = useState({});
  let [newIndicator, setNewIndicator] = useState("");
  let [userTrackedItems, setUserTrackedItems] = useState([]);
  let [errorMsg, setErrorMsg] = useState("");
  let [tracking, setTracking] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    fetchUserTrackedItems();
  }, []);

  useEffect(() => {
    getTracking();
  }, [tracking]);

  function getTracking(tracking) {
    return tracking;
  }

  async function fetchUserTrackedItems() {
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

  function handleChange(event) {
    let { name, value } = event.target;
    setInput((input) => ({ ...input, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    //Insert previous data for input fields that were left empty
    let modifiedProfile = { ...input };
    modifiedProfile.tracked_items_id = [];
    // console.log("tracking", tracking);
    for (let e in tracking) {
      let tracked_obj = userTrackedItems.find(
        (t) => t.indicator === tracking[e]
      );
      // console.log("tracked_obj", tracked_obj);
      modifiedProfile.tracked_items_id.push(tracked_obj.id);
    }
    // console.log("ti ids", modifiedProfile.tracked_items_id);
    for (let key in props.user) {
      if (!Object.keys(modifiedProfile).includes(key)) {
        modifiedProfile[`${key}`] = `${props.user[key]}`;
      }
    }
    modifiedProfile.userId = id;
    delete modifiedProfile.id;
    props.updateProfile(modifiedProfile);
  }

  // changes indicators based on whether they are checked
  function changeIndicators(event) {
    let isChecked = event.target.checked;
    if (isChecked) {
      setTracking((tracking) => [...tracking, event.target.name]);
    }
    return tracking;
  }

  function handleAddNewIndicator(event) {
    setNewIndicator(event.target.value);
  }

  // adds new indicator to user's tracked items by calling addIndicator function below
  function handleSubmitNewIndicator(event) {
    event.preventDefault();
    addIndicator();
    setNewIndicator("");
  }
  //adds a new item to the tracked_items data table
  function addIndicator() {
    fetch("/tracked_items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ indicator: newIndicator, user_id: props.user.id }),
    })
      // Continue fetch request here
      .then((res) => {
        res.json().then(() => {
          fetchUserTrackedItems();
        });
      })
      .catch((error) => {
        console.log(`Server error: ${error.message}`);
      });
  }

  return (
    <div className="d-flex flex-column mx-5">
      <h2 className="blue">Edit profile:</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-2">
          <label className="blue w-100">
            First name:
            <input
              className="form-control"
              type="text"
              name="firstName"
              defaultValue={props.user.firstName || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="blue w-100">
            Last name:
            <input
              className="form-control"
              type="text"
              name="lastName"
              defaultValue={props.user.lastName || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="blue w-100">
            Email:
            <input
              className="form-control"
              type="text"
              name="email"
              defaultValue={props.user.email || ""}
              onChange={handleChange}
            />
          </label>
        </div>

        <label className="blue mt-4 mb-2">
          Check items you want to keep tracking:
        </label>
        <ul className="trackingList">
          {userTrackedItems &&
            userTrackedItems.map((ti) => (
              <li key={ti.id}>
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  name={ti.indicator}
                  id={ti.indicator}
                  onChange={(e) => changeIndicators(e)}
                />
                {ti.indicator}
              </li>
            ))}
        </ul>
        <label className="d-flex justify-conent-between mb-4" id="add-button">
          <button
            className="me-2"
            id="add-button"
            type="button"
            onClick={(e) => handleSubmitNewIndicator(e)}
          >
            +
          </button>
          <input
            className="form-control"
            type="text"
            placeholder="Add new item"
            defaultValue={newIndicator}
            onChange={(e) => handleAddNewIndicator(e)}
          />
        </label>

        <div className="mb-2">
          <label className="blue w-100 mb-2">
            Enter your password to confirm changes:
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            defaultValue={props.user.password || ""}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="submit-button button">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileView;
