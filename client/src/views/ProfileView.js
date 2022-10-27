import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Error404View from './Error404View';

function ProfileView(props){
    return( 
    <div>
        <h2>{props.users.firstName} {props.users.lastName}</h2>
        <ul>
            <li>{props.users.email}</li>
            {/* {
                props.users.tracked_items.map((ti) => (
                    <li>
                        {ti.indicator}
                    </li>
                ))
            } */}
        </ul>
    </div>
    )
}

export default ProfileView;