import React, { useState } from 'react';
import { DateTime } from "luxon";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./ProgressView.css"

function ProgressView(props) {

let [selectedView, setView]= useState("month");

let month = new Date().toISOString().slice(0, 7);

const data = props.data;

let colors = ['red', 'blue', 'purple', 'darkgreen', 'teal', 'magenta', 'orange', 'brown', 'black', 'lightblue']

const renderLineChar = (
        <ResponsiveContainer width="100%" height="90%">
                <LineChart
                width="90%"
                height="90%"
                data={data}
                margin={{
                top: 5,
                right: 15,
                left: 0,
                bottom: 5,
                }}
                >
            { props.user.tracked_items &&
                props.user.tracked_items.map(t=>
                    <Line key={t.id} type="monotone" dataKey={t.indicator} stroke={colors[t.id]} />
                    )
            }
            <CartesianGrid stroke="#ccc"  strokeDasharray="5 5"/>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <Legend />
        </LineChart>
        </ResponsiveContainer>
)


function handleChange(event){
if(event.target.name === "selected-month"){
 let selectedMonth = event.target.value;
 props.setMonth(selectedMonth);
} else if (event.target.name === "start-date"){
    props.setStart(event.target.value)
} else if (event.target.name === "end-date"){
    let endDate = DateTime.fromISO(event.target.value);
    endDate = endDate.plus({days: 1}).toSQLDate();
    props.setEnd(endDate)
}
}

function handleClick(event){
    let button = event.target.name;
    if (button === "monthButton"){
        setView("month")
    }
    else {
        setView("custom")
    }
}




    return (
        <div className="d-flex flex-column mx-5 mb-4" id="flexCont">
            <div className="btn-group" role="group">
                <button type="button" name="monthButton" className={"btn my-3" + (selectedView === "month" ?  " active": "")} onClick={handleClick}>Month</button>
                <button type="button" name="customButton" className={"btn my-3"+ (selectedView !== "month" ?  " active": "")} onClick={handleClick}>Custom time frame</button>
                </div>
                
                {selectedView === "month" ? 
            <form>
                <input className="mb-3" id="selected-month" name="selected-month" type="month" defaultValue={month} onChange={handleChange}/>
            </form> : 
             <form className="d-flex flex-row justify-content-center mb-3">
                <label className="blue">From:
                <input id="start-date" name="start-date" type="date" defaultValue={month} onChange={handleChange}/>
                </label>
                <label className="blue ms-2">To:
                <input id="end-date" className="" name="end-date" type="date" defaultValue={month} onChange={handleChange}/>
                </label>
            </form> } 
             {props.data && renderLineChar}
        </div>
    )
}

export default ProgressView;