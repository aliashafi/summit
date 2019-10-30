import React from 'react';

export default (props) => 
{
    return(
    <div>

        <section className="nav-bar">
            <div className ='signUp-logo'>
                <div className="logo-container">
                        <img onClick={() =>
                            props.history.push('/')} className="logo" src={window.images.logo} alt=""/>
                </div>
                
                {props.currentUser ?
                <div id="dash-container">
                        <div id="dashboard"> 
                                

                                <div id="drop-down-butn">
                                    <div>Dashboard</div>
                                    <p>ˇ</p>
                                    <div id="dashboard-dropdown">

                                        <p onClick={() => props.history.push("/feed")}>Activity Feed</p>
                                        <p onClick={() => props.history.push("/routes")} >My Routes</p>
                                        <p onClick={() => props.history.push("/routes/create")}>Create Route</p>
                                    </div>
                                </div>
                        </div>


                       

                    
                    </div>
                    : ""}

                {props.currentUser ? 

                        props.location.pathname === '/' ? 
                    (
                        <div id="signIn-button" onClick={ () => 
                            props.logout().then(() => props.history.push('/login'))} >Logout
                        </div>
                    ) : 
                        (       
                            <div className="right-side-container">
                            <div className="profile-add">
                                    <div id="user-route">

                                        <div id="user-nav-button">
                                            <div className="profile-picture-small-dash" >
                                                <img src={props.currentUser.photoUrl} alt=""/>
                                            </div>
                                            <p>ˇ</p>

                                        <div id="user-dropdown">
                                        <p onClick={() =>
                                                props.history.push(`/users/${props.currentUser.id}`)}>Your Profile</p>
                                            <p onClick={() =>
                                                props.logout().then(() => props.history.push('/login'))}>Log Out</p>
                                        </div>

                                        
                                        </div>
                            
                                    </div>
    
                                </div>

                                {/* <div id="add-circle">
                                    <div id="add-button">
                                        <div id="add">
                                            <p>+</p>
                                        </div>

                                        <div id="add-route-dropdown">
                                            <p id="drop-add"> <img src={window.images.upload} alt="" />
                                                Create Route
                                            </p>
                                        </div>

                                    </div> */}
                                   
                                </div>
                            // </div>

                        )
                    
                    : props.location.pathname === '/login' ? 
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
