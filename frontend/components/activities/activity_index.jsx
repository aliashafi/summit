import React from 'react'
import ActivityItem from './activity_item';
import ActivityMap from './activity_map'
import {withRouter} from 'react-router-dom'


class ActivityIndex extends React.Component {

    constructor(props){
        super(props)
    }


    render(){
        const activities = this.props.activities.map(activity => {
            const user = this.props.users.filter(u => u.id === activity.user_id)
            return(
                <ActivityItem 
                    key={activity.id}
                    activity={activity} 
                    user={user[0]}
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