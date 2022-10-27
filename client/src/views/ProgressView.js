import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';



function ProgressView(props) {

const data = [{name: '2022-10-03', anxiety: 3, sleep: 6}, {name: '2022-10-04', anxiety: 4, sleep: 3}, {name: '2022-10-05', anxiety: 6, sleep: 8}];
//For each data point of data, create an object that consists of date as a first key-value pair, and for each tracked_item_id add another key-value pair
//do left-foin with tracked_items (in the api routes) so that the name of the indicator is in data 
//for each unique tracked_items name generate a line
const {tracked_items} = props.user;
console.log(tracked_items);

let data1 = [];
for(let data_point in props.data){
    data1.push(
        {
        date: props.data[data_point].date
        }
        )
}
console.log(data1)

const renderLineChar = (
    <LineChart width={400} height={400} data={data}>
            {tracked_items &&
                tracked_items.map(t =>
                <Line key={t.id} type="monotone" dataKey='anxiety' stroke="#8884d8" /> )
            }
            {/* <Line type="monotone" dataKey="anxiety" stroke="#8884d8" />
            <Line type="monotone" dataKey="sleep" stroke="#008001" /> */}
            <CartesianGrid stroke="#ccc"  strokeDasharray="5 5"/>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
        </LineChart>
)

    return (
        <div>
            {renderLineChar}
        </div>
    )
}

export default ProgressView;