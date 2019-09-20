import React from 'react'
import ActivityItem from './activity_item';
import {withRouter} from 'react-router-dom'
import debounce from "lodash.debounce";



class ActivityIndex extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            page: 1,
            error: false,
            hasMore: true,
            isLoading: false,
            activities: [],
            
        };
        this.fetchAllActivities = this.props.fetchAllActivities.bind(this);


    


    window.onscroll = debounce(() => {
        const {
            fetchAllActivities,
            state: {
                error,
                isLoading,
                hasMore,
                page
            },
        } = this;

        if (error || isLoading || !hasMore) return;
        const fromBottom = (window.innerHeight + document.documentElement.scrollTop
            - document.documentElement.offsetHeight)
        if (
            (fromBottom <= 2) && (fromBottom > -2)
        ) {
            
            this.state.page += 1
            fetchAllActivities(this.state.page);

            
            }
        }, 1000);
    
    }



    render(){

        
        const activities = this.props.activities.map((activity, index) => {
            const user = this.props.users[activity.user_id]
            
            return(
                <ActivityItem 
                    key={activity.id}
                    index = {index}
                    activity={activity} 
                    user={user}
                    comments={this.props.comments}
                    users={this.props.users}
                    createKudo={this.props.createKudo}
                    currentUser={this.props.users[this.props.current_user.id]}
                    page={this.state.page}
                    user={user}
                    kudos={this.props.kudos}
                    />
            )
        })

        return(
            <div className="grid-center">
                <div id="promotion">

                    <div className="activity-img">
                        <img src={window.images.quick_bike} alt=""/>
                    </div>

                    <p>Check out my Linked-In</p>

                    <div id="linked-in"><a rel="stylesheet" href="https://www.linkedin.com/in/alia-shafi-9939a4a8/">Click Me</a></div>
                    
                </div>
                <section className="activity-feed">
                        { activities }
                    
                </section> 
                
                
            </div>
        )

    }

}

export default withRouter(ActivityIndex);