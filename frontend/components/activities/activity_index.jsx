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
        console.log(fromBottom)
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
                    />
            )
        })

        return(
            <div className="grid-center">
                <div className="activity-img">
                    <img src={window.images.quick_bike} alt=""/>
                </div>
                <section className="activity-feed">
                    {activities}
                </section>
                
            </div>
        )

    }

}

export default withRouter(ActivityIndex);