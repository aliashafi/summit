import React from 'react';

export default (props) => 
{
    return(
    <div>

        <section className="nav-bar">
            <div className ='signUp-logo'>
                <div className="logo-container">
                    <img className="logo" src="assets/logo.png" alt=""/>
                </div>

                {props.currentUser ? (
                        <div id="signIn-button" onClick={ () => 
                            props.logout().then(() => props.history.push('/login'))} >Logout
                        </div>
                    ) : props.location.pathname === '/login' ? 
                    (<div id="signIn-button" onClick={() =>
                            props.history.push('/signup')}>Sign Up
                    </div>)  :
                    (<div id="signIn-button" onClick={() =>
                                props.history.push('/login')}>Sign In
                    </div>)
                }
            </div>
        </section>
   </div>
)}
