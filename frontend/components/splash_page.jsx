import React from 'react';

export default (props) => {
    
    return (
        <div className="splash">
                <video autoPlay muted loop id="myVideo">
                    {/* asset_path("rowing.mp4") */}
                <source src={window.images.rowing_video} type="video/mp4"></source>
                </video>
                <div className='content'>
                    Introducing 
                    <h2 className='content'>Summit</h2>
                    <p>Helping you reach your fitness peak</p>
                <section id="sign-up-splash"
                    onClick={() =>
                        props.history.push('/signup')}>Join Now</section>
                </div>

        </div>
    )
};