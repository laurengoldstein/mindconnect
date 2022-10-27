import { Col, InputNumber, Row, Slider } from 'antd';
import React, { useState } from 'react';

function TrackingFormView(props) {
      
    return(
        <div>
            <form>
                <input type="range" min="0" max="10" list="tickmarks"/>
              
            </form>
        </div>
    )
}

export default TrackingFormView;