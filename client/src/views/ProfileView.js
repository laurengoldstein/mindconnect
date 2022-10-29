import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Error404View from './Error404View';

function ProfileView(props){


let tracking = [];

props.user.tracked_items && props.user.tracked_items.forEach(e => tracking.push(e.indicator))
  



    return( 
    <div>
        <button type="button" id="edit">Edit profile</button>
        <h2>{props.user.firstName} {props.user.lastName}</h2> 
        <ul>
            <li><b>email: </b>{props.user.email}</li>
        </ul>
        <h3>Currently tracking:</h3>
        <ul className="trackingList">
            
            {props.indicators &&
                props.indicators.map((ti) => (
                    <li key={ti.id}>
                    <input type="checkbox" disabled readOnly checked={tracking.includes(ti.indicator) ? true : false}/>
                    {ti.indicator}
                    </li>
                ))
            }
        </ul>
    </div>
    )
}

export default ProfileView;

