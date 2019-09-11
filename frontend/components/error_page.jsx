import React from 'react';

export default (props) => {

    return (
        <div className="error-page">


            <img id="lost-icon" src={window.images.lost} alt=""/>
            
            <div>       
                <h1>You're Lost!</h1>
                <h3>Better go check your maps!</h3>
            </div>
        </div>
    )
};