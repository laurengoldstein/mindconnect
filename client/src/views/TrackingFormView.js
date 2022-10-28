import React, { useState } from 'react';


function TrackingFormView(props) {


function handleChange(event){
    let {name, value} = event.target;
    console.log(name, value)
}

function handleSubmit(event){
}
   
    
    return(
        <div>
            <h2>How are you feeling today?</h2>
            <form onSubmit={handleSubmit}>
                {
                    props.user.tracked_items &&
                    props.user.tracked_items.map((ti) => (
                        <label key={ti.indicator} htmlFor="slider1" className="form-label">{ti.indicator}
                        <span>0</span><input key={ti} name={ti.indicator} type="range" className="slider" id="slider1" min="0" max="10" onChange={handleChange}/><span>10</span>
                        </label>
                    ))
                }
                <button type="submit">Done!</button>
            </form>
        </div>
    )
}

export default TrackingFormView;