import React, { useState } from 'react';
import { DateTime } from "luxon";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function ProgressView(props) {

let [selectedView, setView]= useState("month");

let month = new Date().toISOString().slice(0, 7);

const data = props.data;

let colors = ['red', 'blue', 'purple', 'green', 'yellow', 'teal', 'magenta', 'orange', 'brown', 'black', 'lightblue']

const renderLineChar = (
        <ResponsiveContainer width="50%" height="50%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                top: 5,
                right: 30,
                left: 20,
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
 console.log(selectedMonth)
} else if (event.target.name === "start-date"){
    props.setStart(event.target.value)
} else if (event.target.name === "end-date"){
    console.log(event.target.value)
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

function handleSubmit(event){
    event.preventDefault();
    props.getDataByCustom();
}



    return (
        <div className='ProgressView'>
            <button type="button" name="monthButton" onClick={handleClick}>Month</button>
            <button type="button" name="customButton" onClick={handleClick}>Custom time frame</button>
            {selectedView === "month" ? 
            <form>
                <input id="selected-month" name="selected-month" type="month" defaultValue={month} onChange={handleChange}/>
            </form> : 
             <form onSubmit={handleSubmit}>
                <label>From:
                <input id="start-date" name="start-date" type="date" defaultValue={month} onChange={handleChange}/>
                </label>
                <label>To:
                <input id="end-date" name="end-date" type="date" defaultValue={month} onChange={handleChange}/>
                </label>
                <button type="submit">Select</button>
            </form>
    }
            {renderLineChar}

        </div>
    )
}

export default ProgressView;