import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error404View from "./Error404View";
import Api from "../helpers/Api";
import "./ProfileView.css";

function ProfileView(props) {
  let tracking = [];

  let [userTrackedItems, setUserTrackedItems] = useState([]);
  let [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchUserTrackedItems();
  }, []);

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

  userTrackedItems &&
    userTrackedItems.forEach((e) => tracking.push(e.indicator));

  return (
    <div>
      <div className="d-flex flex-column ms-5 pb-5 pt-3 me-0 ">
        <Link to={`/edit/${props.user.id}`}>
          <button className="mb-3 float-end" type="button" id="edit">
            <img src="../Edit_icon.png" alt="edit icon" id="edit-icon" />
            Edit profile
          </button>
        </Link>
        <h2 className="blue me-5">
          {props.user.firstName} {props.user.lastName}
        </h2>
        <ul>
          <li className="me-5">
            <b>
              <span className="blue">email: </span>
            </b>
            {props.user.email}
          </li>
        </ul>
        <h3 className="blue me-5">Currently tracking:</h3>
        <ul className="trackingList me-5">
          {userTrackedItems &&
            userTrackedItems.map((ti) => (
              <li key={ti.id}>
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  disabled
                  readOnly
                  checked={tracking.includes(ti.indicator) ? true : false}
                />
                {ti.indicator}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfileView;
