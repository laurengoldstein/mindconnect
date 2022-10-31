import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

let defaultValues = {}

function TrackingFormView(props) {
let [values, setValue] = useState({});
let navigate = useNavigate();

function handleChange(event){
    let {name, value} = event.target;
    setValue(defaultValues => ({...defaultValues, [name]: value}) )
}

function handleSubmit(event){
    event.preventDefault();
    //Put "values" into an array, add the id 
    addData();
    setValue(defaultValues);
}

const addData = () => {
  //Transform data into desired format for post
  let tracked = [];
  let inds = Object.keys(values);
  for(let i in inds){
    let obj = {
      tracked_items_id: props.indicators.find(e => e.indicator === inds[i]).id, //find object that contains anxiety as an indicator
      value: +values[inds[i]]
    }
    tracked.push(obj)
  }
  //Post new data
  fetch("/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({tracked_obj: tracked, user_id: props.user.id})
  })
  .then((res) => {
      res.json()
      .then((json)=> {
        props.setData(json)
      })})
    .catch(error => {
      console.log(`Server error: ${error.message}`)
    })
  navigate("/progress")
}
    //Add coditional here
    return(
        <div>
            <h2>How are you feeling today?</h2>
            <form onSubmit={handleSubmit}>
                {
                    props.user.tracked_items &&
                    props.user.tracked_items.map((ti) => (
                        <label key={ti.indicator} htmlFor="slider1" className="form-label">{ti.indicator}
                        <span>0</span><input key={ti} name={ti.indicator} defaultValue="5" type="range" className="slider" id="slider1" min="0" max="10" onChange={handleChange}/><span>10</span><span>{values[ti.indicator] || 0}</span>
                        </label>
                    ))
                }
                <button type="submit">Done!</button>
            </form>
        </div>
    )
}

export default TrackingFormView;