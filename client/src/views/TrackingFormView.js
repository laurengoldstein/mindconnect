import React from 'react';

function TrackingFormView(props) {
    return(
        <div>
            <form>
                <input type="range" min="0" max="10"/>
            </form>
        </div>
    )
}

export default TrackingFormView;