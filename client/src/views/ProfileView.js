import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Error404View from './Error404View';

function ProfileView(props){

    return( 
    <div>
        <h2>{props.user.firstName} {props.user.lastName}</h2>
        <ul>
            <li>{props.user.email}</li>
            {props.user.tracked_items &&
                props.user.tracked_items.map((ti) => (
                    <li key={ti.id}>
                        {ti.indicator}
                    </li>
                ))
            }
        </ul>
    </div>
    )
}

export default ProfileView;