import React from 'react';

export default (props) => {
    
    return (
        <div>
            <video autoPlay muted loop id="myVideo">
                <source src="assets/rowing.mp4" type="video/mp4"></source>
            </video>
        </div>
    )
};