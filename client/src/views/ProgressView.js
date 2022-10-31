import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function ProgressView(props) {

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
 let selectedMonth = event.target.value;
 props.setMonth(selectedMonth);
 console.log(selectedMonth)
}



    return (
        <div className='ProgressView'>
            <form>
                <input id="selected-month" name="selected-month" type="month" defaultValue={month} onChange={handleChange}/>
            </form>
            {renderLineChar}
        </div>
    )
}

export default ProgressView;