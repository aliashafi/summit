import React from 'react'
import ActivityItem from './activity_item';
import ActivityMap from './map/activity_map'
import {withRouter} from 'react-router-dom'
import ActivityShow from './map/activity_show'


class ActivityIndex extends React.Component {

    constructor(props){
        super(props)
    }  
        

    render(){
        const activities = this.props.activities.slice(0,8).map(activity => {
            const user = this.props.users[activity.user_id]
            return(
                <ActivityItem 
                    key={activity.id}
                    activity={activity} 
                    user={user}
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