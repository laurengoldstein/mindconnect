import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function HomeView(props){
    return (
        <div>
            <h1> Welcome to Mind-Connect</h1>
            <Link to="/track">
            <button>Start tracking</button>
            </Link>
        </div>
    )
}

export default HomeView;